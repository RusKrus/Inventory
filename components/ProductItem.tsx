'use client'

import type { ProductDataContainer, Order } from '@/utils/types';
import { getCorrectProductImage, getDateFromString } from '@/utils/utilFunctions';
import Image from 'next/image';

export default function ProductItem({orders, product, currencyState}: ProductDataContainer): React.JSX.Element{

    const price: number = product.price[0].value;
    const currencyRateUa: number = currencyState.usdToUa;
    const priceUA: string = (price*currencyRateUa).toFixed(2)
    const relatedOrder: Order | undefined = orders.find((order: Order)=>order.id===product.order);
    const orderName = relatedOrder?.title ?? 'Приход не найден';
    const src: string = getCorrectProductImage(product.type);
    const guaranteeStart: {full: string, short: string} = getDateFromString(product.guarantee.start);
    const guaranteeEnd: {full: string, short: string} = getDateFromString(product.guarantee.end);
    const currencyStatus: string = currencyState.status;



    return(
        <div className='flex min-w-full justify-between w-fit items-center py-2 px-10 border-2 border-gray-300 rounded-md text-gray-500 text-lg space-x-2 bg-white'>
            <Image 
                src={src}
                alt='Тип продукта'
                width={96}
                height={96}
            />
            <p className='min-w-fit w-50 '>
                <span className='underline underline-offset-4 decoration-gray-300 decoration-2 text-gray-800 font-semibold '>{product.title}</span>
                <br />
                <span className=' text-gray-400 text-sm'>SN: {product.serialNumber}</span>
            </p>
            <p className='min-w-fit w-40'>{product.type}</p>
            <div className='min-w-fit w-50 font-semibold'>
                <p className='flex items-center w-fit border-b-1 border-gray-500'>
                    <span className='mr-5 text-sm text-gray-400 '>с</span>
                    <span className='text-center'>
                        <span className='text-xs '>{guaranteeStart.short}</span>
                        <br />
                        <span>{guaranteeStart.full}</span>
                    </span>
                </p>
                
                <p className='flex items-center w-fit'>
                    <span className='mr-3 text-sm text-gray-400'>по</span>
                    <span className='text-center'>
                        <span className='text-xs '>{guaranteeEnd.short}</span>
                        <br />
                        <span>{guaranteeEnd.full}</span>
                    </span>
                </p>
                
            </div>
            <p className='min-w-fit w-40'> 
                <span className='text-xs color-gray-400'>{price} $</span>  
                <br /> 
                <span className={`font-semibold ${currencyStatus==='loaded'?'opacity-100':'opacity-0'} duration-400`}>{priceUA} <span className='text-xs'>UAH</span></span>
            </p>
            <p className='min-w-fit w-50 underline underline-offset-4 decoration-gray-300 decoration-2 font-semibold'>{orderName}</p>
            <button className='w-fit'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-red-500 duration-200 hover:cursor-pointer ">
                    <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    )
}