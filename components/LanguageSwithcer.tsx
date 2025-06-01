'use client'
import { i18nConfig } from '@/i18n/i18nConfig';
import { useCurrentLocale } from 'next-i18n-router/client';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwithcer(): React.JSX.Element {
    const router = useRouter();  
    const pathname = usePathname();

    const locale = useCurrentLocale(i18nConfig)??"ru";
    const handleOptionClick = (e: React.ChangeEvent<HTMLSelectElement>): void => {
      const newLocale: string = e.currentTarget.value;

      const days = 30;
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      const expires = date.toUTCString();
      document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

      if(locale==='ru'){
        router.push(`${newLocale}/${pathname}`);
      }
      else{
        router.push(pathname.replace(locale, newLocale)); 
      }
    };


  
  return (
    <select onChange={handleOptionClick} value={locale} className='select-field inset-shadow-sm bg-gray-200 text-center w-fit'>
        <option value="uk">Україньска</option>
        <option value="ru">Русский</option>
        <option value="en">English</option>
    </select>
  );
}



