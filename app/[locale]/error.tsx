'use client'

import type { ErrorProps } from "@/utils/types";
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";


export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error('Ошибка приложения:', error);
      }, [error]);

    const { t } = useTranslation('error')
    
    return (
        <div className='flex justify-center mt-20 mb-10 flex-wrap text-center'>
            <h2 className='text-3xl w-full'>{t('error_occured')}</h2>
            <div className='text-red-600'>
                <span >{t('error_code', { code: error.digest })}</span>
                <br />
                <span>{t('error_message', { text: error.message })}</span>
            </div>
            
            <p className='text-xl my-5 w-full'>{t('request')}</p>
            <button
                onClick={reset}
                className="inline-block bg-lime-500 hover:bg-lime-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
                {t('reload')}
            </button>
        </div>
    )
}