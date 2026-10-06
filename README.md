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

Firebase qurulmayıbsa redaktor işləyir, amma dəyişikliklər yalnız həmin brauzerdə saxlanılır. Hesab və bazaya yazma üçün:

1. Firebase konsolunda layihə yaradın və **Web app** əlavə edin.
2. **Authentication → Sign-in method** bölməsində **Email/Password** və **Google** aktiv edin. **Settings → Authorized domains** siyahısına Vercel domenini (`web-sayt-az.vercel.app`) əlavə edin.
3. **Realtime Database** yaradın və `firebase/database.rules.json` faylının məzmununu **Rules** bölməsinə yapışdırıb dərc edin (və ya `firebase deploy --only database`).
4. Vercel → Project → Settings → Environment Variables bölməsinə `.env.example` faylındakı `NEXT_PUBLIC_FIREBASE_*` dəyişənlərini yazın, sonra yenidən deploy edin.

Hər istifadəçinin saytı `sites/{uid}_{şablon}` yolunda saxlanılır və qaydalar yalnız sahibinə oxumağa və yazmağa icazə verir. Şəkillər hələlik qaralamanın içində base64 kimi saxlanılır (8 MB-dan böyük sayt yazılmır). Dərc edilmiş sayt üçün şəkillər Firebase Storage-ə köçürülməlidir.

## Şablon önizləmə şəkilləri

`public/previews/` qovluğundakı tam səhifə şəkilləri şablonlar dəyişəndə yenilənməlidir. Layihə serveri işləyərkən (`npm run build && npm start -- -p 3100`) və `playwright` quraşdırılmış halda:

```
node scripts/make-previews.mjs
```

`PREVIEW_BASE` ünvanı, `CHROME_PATH` isə brauzer faylını göstərmək üçündür.
