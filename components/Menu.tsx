'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { useCurrentLocale } from 'next-i18n-router/client';
import { i18nConfig } from '@/i18n/i18nConfig';
 



export default function Menu(): React.JSX.Element {
    const path = usePathname();
    const locale = useCurrentLocale(i18nConfig);
    
    const { t } = useTranslation(["menu", "common"]);

    return(
        <menu className='w-full flex flex-col items-center space-y-4 text-2xl font-semibold  '>
            <Link href={`/${locale}`} className={`menu-link ${locale==="ru"?(path===`/`?'underline':null):(path===`/${locale}`?'underline':null)}`}>{t('orders')}</Link>
            <Link href={`/${locale}/groups`} className={`menu-link ${locale==="ru"?(path===`/groups`?'underline':null):(path===`/${locale}/groups`?'underline':null)} text-gray-500`}>{t('groups')}</Link>
            <Link href={`/${locale}/products`} className={`menu-link ${locale==="ru"?(path===`/products`?'underline':null):(path===`/${locale}/products`?'underline':null)} `}>{t('products')}</Link>
            <Link href={`/${locale}/users`} className={`menu-link ${locale==="ru"?(path===`/users`?'underline':null):(path===`/${locale}/users`?'underline':null)} text-gray-500`}>{t('users')}</Link>
            <Link href={`/${locale}/settings`} className={`menu-link ${locale==="ru"?(path===`/settings`?'underline':null):(path===`/${locale}/settings`?'underline':null)} text-gray-500`}>{t('settings')}</Link>
        </menu>
    )
};

