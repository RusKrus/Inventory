import Link from "next/link"
import { headers } from 'next/headers';
import initTranslations from "@/i18n/i18nInitTranslations";

//из-за особенностей next.js, not-found не работает в динамических маршрутах, потому по гайду отсюда 
//https://github.com/i18nexus/next-i18n-router/issues/36#issuecomment-1821887026
//проблемеа решена с использованием дополнительного динамического маршрута, который вызывает not-found вручную
//для локализации not found, так как нет доступа к params, приходится использовать headers и получить язык из заголовка. 
//Not-found из-за этого не является SSG компонентом

export default async function NotFoundPage(): Promise<React.JSX.Element> {
    const headersList = await headers();
    const locale = headersList.get('x-next-i18n-router-locale') || 'ru';

    const { t } = await initTranslations(locale, ['not_found'])

    return (
        <div className='flex justify-center mt-20 mb-10 flex-wrap'>
            <div className='size-48 relative rounded-full border-lime-600 border-2 flex items-center justify-center bg-white '>
                <span className='text-5xl text-lime-600'>404</span>
                <div className='border-4 border-lime-500 opacity-25 animate-ping absolute rounded-full size-48'></div>
            </div>
            <h2 className='w-full text-center text-3xl my-10'>{t('message')}</h2>
            <Link href='/' className='bg-lime-500 text-white font-bold text-xl text-center p-2 rounded-md'>{t('back_btn')}</Link>
        </div>

    )
}