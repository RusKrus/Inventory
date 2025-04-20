'use client'

import {  useAppSelector, useAppDispatch } from '@/redux/typedReduxHooks';
import { fetchingOrders, setDataFromSessionStorage } from '@/redux/ordersSlice';
import { useEffect } from 'react';
import { fetchingCurrency } from '@/redux/currencySlice';
import type { Order, Product } from '@/utils/types';

export default function Template({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const ordersState = useAppSelector(state => state.ordersData);

    

    useEffect(() => {
        dispatch(fetchingCurrency());



        const savedOrders: string | null = sessionStorage.getItem('orders');
        const savedProducts: string | null = sessionStorage.getItem('products');
        
        if((!savedOrders&&!savedProducts)&&!(ordersState.status ===  'loaded'||ordersState.status ===  'updated')){
            console.log('data set from server');
            dispatch(fetchingOrders());
        }
        else if((savedOrders&&savedProducts)&&(ordersState.status !==  'restored')){
            console.log('data set from storage');
            const ordersFromStorage: Order[]  = JSON.parse(savedOrders);
            const productsFromStorage: Product[] = JSON.parse(savedProducts);
            dispatch(setDataFromSessionStorage({orders: ordersFromStorage, products: productsFromStorage}));
        };
    }, []);

    useEffect(()=>{

        if(ordersState.status ===  'loaded'){
            const storageSetter = (): void => {
                console.log('data set to storage');
                const jsonOrders: string = JSON.stringify(ordersState.orders);
                const jsonProducts: string = JSON.stringify(ordersState.products);
                sessionStorage.setItem('orders', jsonOrders);
                sessionStorage.setItem('products', jsonProducts); 
            };
            window.addEventListener('beforeunload', storageSetter);
            return () => {
                window.removeEventListener('beforeunload', storageSetter);
            };
        }else if(ordersState.status ===  'updated'){
            console.log('data set to storage');
            const jsonOrders: string = JSON.stringify(ordersState.orders);
            const jsonProducts: string = JSON.stringify(ordersState.products);
            sessionStorage.setItem('orders', jsonOrders);
            sessionStorage.setItem('products', jsonProducts); 
        };
    }, [ordersState]);

    return <div>{children}</div>
  }