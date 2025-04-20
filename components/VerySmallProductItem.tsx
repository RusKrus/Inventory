'use client'

import Image from 'next/image'
import type {  SmallProductDataContainer } from '@/utils/types';
import { getCorrectProductImage } from '@/utils/utilFunctions';

export default function SmallProductItem({product}: SmallProductDataContainer ): React.JSX.Element {

    const src: string = getCorrectProductImage(product.type);


    return (
        <div className='flex min-w-full justify-between w-fit items-center py-2 px-10 border-y-1 border-gray-300 text-gray-500 text-lg space-x-2 bg-white '>
            <div className='flex items-center '>
                <Image 
                    src={src}
                    alt='Тип продукта'
                    width={72}
                    height={72}
                />
                <p className='min-w-fit w-50 ml-5'>
                    <span className='underline underline-offset-5 decoration-gray-300 decoration-2 text-gray-800 font-semibold '>{product.title}</span>
                    <br />
                    <span className=' text-gray-400 text-sm'>SN: {product.serialNumber}</span>
                </p>
            </div>
        </div>
)
}