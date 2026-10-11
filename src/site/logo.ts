/**
 * مصدر واحد لشعار المنصة.
 * نستورده عبر Vite ليحمل الاسم بصمة محتواه (logo-<hash>.png)، فلا يقدّم
 * المتصفح أو CDN نسخة قديمة بعد أي تحديث للشعار.
 */
import logoUrl from "@/assets/logo.png";

export const LOGO = logoUrl;
