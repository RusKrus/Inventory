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
            <button className='w-fit' data-modal='open-delete-product' data-productid={product.id}>
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-red-500 duration-200 hover:cursor-pointer ">
                    <use href='#delete'/>
                </svg>
            </button>
        </div>
)
}