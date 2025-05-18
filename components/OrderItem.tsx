'use client'
import type { OrderDataContainer, Product } from '@/utils/types';
import { getProductWordWithCorrectEnding, getDateFromString} from '@/utils/utilFunctions';
import { useAppSelector } from '@/redux/typedReduxHooks';




export default function OrderItem({ order,  currencyState, isOpenedData, openedOrderData}: OrderDataContainer): React.JSX.Element {

    const { isDetailsOpened, setIsDetailsOpened } = isOpenedData;
    const { openedOrderId, setOpenedOrderId } = openedOrderData;
    const currencyRateUa: number = currencyState.usdToUa;
    const fetchingCurrencyStatus: string = currencyState.status;
    

    const onOpenDetailsClick = (): void => {
        setOpenedOrderId(order.id);
        if(openedOrderId===order.id&&isDetailsOpened===true){
            setIsDetailsOpened(false);
        }
        else{
            setIsDetailsOpened(true);
        }
    };

    const relatedProducts: Product[] = useAppSelector(state=>state.ordersData.products.filter((product: Product)=>product.order===order.id));
    const totalPrice = relatedProducts.reduce((acc, product)=> acc + product.price[0].value, 0);
    const totalPriceUA: string = (totalPrice*currencyRateUa).toFixed(2)
    const numberOfProducts: number = relatedProducts.length;
    const productsWord: string = getProductWordWithCorrectEnding(numberOfProducts);
    const dateObject: {full: string, short: string} = getDateFromString(order.date)

    return(
                <div className={`flex gap-x-4 w-full min-w-fit ${isDetailsOpened?'justify-start space-x-10 pr-0 ':'justify-between pr-10'} items-center py-2 px-10 ${(isDetailsOpened&&openedOrderId===order.id)?'border-3 border-gray-300 inset-shadow-sm inset-shadow-gray-300 ':'border-2 border-gray-300'} relative rounded-md text-gray-500 text-lg bg-white`}>
                    <p className={` underline underline-offset-4 decoration-gray-300 decoration-2 font-semibold origin-left w-40 ${isDetailsOpened?'hidden':'block'} duration-400`}>{order.title}</p>
                    <div className='flex space-x-3 w-30 min-w-fit'>
                        <button onClick = {onOpenDetailsClick} >
                            <svg fill="currentColor" viewBox="0 0 24 24" className={`size-10 border-1 border-black/10 rounded-full p-1 hover:cursor-pointer hover:fill-lime-500 hover:border-lime-500 duration-200 ${(isDetailsOpened&&openedOrderId===order.id)?'fill-lime-500 border-lime-500':''}`}>
                                <use href='#details'/>
                            </svg>
                        </button>
                        <p>
                            <span className='font-semibold text-xl'>{numberOfProducts}</span> <br /> <span className='text-sm text-gray-400'>{productsWord}</span>
                        </p>
                    </div>
                    <p className='text-lg font-semibold text-center w-50 min-w-fit'>
                        <span className='text-xs '>{dateObject.short}</span>
                        <br />
                        <span className='font-semibold '>{dateObject.full}</span>
                    </p>
                    <p className={`${isDetailsOpened?'hidden':'block'} w-25`}> 
                        <span className='text-xs '>{totalPrice} $</span>  
                        <br />   
                        <span className={`font-semibold ${fetchingCurrencyStatus==='loaded'?'opacity-100':'opacity-0'} duration-400`}>{totalPriceUA} <span className='text-xs'>UAH</span></span>
                    </p>
                    <button data-modal='open-delete-order' data-orderid={order.id} className={`${isDetailsOpened?'hidden':'block'} min-w-fit`}>
                        <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 hover:fill-red-500 duration-200 hover:cursor-pointer ">
                            <use href='#delete'/>
                        </svg>
                    </button>
                    <div className={`${(isDetailsOpened&&openedOrderId===order.id)?'flex':'hidden'} text-white bg-gray-300 p-2 absolute right-0 top-0 bottom-0 items-center font-bold text-xl`}>{'>'}</div>
                </div>         
    )
}
