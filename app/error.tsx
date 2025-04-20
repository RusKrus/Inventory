'use client'

import type { ErrorProps } from "@/utils/types";
import { useEffect } from 'react';



export default function Error({ error, reset }: ErrorProps) {
    useEffect(() => {
        console.error('Ошибка приложения:', error);
      }, [error]);

    
    return (
        <div className='flex justify-center mt-20 mb-10 flex-wrap text-center'>
            <h2 className='text-3xl w-full'>Произошла ошибка!</h2>
            <div className='text-red-600'>
                <span >Код ошибки: {error.digest}</span>
                <br />
                <span>Текст ошибки: {error.message}</span>
            </div>
            
            <p className='text-xl my-5 w-full'>Перезагрузите страницу или обратитесь к администратору.</p>
            <button
                onClick={reset}
                className="inline-block bg-lime-500 hover:bg-lime-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
                Перезагрузить страницу
            </button>
        </div>
    )
}