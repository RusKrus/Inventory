'use client'

import type { OrderDataContainer, Product } from '@/utils/types';
import { getProductWordWithCorrectEnding, getDateFromString} from '@/utils/utilFunctions';
import {  useState } from 'react';
import VerySmallProductItem from './VerySmallProductItem';
import { removeOrder } from '@/redux/ordersSlice';



export default function OrderItem({dispatch, order,  currencyState, isOpenedData, openedOrderData}: OrderDataContainer): React.JSX.Element {

    const { isDetailsOpened, setIsDetailsOpened } = isOpenedData;
    const { openedOrderId, setOpenedOrderId } = openedOrderData;
    const [openModal, setOpenModal] = useState<boolean>(false);
    const currencyRateUa: number = currencyState.usdToUa;
    const currencyStatus: string = currencyState.status;
    

    const handleOpenModalClick = () => {
        setOpenModal(true);
    };
    const handleCloseModalClick = () => {
        setOpenModal(false);
    };
    const handleDeleteOrderClick = (): void => {
        dispatch(removeOrder({orderId: order.id}));
        setOpenModal(false);
    };



    const onOpenDetailsClick = (): void => {
        setOpenedOrderId(order.id);
        if(openedOrderId===order.id&&isDetailsOpened===true){
            setIsDetailsOpened(false);
        }
        else{
            setIsDetailsOpened(true);
        }
    };


    const totalPrice = order.products.reduce((acc, product)=> acc + product.price[0].value, 0)
    const numberOfProducts: number = order.products.length;
    const productsWord: string = getProductWordWithCorrectEnding(numberOfProducts);
    const dateObject: {full: string, short: string} = getDateFromString(order.date)

    return(
                <div className={`flex gap-x-4 w-full min-w-fit ${isDetailsOpened?'justify-start space-x-10 pr-0 ':'justify-between pr-10'} items-center py-2 px-10 ${(isDetailsOpened&&openedOrderId===order.id)?'border-3 border-gray-300 inset-shadow-sm inset-shadow-gray-300 ':'border-2 border-gray-300'} relative rounded-md text-gray-500 text-lg bg-white`}>
                    <p className={` underline underline-offset-4 decoration-gray-300 decoration-2 font-semibold origin-left w-40 ${isDetailsOpened?'hidden':'block'} duration-400`}>{order.title}</p>
                    <div className='flex space-x-3 w-30 min-w-fit'>
                        <button onClick = {onOpenDetailsClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`size-10 border-1 border-black/10 rounded-full p-1 hover:cursor-pointer hover:fill-lime-500 hover:border-lime-500 duration-200 ${(isDetailsOpened&&openedOrderId===order.id)?'fill-lime-500 border-lime-500':''}`}>
                                <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
                            </svg>
                        </button>1
                        <p>
                            <span className='font-semibold text-xl'>{numberOfProducts}</span> <br /> <span className='text-sm text-gray-400'>{productsWord}</span>
                        </p>
                    </div>
                    <p className='text-lg font-semibold text-center w-50 min-w-fit'>
                        <span className='text-xs '>{dateObject.short}</span>
                        <br />
                        <span className='font-semibold '>{dateObject.full}</span>
                    </p>
                    <p className={`${isDetailsOpened?'hidden':'block'} w-25 min-w-fit`}> 
                        <span className='text-xs '>{totalPrice} $</span>  
                        <br />   
                        <span className={`font-semibold ${currencyStatus==='loaded'?'opacity-100':'opacity-0'} duration-400`}>{totalPrice*currencyRateUa} <span className='text-xs'>UAH</span></span>
                    </p>
                    <button onClick={handleOpenModalClick} className={`${isDetailsOpened?'hidden':'block'} min-w-fit`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-red-500 duration-200 hover:cursor-pointer ">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <div className={`modal-backdrop ${openModal?'':'invisible'} `}>
                        <div className={`modal-container ${openModal?'opacity-100':'opacity-0'}`}>
                            <h3 className='font-bold text-xl p-5 bg-red-600 rounded-t-md text-white mb-5'>Вы точно хотите удалить этот приход?</h3>
                            <h4 className='text-xl text-center mb-3'>Имя прихода: <span className='font-bold underline decoration-2 underline-offset-5 '>{order.title}</span></h4>
                            <div>
                                {order.products.length > 0?
                                order.products.map((productData: Product, index: number)=><VerySmallProductItem key={index} product={productData}/>):
                                <p className='text-xl font-semibold text-center mb-5 border-y-1 border-gray-200 py-2'>У этого прихода нет продуктов</p>
                            }
                            </div> 
                            <div className='bg-lime-600/90 p-5 rounded-b-md text-right space-x-5 font-semibold'>
                                <button onClick={handleCloseModalClick} className='hover:cursor-pointer text-white hover:text-red-600 duration-100'>Отменить</button>
                                <button onClick={handleDeleteOrderClick} className='hover:cursor-pointer text-red-600 bg-white rounded-lg p-1 hover:scale-105 duration-100'>Удалить</button>
                            </div>
                            <button onClick={handleCloseModalClick} className='text-gray-400 bg-white absolute -top-5 -right-5 size-8 rounded-full  shadow-[0_0_5px_2px] shadow-gray-400 hover:cursor-pointer hover:text-red-500 hover:font-bold'>X</button>
                        </div>
                    </div>
                    <div className={`${(isDetailsOpened&&openedOrderId===order.id)?'flex':'hidden'} text-white bg-gray-300 p-2 absolute right-0 top-0 bottom-0 items-center font-bold text-xl`}>{'>'}</div>
                </div>         
    )
}