import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Order, Product, OrdersState } from '@/utils/types';
import type { PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "@/utils/mockFetching";

export const fetchingOrders = createAsyncThunk(
    'orders/fetchingOrders', 
    async () => {
        const response: Order[] = await getOrders();
        return response;
    }
);

const initialState: OrdersState = {
    status: 'initial',
    orders: [],
    products: []
};

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        setDataFromSessionStorage(state, action: PayloadAction<{orders: Order[], products: Product[]}>){
            state.orders = action.payload.orders;
            state.products = action.payload.products;
            state.status = 'restored';
        }, 
        removeOrder(state, action: PayloadAction<{orderId:number|string}>){
            state.orders = state.orders.filter((order: Order)=>order.id!==action.payload.orderId);
            state.products = state.products.filter((product: Product)=>product.order!==action.payload.orderId);
            state.status='updated';
        },
        addOrder(state, action: PayloadAction<{order: Order}>){
            state.orders.push(action.payload.order);
            state.status='updated';
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchingOrders.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchingOrders.fulfilled, (state, action: PayloadAction<Order[]>) =>{
            state.status = 'loaded';
            state.orders = action.payload;
            state.products = action.payload.reduce((acc: Product[], order: Order)=>[...acc, ...order.products], []);
        })
        .addCase(fetchingOrders.rejected, (state)=>{
            state.status='rejected';
        })
    }

});

export const { setDataFromSessionStorage, removeOrder, addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
