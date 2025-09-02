# خطوات إضافية لحل مشكلة Rollup في Vercel

بعد ملاحظة استمرار مشكلة Rollup في Vercel، إليك بعض الخطوات الإضافية التي يمكن تجربتها:

## 1. تحديث إصدار Node.js في Vercel

قد تكون المشكلة متعلقة بإصدار Node.js المستخدم في Vercel. يمكنك تحديد إصدار Node.js في ملف `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install --omit=optional",
  "github": {
    "silent": true
  },
  "nodeVersion": "18.x"
}
```

## 2. استخدام حل بديل لـ Rollup

يمكنك تجربة تثبيت حزمة `@rollup/rollup-linux-x64-gnu` بشكل صريح في `package.json`:

```json
"devDependencies": {
  "@rollup/rollup-linux-x64-gnu": "4.9.0",
  // الحزم الأخرى...
}
```

## 3. تعديل سكريبت البناء في package.json

يمكنك تعديل سكريبت البناء في `package.json` ليتجاهل الأخطاء المتعلقة بـ Rollup:

```json
"scripts": {
  "build": "node --no-warnings ./node_modules/.bin/vite build",
  // السكريبتات الأخرى...
}
```

## 4. استخدام ملف .npmrc

قمنا بإنشاء ملف `.npmrc` في جذر المشروع بالمحتوى التالي:

```
omit=optional
legacy-peer-deps=true
```

هذا الملف يوجه npm لتجاهل التبعيات الاختيارية ويسمح باستخدام نمط التبعيات القديم، مما قد يساعد في حل مشكلة Rollup.

## 5. تجربة استخدام pnpm بدلاً من npm

يمكنك تجربة استخدام pnpm بدلاً من npm في Vercel عن طريق تعديل ملف `vercel.json`:

```json
{
  "installCommand": "npx pnpm install --no-optional",
  "buildCommand": "npx pnpm run build"
}
```

## 6. تحديث إصدار Vite

قد تكون المشكلة متعلقة بإصدار Vite المستخدم. يمكنك تحديث إصدار Vite في `package.json`:

```json
"devDependencies": {
  "vite": "^5.0.0",
  // الحزم الأخرى...
}
```

## 7. استخدام Vercel CLI للتشخيص المحلي

يمكنك استخدام Vercel CLI لتشخيص المشكلة محلياً:

```bash
npm install -g vercel
vercel login
vercel build
```

هذا سيساعدك على رؤية الأخطاء بشكل أكثر تفصيلاً ومحاولة إصلاحها قبل الدفع إلى GitHub.

## 8. تجربة حل جذري: إعادة إنشاء المشروع

إذا استمرت المشكلة، يمكنك تجربة إنشاء مشروع Vite جديد ونقل الكود إليه:

```bash
npm create vite@latest new-project -- --template react
cd new-project
npm install
```

ثم انقل الملفات من المشروع القديم إلى المشروع الجديد، مع الحرص على عدم نقل ملفات الإعداد التي قد تكون سبب المشكلة مثل `package-lock.json` و `node_modules`.