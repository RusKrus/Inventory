//fetching types
export type Product = {
    id: string,
    serialNumber: string,
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
    order: string,
    date: string
};

export type Order = {
    id: string,
    title: string,
    date: string,
    description: string,
    products: Product[]
};

export type Currency = {
    [key: string]: string|number,
    rates: {
        [key: string]: number,
        UAH: number
    }
}


//slice types
export type OrdersState = {
    status: 'initial' | 'loading' | 'loaded' | 'rejected' | 'updated' | 'restored',
    orders: Order[], 
    products: Product[], 
    productTypes: string[]
};

export type CurrencyState = {
    usdToUa: number, 
    status: 'initial' | 'loading' | 'loaded' | 'rejected'
};

//components props types
export type OrderDataContainer = {
    order: Order, 
    currencyState: CurrencyState,
    isOpenedData:{isDetailsOpened: boolean, setIsDetailsOpened: function },
    openedOrderData:{openedOrderId: string | null, setOpenedOrderId: function},
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

export type DeleteOrderProps = {
    orderId?:string
}

export type AddProductFormProps = {
    setCurrentContent: function
}

// actions types
export type checkNewOrderActionState = { 
    success: 'idle'| boolean, 
    errors: {nameError?: string} 
    obtainedFormData: FormData | object,
    
};  

//other types
