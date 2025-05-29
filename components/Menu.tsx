'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
 



export default function Menu(): React.JSX.Element {
    const path = usePathname();
    const { t } = useTranslation("menu");


    return(
        <menu className='w-full flex flex-col items-center space-y-4 text-2xl font-semibold  '>
            <Link href='/' className={`menu-link ${path==='/'?'underline':null}`}>{t('orders')}</Link>
            <Link href='/groups' className={`menu-link ${path==='/groups'?'underline':null} text-gray-500`}>{t('groups')}</Link>
            <Link href='/products' className={`menu-link ${path==='/products'?'underline':null} `}>{t('products')}</Link>
            <Link href='/users' className={`menu-link ${path==='/users'?'underline':null} text-gray-500`}>{t('users')}</Link>
            <Link href='/settings' className={`menu-link ${path==='/settings'?'underline':null} text-gray-500`}>{t('settings')}</Link>

        </menu>
    )
};

