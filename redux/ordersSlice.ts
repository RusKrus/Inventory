import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Order, Product, OrdersState, RequestedData } from '@/utils/types';
import type { PayloadAction } from "@reduxjs/toolkit";
import { getOrders } from "@/fetching/mockFetching";

export const fetchingOrders = createAsyncThunk(
    'orders/fetchingOrders', 
    async () => {
        const response: RequestedData = await getOrders();
        return response;
    }
);

const initialState: OrdersState = {
    status: 'initial',
    orders: [],
    products: [],
    productTypes: ['Клавиатура', 'Гарнитура', 'Мышь', 'Монитор', 'Другое']
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
        removeOrder(state, action: PayloadAction<{orderId:string}>){
            state.orders = state.orders.filter((order: Order)=>order.id!==action.payload.orderId);
            state.products = state.products.filter((product: Product)=>product.order!==action.payload.orderId);
            state.status='updated';
        },
        removeProduct(state, action: PayloadAction<{productId: string}>){
            state.products = state.products.filter((product: Product) => product.id!==action.payload.productId);
            state.status='updated';
        },
        addOrder(state, action: PayloadAction<{order: Order}>){
            state.orders.push(action.payload.order);
            state.status='updated';
        },
        addProduct(state, action: PayloadAction<{product: Product}>){
            state.products.push(action.payload.product);
            state.status='updated';
        },
        addProductType(state, action: PayloadAction<{newProductType:string}>){
            state.productTypes.push(action.payload.newProductType);
        }
    },
    extraReducers: (builder)=>{
        builder
        .addCase(fetchingOrders.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchingOrders.fulfilled, (state, action: PayloadAction<RequestedData>) =>{
            state.status = 'loaded';
            state.orders = action.payload.orders;
            state.products = action.payload.products;
        })
        .addCase(fetchingOrders.rejected, (state)=>{
            state.status='rejected';
        })
    }

});

export const { setDataFromSessionStorage, removeOrder, removeProduct, addOrder, addProduct, addProductType } = ordersSlice.actions;
export default ordersSlice.reducer;
