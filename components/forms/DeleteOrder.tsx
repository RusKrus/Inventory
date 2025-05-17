import VerySmallProductItem from '@/components/VerySmallProductItem';
import { Product, Order } from '@/utils/types';
import { removeOrder } from '@/redux/ordersSlice';
import { useAppDispatch, useAppSelector } from '@/redux/typedReduxHooks';
import type { DeleteOrderProps } from '@/utils/types';


export default function DeleteOrder({orderId}: DeleteOrderProps): React.JSX.Element {

    const dispatch = useAppDispatch();
    const currentOrder: Order | string = useAppSelector(state=>state.ordersData.orders.find((order: Order)=>order.id === orderId))??'Приход по такому id не найден!';
    const relatedProducts: Product[] = useAppSelector(state=>state.ordersData.products.filter((product: Product)=>product.order===orderId));
    const handleDeleteOrder = (): void => {
        if(orderId){
            dispatch(removeOrder({orderId}));
        }
    };

    if(typeof currentOrder === 'string'){
        return (
            <>
                <h3 className='font-bold text-xl p-5 bg-red-600 rounded-t-md text-white mb-5'>{currentOrder}</h3>
                <button data-modal='close' className='text-gray-400 bg-white absolute -top-5 -right-5 size-8 rounded-full  shadow-[0_0_5px_2px] shadow-gray-400 hover:cursor-pointer hover:text-red-500 hover:font-bold'>X</button>
            </>
        );
    };

    return (
        <>
            <h3 className='font-bold text-xl p-5 bg-red-600 rounded-t-md text-white mb-5'>Вы точно хотите удалить этот приход?</h3>
            <div className='px-4 font-semibold'>
                <h4 className='text-xl mb-3 '>Имя прихода: <span className=' text-red-500'>{currentOrder.title}</span></h4>
                <h4 className='text-xl mb-5 pb-3 border-dotted border-b-2  '>Описание прихода: <span className=' italic font-normal'>{currentOrder.description}</span></h4>
                <h4 className='text-xl mb-3 text-center'>Продукты:</h4>

            </div>
            
            <div>
                {relatedProducts.length > 0?
                relatedProducts.map((productData: Product, index: number)=><VerySmallProductItem key={index} product={productData}/>):
                <p className='text-xl font-semibold text-center mb-5 border-y-1 border-gray-200 py-2'>У этого прихода нет продуктов</p>
            }
            </div> 
            <div className='bg-lime-600/90 p-5 rounded-b-md text-right space-x-5 font-semibold'>
                <button data-modal='close'  className='hover:cursor-pointer text-white hover:text-red-600 duration-100'>Отменить</button>
                <button data-modal='close' onClick={handleDeleteOrder} className='hover:cursor-pointer text-red-600 bg-white rounded-lg p-1 hover:scale-105 duration-100'>Удалить</button>
            </div>
        </>
    );
};