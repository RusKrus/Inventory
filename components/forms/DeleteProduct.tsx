import { DeleteProductProps, Product, Order } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/redux/typedReduxHooks";
import { removeProduct } from "@/redux/ordersSlice";
import VerySmallProductItem from '@/components/VerySmallProductItem';
import { getProductById, getOrderById, getUsdToUaRate } from '@/redux/selectors';

export default function DeleteProduct({productId}: DeleteProductProps): React.JSX.Element {

    const dispatch = useAppDispatch();

    const currentProduct: Product | string = useAppSelector(state=>getProductById(state, productId));
    const relatedOrderId: string = (typeof currentProduct==='string')?'Продукт с таким id не найден!':currentProduct.order;
    const relatedOrder: Order | string = useAppSelector(state=>getOrderById(state, relatedOrderId));
    const usdToUa: number = useAppSelector(getUsdToUaRate);
    const handleDeleteProduct = (): void => {
        if(productId){
            dispatch(removeProduct({productId}));
        }
    };

    if(typeof currentProduct === 'string'){
        return (
            <>
                <h3 className='font-bold text-xl p-5 bg-red-600 rounded-t-md text-white mb-5'>{currentProduct}</h3>
                <button data-modal='close' className='text-gray-400 bg-white absolute -top-5 -right-5 size-8 rounded-full  shadow-[0_0_5px_2px] shadow-gray-400 hover:cursor-pointer hover:text-red-500 hover:font-bold'>X</button>
            </>
        );
    }

    return (
        <>
            <h3 className='font-bold text-xl p-5 bg-red-600 rounded-t-md text-white mb-5'>Вы точно хотите удалить этот продукт?</h3>
            <div className='px-4 font-semibold'>
                <h3 className='font-bold text-xl p- rounded-t-md mb-5 text-center'>Информация о продукте</h3>
                <h4 className='text-xl mb-3'>Имя продукта: <span className='font-normal text-red-500'>{currentProduct.title}</span></h4>
                <h4 className='text-xl mb-3'>Серийный номер: <span className='font-normal'>{currentProduct.serialNumber}</span></h4>
                <h4 className='text-xl mb-3'>Спецификация: <span className='font-normal italic'>{currentProduct.specification}</span></h4>
                <h4 className='text-xl mb-3'>Цена: <span className='font-normal'>{currentProduct.price[0].value}$<span className='mx-1'>/</span>{currentProduct.price[0].value*usdToUa}₴</span></h4>
                <h4 className='text-xl mb-3'>Состояние: <span className='font-normal'>{currentProduct.isNew?'Новый':'Б/У'}</span></h4>
                <h4 className='text-xl mb-3'>Имя прихода: <span className='font-normal'>{typeof relatedOrder === 'string'?relatedOrder:relatedOrder.title}</span></h4>
            </div>
            <div>
                <VerySmallProductItem product={currentProduct}/>
            </div>
            <div className='bg-lime-600/90 p-5 rounded-b-md text-right space-x-5 font-semibold'>
                <button data-modal='close' className='hover:cursor-pointer text-white hover:text-red-600 duration-100'>Отменить</button>
                <button data-modal='close' onClick={handleDeleteProduct} className='hover:cursor-pointer text-red-600 bg-white rounded-lg p-1 hover:scale-105 duration-100'>Удалить</button>
            </div>
        </>
    )
}