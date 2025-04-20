'use client'

import { useAppSelector, useAppDispatch } from '@/redux/typedReduxHooks';
import type { Order, Product, CurrencyState } from '@/utils/types';
import { createNewOrder } from '@/utils/utilFunctions';
import OrderItem  from './OrderItem';
import SmallProductItem from './SmallProductItem';
import { useState, useActionState, useEffect } from 'react';
import { createdOrderValidator } from './actions/createOrderValidator';
import { addOrder } from '@/redux/ordersSlice';
import ThreeDotAnimated from './ThreeDotAnimated';


export default function Orders(): React.JSX.Element {
    const [isDetailsOpened, setIsDetailsOpened] = useState<boolean>(false);
    const [openedOrderId, setOpenedOrderId] = useState<number|null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleOpenModalClick = () => {
        setOpenModal(true);
    };
    const handleCloseModalClick = () => {
        setOpenModal(false);
    };

    const ordersState = useAppSelector(state => state.ordersData);
    const ordersQuantity: number = ordersState.orders.length;
    const currencyState: CurrencyState = useAppSelector(state => state.currencyRate);
    const dispatch = useAppDispatch();

    const currentOrderInfo: Order|null = ordersState.orders.find((order: Order)=>order.id===openedOrderId)??null;
    const relatedProducts: Product[] = ordersState.products.filter((product: Product)=>openedOrderId===product.order);

    const handleCloseDetailsButtonClick = (): void => {
        setIsDetailsOpened(false);
    };

    const [formState, orderValidatorObserved, pending] = useActionState(createdOrderValidator, {success: 'idle', errors: {}, obtainedFormData: {} });

    useEffect(() => {
        if(formState.success===true){
            const formData = formState.obtainedFormData;
            if(formData instanceof FormData){
                const name = formData.get('name')?.toString()??'Имя не задано';
                const date = formData.get('date')?.toString().trim()??Date();
                const description = formData.get('description')?.toString()??'Описание отсутствует';
                const order = createNewOrder(name, date, description);
                dispatch(addOrder({order}));
                setOpenModal(false);
            };
        }
    }, [formState, dispatch]);

    

    
    return (
        <>
            <div className='flex items-center mb-15'>
                <button onClick={handleOpenModalClick} className='hover:scale-110 duration-100'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className = 'size-8 bg-lime-500 rounded-full p-2.5 ring-4 ring-lime-600/90 fill-white mr-5 hover:cursor-pointer'>
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                    </svg>
                </button>
                <div className={`modal-backdrop ${openModal?'':'invisible'} `}>
                    <div className={`modal-container ${openModal?'opacity-100':'opacity-0'}`}>
                        <h3 className='font-bold text-xl p-5 rounded-t-md bg-lime-600/90 text-white'>Создание нового прихода</h3>
                        <form action={orderValidatorObserved} className='border-t-1 border-gray-300 pt-2' >
                            <div className='px-5 space-y-10 mb-30'>
                                <div className='w-full space-y-2'>
                                    <label htmlFor='name'  className=' w-full block font-semibold'>
                                        Имя прихода (только буквы и цифры, с заглавной буквы)<span className='text-red-600'>*</span>
                                        <span className='block w-full text-sm font-normal'>Имена &quot;Приход 1&quot;, &quot;Приход 2&quot;, &quot;Приход 3&quot; запрещены! </span>
                                    </label>
                                    <input required pattern='^[A-ZА-Я][a-zа-я1-9 ]*$' type="text" id='name' name='name' className='w-1/2 p-1'/>
                                    {formState.errors.nameError?<span className='block w-full text-red-600 text-sm font-normal'>{formState.errors.nameError}</span>: null}
                                </div>
                                
                                <div className=' w-full space-y-2'>
                                    <label htmlFor='date'  className=' w-full block font-semibold'>
                                        Дата прихода<span className='text-red-600'>*</span>
                                    </label>
                                    <input required type="date" id='date' name='date' className='w-1/2 p-1'/>
                                </div>

                                <div className=' w-full space-y-2'>
                                    <label htmlFor='description'  className=' w-full block font-semibold'>
                                        Описание прихода (минимум 4 символа)<span className='text-red-600'>*</span>
                                    </label>
                                    <input required pattern='^.{4,}$' type="text" id='description' name='description' className='w-1/2 p-1'/>
                                </div>
                            </div>

                            <div className='absolute bottom-0 bg-lime-600/90 p-5 text-right space-x-5 font-semibold rounded-b-md w-full '>
                                <button type='button' className='hover:cursor-pointer text-white hover:text-red-500 duration-100' onClick={handleCloseModalClick} >Отменить</button>
                                <button type="submit" className='hover:cursor-pointer hover:scale-105 hover:text-green-600 duration-100 bg-white rounded-lg p-1 disabled:text-gray-400' disabled={pending?true:false}>
                                    {pending?`Приход создается`:'Создать приход'}{pending?<ThreeDotAnimated />:''}
                                </button>
                            </div>
                        </form>
                        <button onClick={handleCloseModalClick} className='text-gray-400 bg-white absolute -top-5 -right-5 size-8 rounded-full  shadow-[0_0_5px_2px] shadow-gray-400 hover:cursor-pointer hover:text-red-500 hover:font-bold'>X</button>
                    </div>
                </div>

                <h2 className='font-bold text-3xl '>Приходы / {ordersQuantity}</h2>
            </div>
            <div className={` ${isDetailsOpened?'grid grid-cols-[1fr_2fr]':'grid grid-cols-[1fr_0fr]'} relative space-x-5 `}>
                <div className={`space-y-2 `}>
                    {ordersState.orders.map((order: Order, index: number)=><OrderItem key={index} dispatch={dispatch} order={order} currencyState={currencyState}  isOpenedData={{isDetailsOpened, setIsDetailsOpened}} openedOrderData={{openedOrderId, setOpenedOrderId}} />)}
                </div>
                    <div className={`${(isDetailsOpened)?'block':'hidden'} border-gray-300 border-2 rounded-md bg-white relative max-h-fit `}>
                        {currentOrderInfo!==null?
                            <>  
                                <div className='p-5 absolute w-full top-0 '>
                                    <h3 className='text-2xl font-bold mb-5'>{currentOrderInfo.title}</h3>
                                    <button className='hover:cursor-pointer flex items-center text-lime-500 font-semibold mb-3'>
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


