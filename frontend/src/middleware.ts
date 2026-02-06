import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always' // Force l'affichage de la locale dans l'URL
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};