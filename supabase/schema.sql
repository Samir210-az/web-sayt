-- web-sayt: müştəri saytlarının saxlanması
-- Bu fayl hələ heç bir Supabase layihəsinə tətbiq olunmayıb və sınaqdan keçməyib.

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  subdomain text not null unique,
  template text not null default 'xidmet',
  draft jsonb not null,
  published jsonb,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint subdomain_format check (subdomain ~ '^[a-z0-9][a-z0-9-]{1,28}[a-z0-9]$'),
  constraint subdomain_reserved check (
    subdomain not in ('www', 'admin', 'api', 'app', 'mail', 'redaktor', 'static', 'cdn', 'dashboard', 'login')
  ),
  constraint draft_size check (pg_column_size(draft) < 1048576),
  constraint published_size check (published is null or pg_column_size(published) < 1048576)
);

create table public.site_versions (
  id bigint generated always as identity primary key,
  site_id uuid not null references public.sites (id) on delete cascade,
  data jsonb not null,
  created_at timestamptz not null default now()
);

create index site_versions_site_idx on public.site_versions (site_id, created_at desc);

alter table public.sites enable row level security;
alter table public.site_versions enable row level security;

create policy sites_owner_select on public.sites
  for select to authenticated using (owner_id = (select auth.uid()));

create policy sites_owner_insert on public.sites
  for insert to authenticated with check (owner_id = (select auth.uid()));

create policy sites_owner_update on public.sites
  for update to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

create policy sites_owner_delete on public.sites
  for delete to authenticated using (owner_id = (select auth.uid()));

create policy versions_owner_select on public.site_versions
  for select to authenticated using (
    exists (select 1 from public.sites s where s.id = site_id and s.owner_id = (select auth.uid()))
  );

create policy versions_owner_insert on public.site_versions
  for insert to authenticated with check (
    exists (select 1 from public.sites s where s.id = site_id and s.owner_id = (select auth.uid()))
  );

-- Ziyarətçilər cədvələ birbaşa baxa bilmir: qaralama sızmasın deyə yalnız dərc olunmuş hissə funksiya ilə verilir.
create or replace function public.get_published_site(p_subdomain text)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select s.published
  from public.sites s
  where s.subdomain = lower(p_subdomain) and s.published is not null
$$;

revoke all on function public.get_published_site(text) from public;
grant execute on function public.get_published_site(text) to anon, authenticated;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger sites_touch before update on public.sites
  for each row execute function public.touch_updated_at();

-- Şəkillər: yalnız öz qovluğuna yükləmə, ölçü və tip məhdudiyyəti bucket səviyyəsindədir.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-assets', 'site-assets', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy assets_owner_insert on storage.objects
  for insert to authenticated with check (
    bucket_id = 'site-assets' and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy assets_owner_update on storage.objects
  for update to authenticated using (
    bucket_id = 'site-assets' and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy assets_owner_delete on storage.objects
  for delete to authenticated using (
    bucket_id = 'site-assets' and (storage.foldername(name))[1] = (select auth.uid())::text
  );
