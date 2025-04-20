import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getUaToUsdRate } from "@/utils/fetching";
import type { CurrencyState } from "@/utils/types";
export const fetchingCurrency = createAsyncThunk(
    'currency/fetchingCurrency', 
    async () => {
        const response = await getUaToUsdRate();
        return response;
    }
);

const initialState: CurrencyState = {
    status: 'initial',
    usdToUa: 0
};

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder
        .addCase(fetchingCurrency.pending, (state) =>{
            state.status = 'loading';
        })
        .addCase(fetchingCurrency.fulfilled, (state, action: PayloadAction<number>) =>{
            state.status = 'loaded';
            state.usdToUa = action.payload;
        })
        .addCase(fetchingCurrency.rejected, (state)=>{
            state.status='rejected';
        })
    }

});


export default currencySlice.reducer;
