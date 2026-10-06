# web-sayt

Müştərilərin hazır şablondan özlərinə sayt yaradıb birbaşa səhifədə redaktə etdiyi platforma.

## İşə salmaq

```bash
npm install
npm run dev
```

- Sayt: `http://localhost:3000`
- Redaktor: `http://localhost:3000/redaktor`

Redaktor dəyişiklikləri hələlik brauzerin `localStorage` yaddaşında qaralama kimi saxlanır. Verilənlər bazası Firebase (Realtime Database) olacaq. Təhlükəsizlik qaydaları `firebase/` qovluğundadır, hələ Firebase layihəsinə tətbiq olunmayıb.

## Struktur

- `src/lib/default-site.ts`: şablonun nümunə məzmunu
- `src/lib/site-context.tsx`: sayt vəziyyəti və redaktə əməliyyatları
- `src/components/editable`: mətn, şəkil və loqo redaktə komponentləri
- `src/components/parallax.tsx`: parallax qatı
- `src/components/template`: şablonun bölmə və səhifələri

## Firebase qurulması

Layihə `petcrm-c0cfe` Firebase layihəsinin əsas (default) Realtime Database və Storage bucket-indən istifadə edir. Qaydalar bütün bazaya şamil olur: `sites`, `subdomains` və `published` yollarından başqa heç nə oxunmur və yazılmır. Firebase qurulmayıbsa redaktor işləyir, amma dəyişikliklər yalnız həmin brauzerdə saxlanılır.

1. **Realtime Database → Rules** bölməsinə `firebase/database.rules.petcrm-merged.json` məzmununu yapışdırıb dərc edin. Bu fayl PET CRM-in mövcud qaydalarını və web-sayt qaydalarını birləşdirir. Baza yalnız web-sayt üçün olsaydı, `firebase/database.rules.json` istifadə olunardı.
2. (İxtiyari, Blaze plan tələb edir) **Storage** bölməsində **Get started** ilə işə salın (artıq işləyirsə bu addım lazım deyil), **Rules** hissəsinə `firebase/storage.rules` məzmununu yapışdırıb dərc edin.
3. **Authentication → Sign-in method** bölməsində **Email/Password** və **Google** aktiv edin. **Settings → Authorized domains** siyahısına `web-sayt-az.vercel.app` əlavə edin.
4. Vercel → Project → Settings → Environment Variables bölməsinə `.env.example` faylındakı `NEXT_PUBLIC_FIREBASE_*` dəyişənlərini yazın, sonra yenidən deploy edin.

Hər istifadəçinin saytı `sites/{uid}_{şablon}` yolunda saxlanılır və qaydalar yalnız sahibinə oxumağa və yazmağa icazə verir. Giriş edilmiş redaktorda yüklənən şəkillər Storage-də `sites/{uid}/` altında saxlanılır, bazada yalnız ünvanı qalır. `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` verilməyibsə (və ya giriş edilməyibsə) şəkil qaralamanın və dərc olunmuş məzmunun içində base64 kimi qalır.

## Dərc etmə

Redaktorda **Dərc et** düyməsi saytı `/s/{ad}` ünvanında açır (məsələn, `web-sayt-az.vercel.app/s/demlik`). Dərc olunmuş məzmun `published/{ad}` yolundan oxunur, ünvanın sahibi `subdomains/{ad}` ilə saxlanılır. Dərc zamanı hələ base64 qalan şəkillər Storage-ə köçürülür. Öz domeninizdə wildcard subdomen (`ad.domen.az`) sonradan əlavə olunacaq.

## Şablon önizləmə şəkilləri

`public/previews/` qovluğundakı tam səhifə şəkilləri şablonlar dəyişəndə yenilənməlidir. Layihə serveri işləyərkən (`npm run build && npm start -- -p 3100`) və `playwright` quraşdırılmış halda:

```
node scripts/make-previews.mjs
```

`PREVIEW_BASE` ünvanı, `CHROME_PATH` isə brauzer faylını göstərmək üçündür.

## Yoxlamalar

- `npm run typecheck` və `npm run lint`: tip və kod yoxlaması.
- `npm run check`: layihə serveri işləyərkən (`npm run build && npm start -- -p 3100`) bütün şablonları desktop və mobil ölçüdə açır (konsol xətası, üfüqi overflow, `h1`, `alt`) və redaktorda mətnin reload-dan sonra qaldığını yoxlayır. `CHROME_PATH` brauzer faylını göstərmək üçündür.
