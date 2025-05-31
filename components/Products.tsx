'use client'
import {  useAppSelector } from '@/redux/typedReduxHooks';
import { useState } from 'react';
import ProductItem from './ProductItem';
import type { Product, CurrencyState } from '@/utils/types';
import { useTranslation } from 'react-i18next'; 

export default function Products(): React.JSX.Element{
    const { t } = useTranslation("products");

    const ordersState = useAppSelector(state => state.ordersData);
    const productsQuantity: number = ordersState.products.length;
    const currencyState: CurrencyState  = useAppSelector(state => state.currencyRate);
    const productTypes: string[] = useAppSelector(state => state.ordersData.productTypes);
    const [filterValue, setFilterValue] = useState<string>('');
    
    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) =>{
        setFilterValue(event.target.value);
    };
    const filteredProducts: Product[] = filterValue.length>0?ordersState.products.filter((product: Product)=>product.type===filterValue):ordersState.products;

    return (
        <>
            <div className='flex items-center mb-15 space-x-20'>
                <h2 className='font-bold text-3xl '>{t("products", {number: productsQuantity})}</h2>
                <div>
                    <label htmlFor='type' className='mr-5'>Тип:</label>
                    <select id='type' name='type' onChange={handleSelectChange} value={filterValue} className='select-field'>
                        {productTypes.map((type: string, index: number) => <option key={index} value={type}>{t(type)}</option>)}
                        <option value=''>{t("all")}</option>
                    </select>
                </div>
                
            </div>
            <div className='space-y-2'>
                {filteredProducts.map((product: Product, index: number)=><ProductItem orders={ordersState.orders} product={product} key={index} currencyState={currencyState}/>)}
            </div>
        </>
    )
};
