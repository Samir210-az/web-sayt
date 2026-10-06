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

Layihə `petcrm-c0cfe` Firebase layihəsində, PET CRM-dən ayrı baza və bucket ilə işləyir. Firebase qurulmayıbsa redaktor işləyir, amma dəyişikliklər yalnız həmin brauzerdə saxlanılır.

1. **Realtime Database → Create database** ilə ayrıca instance yaradın (məsələn, `web-sayt`, region `europe-west1`). Əsas (default) bazaya toxunmayın, PET CRM orada işləyir.
2. Yeni instance-in **Rules** bölməsinə `firebase/database.rules.json` məzmununu yapışdırıb dərc edin.
3. **Storage** bölməsində ayrıca bucket yaradın və **Rules** hissəsinə `firebase/storage.rules` məzmununu yapışdırın.
4. **Authentication → Sign-in method** bölməsində **Email/Password** və **Google** aktivdir (Google PET CRM-də artıq işləyir, Email/Password yoxlayın). **Settings → Authorized domains** siyahısına `web-sayt-az.vercel.app` əlavə edin.
5. Vercel → Project → Settings → Environment Variables bölməsinə `.env.example` faylındakı `NEXT_PUBLIC_FIREBASE_*` dəyişənlərini yazın (`DATABASE_URL` yeni instance-in ünvanı, `STORAGE_BUCKET` yeni bucket), sonra yenidən deploy edin.

Hər istifadəçinin saytı `sites/{uid}_{şablon}` yolunda saxlanılır və qaydalar yalnız sahibinə oxumağa və yazmağa icazə verir. Giriş edilmiş redaktorda yüklənən şəkillər Storage-də `sites/{uid}/` altında saxlanılır, bazada yalnız ünvanı qalır. Giriş edilməyibsə şəkil qaralamanın içində base64 kimi qalır.

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
