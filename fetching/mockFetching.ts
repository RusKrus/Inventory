
import { Order, Product, RequestedData } from '@/utils/types';
import { mockedOrders, mockedProducts } from '@/mockData/mockData';

export const getOrders = async (): Promise<RequestedData> => {
    return new Promise((resolve) => {
        setTimeout((): void =>{
            const orders: Order[] = mockedOrders; 
            const products: Product[] = mockedProducts;
            resolve({orders, products});
        }, 1000);
    }) 
}