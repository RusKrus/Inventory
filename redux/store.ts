'use client'

import { configureStore } from '@reduxjs/toolkit';
import ordersSlice from './ordersSlice';
import currencySlice from './currencySlice';

const store = configureStore({
    reducer: {
        ordersData: ordersSlice,
        currencyRate: currencySlice
    }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;