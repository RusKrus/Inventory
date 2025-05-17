
import { Order } from '@/utils/types';
import mockData from '@/mockData/mockData';

export const getOrders = async (): Promise<Order[]> => {
    return new Promise((resolve) => {
        setTimeout((): void =>{
            const orders: Order[] = mockData; 
            resolve(orders);
        }, 1000);
    }) 
}