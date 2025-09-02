# تعليمات النشر

## رفع المشروع على GitHub

بما أن مشروعك موجود بالفعل على GitHub في المستودع `https://github.com/ahmed-sayed37/E-commerce`، يمكنك تحديث المستودع بالتغييرات الجديدة باستخدام الأوامر التالية:

```bash
# التأكد من أنك في المجلد الصحيح
cd "d:\New folder (3)\react\my-project"

# إضافة المستودع البعيد إذا لم يكن موجودًا بالفعل
git remote -v
# إذا لم يظهر المستودع، قم بإضافته
git remote add origin https://github.com/ahmed-sayed37/E-commerce.git

# تحديث التغييرات
git add .
git commit -m "إصلاح مشكلة النشر على Vercel"
git push origin main
```

## إصلاح مشكلة النشر على Vercel

تم إنشاء ملف خاص بإصلاح مشكلة النشر على Vercel. يرجى الاطلاع على الملف `VERCEL_DEPLOY_FIX.md` للحصول على تعليمات مفصلة حول كيفية إصلاح المشكلة.

الخطوات الرئيسية:

1. تم تحديث ملف `vercel.json` بإعدادات أكثر تفصيلاً
2. تم إزالة النسخة المكررة من ملف `vercel.json` من مجلد `src`
3. تم إنشاء ملف `.env.example` لتوضيح المتغيرات البيئية المطلوبة

## إعداد النشر على Vercel

1. قم بزيارة [Vercel](https://vercel.com/) وتسجيل الدخول إلى حسابك
2. إذا كان لديك مشروع موجود بالفعل، قم بحذفه من خلال:
   - الانتقال إلى [مشروعك على Vercel](https://vercel.com/ahmed-sayed37s-projects/e-commerce/)
   - الذهاب إلى "Settings" > "General" > "Delete Project"
3. قم بإنشاء مشروع جديد واختر المستودع `ahmed-sayed37/E-commerce`
4. اضبط الإعدادات التالية:
   - Framework Preset: Vite
   - Root Directory: ./
   - Build Command: npm run build
   - Output Directory: dist
5. أضف أي متغيرات بيئية مطلوبة في قسم "Environment Variables"
6. انقر على "Deploy" لبدء عملية النشر

## إعداد النشر التلقائي

لتفعيل النشر التلقائي على Vercel عند الدفع إلى GitHub:

1. قم بإنشاء Vercel Token من إعدادات حسابك
2. أضف هذا Token كسر في مستودع GitHub الخاص بك باسم `VERCEL_TOKEN`
3. تم إنشاء ملف workflow في `.github/workflows/vercel-deploy.yml` لتمكين النشر التلقائي