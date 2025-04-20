//fetching types
export type Product = {
    id: string|number,
    serialNumber: string|number,
    isNew: boolean,
    title: string,
    type: string,
    specification: string,
    guarantee: {
        start: string,
        end: string
    },
    price: [
        {value: number, symbol: 'USD'|'UAH'},
    ],
    order: string|number,
    date: string
};

export type Order = {
    id: string|number,
    title: string,
    date: string,
    description: string,
    products: Product[]
};


//slice types
export type OrdersState = {
    status: 'initial' | 'loading' | 'loaded' | 'rejected' | 'updated' | 'restored',
    orders: Order[], 
    products: Product[]
};

export type CurrencyState = {
    usdToUa: number, 
    status: 'initial' | 'loading' | 'loaded' | 'rejected'
};

//components types
export type OrderDataContainer = {
    dispatch: function,
    order: Order, 
    currencyState: CurrencyState,
    isOpenedData:{isDetailsOpened: boolean, setIsDetailsOpened: function },
    openedOrderData:{openedOrderId: number | null, setOpenedOrderId: function},
};

export type ProductDataContainer = {
    orders: Order[],
    product: Product, 
    currencyState: CurrencyState
};

export type SmallProductDataContainer = {
    product: Product,
}

export type CreateOrderFormTypes = {
    dispatch: function, 
    orderNamesArray: string[], 
    handleCloseDialogClick: function
}

export type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
}

// actions types
export type checkNewOrderActionState = { 
    success: 'idle'| boolean, 
    errors: {nameError?: string} 
    obtainedFormData: FormData | object,
    
};  

