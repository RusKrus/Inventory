'use client';

import { I18nextProvider } from 'react-i18next';
import initTranslations from './i18nInitTranslations';
import { createInstance, ResourceLanguage } from 'i18next';
import { Suspense } from 'react';

type TranslationsProviderProps = {
    children: React.ReactNode,
    locale: string, 
    namespaces?: string[],
    resources?: { [locale: string]: ResourceLanguage }
}

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources
}: TranslationsProviderProps): React.JSX.Element {

  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}><Suspense>{children}</Suspense></I18nextProvider>;
};