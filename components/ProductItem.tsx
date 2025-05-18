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
            <button className='w-fit' data-modal='open-delete-product' data-productid={product.id}>
                <svg  viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-red-500 duration-200 hover:cursor-pointer " >
                   <use href='#delete'/>
                </svg>
            </button>
        </div>
    )
}