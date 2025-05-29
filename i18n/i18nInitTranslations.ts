import { createInstance } from 'i18next';
import type { i18n, ResourceLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import backend from 'i18next-http-backend';
import { i18nConfig } from './i18nConfig';

export default async function initTranslations(
  locale: string, 
  namespaces: string[] = ['common'], 
  i18n: i18n = createInstance(), 
  resources?: { [locale: string]: ResourceLanguage }
): Promise<i18n> {

  i18n.use(initReactI18next).use(backend);

  if (!resources) {
    i18n.use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`)
      )
    );
  }

  await i18n.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales, 
    backend: {
        loadPath: '/locales/{{lng}}/{{ns}}.json',
      },
  });

  return i18n;
};