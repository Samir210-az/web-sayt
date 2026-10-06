# web-sayt

Müştərilərin hazır şablondan özlərinə sayt yaradıb birbaşa səhifədə redaktə etdiyi platforma.

## İşə salmaq

```bash
npm install
npm run dev
```

- Sayt: `http://localhost:3000`
- Redaktor: `http://localhost:3000/redaktor`

Redaktor dəyişiklikləri hələlik brauzerin `localStorage` yaddaşında qaralama kimi saxlanır. Verilənlər bazası sxemi `supabase/schema.sql` faylındadır.

## Struktur

- `src/lib/default-site.ts`: şablonun nümunə məzmunu
- `src/lib/site-context.tsx`: sayt vəziyyəti və redaktə əməliyyatları
- `src/components/editable`: mətn, şəkil və loqo redaktə komponentləri
- `src/components/parallax.tsx`: parallax qatı
- `src/components/template`: şablonun bölmə və səhifələri
