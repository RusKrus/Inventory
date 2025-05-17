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
    price: 
        {
            value: number, 
            symbol: 'USD'|'UAH'
        }[],
    order: string,
    date: string
};

export type Order = {
    id: string,
    title: string,
    date: string,
    description: string,
};

export type RequestedData = {
    orders: Order[], 
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

//components types
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

export type DeleteProductProps = {
    productId?: string;
}

export type AddOrderFormProps = {
    setCurrentContent: function
}

export type AddProductFormProps = {
    orderId?:string,
    setCurrentContent: function
}

export type FormInitialState = {
    serialNumber: string,
    isNew: string,
    title: string,
    type: string,
    specification: string,
    guarantee: {
        start: string,
        end: string
    },
    price: {
        value: number, 
        symbol: 'USD'|'UAH'
    }[],
    order: string,
};



// actions types
export type checkNewOrderActionState = { 
    success: 'idle'| boolean, 
    errors: {nameError?: string} 
    obtainedFormData: FormData | object,
    
};  

export type CheckNewProductValidatorParams = {
    newProductSerialNumber: string, 
    newProductOrderId: string,
    orderIds: string[],
    products: Product[]
};

export type CheckNewOrderErrors = {
    serialNumberError?: string,
    orderId?: string
};

export type CheckNewOrderAnswer = {
    status: 'error' | 'ok', 
    errors: CheckNewOrderErrors
};
//other types
export type CreateNewProductParams = FormInitialState; 