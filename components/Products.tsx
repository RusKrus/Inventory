'use client'
import {  useAppSelector } from '@/redux/typedReduxHooks';
import { useState } from 'react';
import ProductItem from './ProductItem';
import type { Product, CurrencyState } from '@/utils/types';

export default function Products(): React.JSX.Element{
    
    const ordersState = useAppSelector(state => state.ordersData);
    const productsQuantity: number = ordersState.products.length;
    const currencyState: CurrencyState  = useAppSelector(state => state.currencyRate);
    const [filterValue, setFilterValue] = useState<string>('');

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setFilterValue(event.target.value);
    };
    const filteredProducts: Product[] = filterValue.length>0?ordersState.products.filter((product: Product)=>product.type===filterValue):ordersState.products;

    return (
        <>
            <div className='flex items-center mb-15 space-x-20'>
                <h2 className='font-bold text-3xl '>Продукты / {productsQuantity}</h2>
                <div>
                    <label htmlFor='type' className='mr-5'>Тип:</label>
                    <select id='type' name='type' onChange={handleSelectChange} value={filterValue} className=' min-w-fit w-50 inset-shadow-xs inset-shadow-gray-400 font-semibold rounded-lg bg-white p-0.5'>
                        <option value='Клавиатура'>Клавиатура</option>
                        <option value='Мышь'>Мышь</option>
                        <option value='Гарнитура'>Гарнитура</option>
                        <option value='Монитор'>Монитор</option>
                        <option value=''>Все</option>
                    </select>
                </div>
                
            </div>
            <div className='space-y-2'>
                {filteredProducts.map((product: Product, index: number)=><ProductItem orders={ordersState.orders} product={product} key={index} currencyState={currencyState}/>)}
            </div>
        </>
    )
};
