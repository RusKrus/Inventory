import { RootState } from "./store";
import { Order, Product } from "@/utils/types";
import { createSelector } from "reselect";

//order slice selectors
export const getOrders = (state: RootState): Order[] => state.ordersData.orders;
export const getProducts = (state: RootState): Product[] => state.ordersData.products;

export const getOrderById = createSelector(
    [getOrders, (state, orderId)=>orderId], 
    (orders: Order[], orderId: string): Order | string => {
        return orders.find((order: Order)=>order.id === orderId)??'Приход по такому id не найден!';
    }
);

export const getProductById = createSelector(
    [getProducts, (state, productId)=>productId], 
    (products: Product[], productId: string): Product | string => {
        return products.find((product: Product)=>product.id===productId)??'Продукт с таким id не найден!';
    }
);

export const getRelatedProducts = createSelector(
    [getProducts, (state, orderId)=>orderId], 
    (products: Product[], orderId: string): Product[] => {
        return products.filter((product: Product)=>product.order===orderId);
    }
);

//currency slice selectors
export const getUsdToUaRate = (state: RootState): number => state.currencyRate.usdToUa;