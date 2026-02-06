import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;

  // Toujours retourner une locale valide (string)
  const baseLocale =
    locale && locales.includes(locale as any)
      ? locale
      : defaultLocale;

  return {
    locale: baseLocale, //  string garanti
    messages: (await import(`../messages/${baseLocale}.json`)).default
  };
});
