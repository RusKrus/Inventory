'use client'

import Image from 'next/image'
import type {  SmallProductDataContainer } from '@/utils/types';
import { getCorrectProductImage, getDateFromString } from '@/utils/utilFunctions';

export default function SmallProductItem({product}:SmallProductDataContainer ): React.JSX.Element {

    const src: string = getCorrectProductImage(product.type);
    const guaranteeStartShort: string  = getDateFromString(product.guarantee.start).short;
    const guaranteeEndShort: string  = getDateFromString(product.guarantee.end).short;

    return (
        <div className='flex min-w-full justify-between w-fit items-center py-2 px-10 border-y-1 border-gray-300 text-gray-500 text-lg space-x-2 bg-white hover:cursor-pointer hover:inset-shadow-sm inset-shadow-gray-400'>
            <div className='flex items-center '>
                <Image 
                    src={src}
                    alt='Тип продукта'
                    width={72}
                    height={72}
                />
                <p className='min-w-fit w-50 ml-5'>
                    <span className='underline underline-offset-4 decoration-gray-300 decoration-2 text-gray-800 font-semibold '>{product.title}</span>
                    <br />
                    <span className=' text-gray-400 text-sm'>SN: {product.serialNumber}</span>
                </p>
            </div>
            <p className='text-sm font-semibold '>
                <span >{guaranteeStartShort}</span>
                <br />
                <span>{guaranteeEndShort}</span>
            </p>
            <button className='w-fit'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-red-500 duration-200 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
)
}