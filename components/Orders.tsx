'use client'

import { useAppSelector } from '@/redux/typedReduxHooks';
import type { Order, Product, CurrencyState } from '@/utils/types';
import OrderItem  from './OrderItem';
import SmallProductItem from './SmallProductItem';
import { useState } from 'react';


export default function Orders(): React.JSX.Element {
    const [isDetailsOpened, setIsDetailsOpened] = useState<boolean>(false);
    const [openedOrderId, setOpenedOrderId] = useState<string|null>(null);

    const ordersState = useAppSelector(state => state.ordersData);
    const ordersQuantity: number = ordersState.orders.length;
    const currencyState: CurrencyState = useAppSelector(state => state.currencyRate);


    const currentOrderInfo: Order|null = ordersState.orders.find((order: Order)=>order.id===openedOrderId)??null;
    const relatedProducts: Product[] = ordersState.products.filter((product: Product)=>openedOrderId===product.order);

    const handleCloseDetailsButtonClick = (): void => {
        setIsDetailsOpened(false);
    };
    

    
    return (
        <>
            <div className='flex items-center mb-15'>
                <button data-modal='open-add-order'  className='hover:scale-110 duration-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className = 'size-8 bg-lime-500 rounded-full p-2.5 ring-4 ring-lime-600/90 fill-white mr-5 hover:cursor-pointer'>
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                    </svg>
                </button>
                <h2 className='font-bold text-3xl '>Приходы / {ordersQuantity}</h2>
            </div>
            <div className={` ${isDetailsOpened?'grid grid-cols-[1fr_2fr]':'grid grid-cols-[1fr_0fr]'} relative space-x-5 `}>
                <div className={`space-y-2 `}>
                    {ordersState.orders.map((order: Order, index: number)=><OrderItem key={index} order={order} currencyState={currencyState}  isOpenedData={{isDetailsOpened, setIsDetailsOpened}} openedOrderData={{openedOrderId, setOpenedOrderId}} />)}
                </div>
                    <div className={`${(isDetailsOpened)?'block':'hidden'} border-gray-300 border-2 rounded-md bg-white relative max-h-fit `}>
                        {currentOrderInfo!==null?
                            <>  
                                <div className='p-5 absolute w-full top-0 '>
                                    <h3 className='text-2xl font-bold mb-5'>{currentOrderInfo.title}</h3>
                                    <button data-modal='open-add-product' className='hover:cursor-pointer flex items-center text-lime-500 font-semibold mb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className = 'size-4 bg-lime-500 rounded-full p-0.5 fill-white mr-2 '>
                                            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                                        </svg>
                                        Добавить продукт
                                    </button>
                                </div>
                                <div className=' mt-32 '>
                                    {relatedProducts.length>0?
                                    relatedProducts.map((productInfo: Product, index)=><SmallProductItem key={index}  product={productInfo}/>):
                                    <p className='text-xl font-semibold text-center mb-5 border-y-1 border-gray-200 py-2'>У этого прихода пока что нет продуктов</p>
                                    }
                                </div>
                            </>: 
                            <h3 className='text-2xl font-bold mb-5 text-center'>Информация по этому приходу не найдена! <br /><span className='text-lg text-gray-400 font-semibold'>Если проблема не прошла - откройте сайт в новой вкладке</span></h3>
                        }
                        <button onClick={handleCloseDetailsButtonClick} className={`text-gray-400 ${(isDetailsOpened)?'inline-block':'hidden'} bg-white absolute -top-5 -right-5 size-8 rounded-full  shadow-[0_0_5px_2px] shadow-gray-400 hover:cursor-pointer hover:text-red-500 hover:font-bold`}>X</button>
                    </div>
                </div>

        </>
    )
}


