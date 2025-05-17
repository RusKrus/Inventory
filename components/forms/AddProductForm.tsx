import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import type { FormInitialState, Order, Product, AddProductFormProps } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/redux/typedReduxHooks';
import { newOrderValidator } from '../actions/newProductValidator';
import { createNewProduct, orderIdFinder } from '@/utils/utilFunctions';
import { addProduct } from '@/redux/ordersSlice';
import ThreeDotAnimated from '../ThreeDotAnimated';

export default function AddProductForm({orderId, setCurrentContent}: AddProductFormProps): React.JSX.Element {
    const dispatch = useAppDispatch();
    const orders: Order[] = useAppSelector(state => state.ordersData.orders);
    const orderNames: string[] = orders.map((order: Order) => order.title);
    const orderIds: string[] = orders.map((order: Order) => order.id);
    const productTypes: string[] = useAppSelector(state => state.ordersData.productTypes);
    const products: Product[] = useAppSelector(state=> state.ordersData.products); 

    const initialValues: FormInitialState = {
        serialNumber: '',
        isNew: 'new',
        title: '',
        type: '',
        specification: '',
        guarantee: {
            start: '', 
            end: ''
        },
        price: [{
            value: 0, 
            symbol: 'USD'
        }],
        order: orderId?orderId:'',
    };

    return (
        <>
            <h3 className='font-bold text-xl p-5 rounded-t-md bg-lime-600/90 text-white'>Создание нового прихода</h3>
            <Formik 
                initialValues = {initialValues}
                validationSchema={Yup.object({
                    serialNumber: Yup.string().required('Укажите серийный номер продукта'),
                    isNew: Yup.boolean().transform(value=>value==='new').required('Укажите состояние продукта').typeError('Неверный тип состояния продукта'),
                    title: Yup.string().required('Укажите название продукта'), 
                    type: Yup.string().oneOf(productTypes).required('Выберите тип продукта'),
                    specification: Yup.string().min(4, 'Описание должно быть не менее 4х символов').max(100, 'Описание должно быть не длинее чем 100 символов').required("Укажите описание продукта"),
                    guarantee: Yup.object({
                        start: Yup.date().required('Укажите дату начала гарантии'),  
                        end: Yup.date().required('Укажите дату окончания гарантии').min(Yup.ref('start'), 'Дата окончания гарантии не может быть раньше даты начала')
                    }),
                    price: Yup.array().of(Yup.object({
                        value: Yup.number().positive('Укажите положительное число').required('Укажите цену продукта в долларах'),
                        symbol: Yup.string().equals(['USD']).default('USD')
                    })),
                    order: Yup.string().oneOf(orderIds, 'ID прихода не соответвутсвует существующим. Переоткройте окно или обратитесь к администратору').required('Укажите, к какому приходу относится продукт, или создайте новый приход')
                })}
                onSubmit = {async (values, helpers) => {
                    const newProduct: Product = createNewProduct(values);
                    try {
                        helpers.setSubmitting(true);
                        const answer = await newOrderValidator({newProductSerialNumber: newProduct.serialNumber, newProductOrderId: newProduct.order, orderIds, products});
                        if(answer.status === 'ok'){
                            dispatch(addProduct({product: newProduct}))
                            helpers.resetForm();
                            setCurrentContent(null);
                        }
                        else{
                            if(Object.keys(answer.errors).length>0){
                                const { errors } = answer;
                                if(errors.serialNumberError){
                                    const serialNumberError: string = errors.serialNumberError;
                                    helpers.setFieldError('serialNumber', serialNumberError);
                                }
                                if(errors.orderId){
                                    const orderIdError: string = errors.orderId;
                                    helpers.setFieldError('order', orderIdError);
                                }
                            }
                            else {
                                alert('Произошла непредвиденная ошибка! Обратитесь к администратору');
                            }
                        }
                    }
                    catch(error){
                        alert('Ошибка при отправке запроса. Попробуйте снова');
                        console.error(error);
                    }
                    finally{
                        helpers.setSubmitting(false);
                    }
                }
            }>  
            {({isSubmitting})=>{
                return (
                    <Form className='pt-5'>
                    <div className='modal-several-fields-container '>
                        <div className='modal-field-container'>
                            <label htmlFor='serialNumber'>Серийный номер</label>
                            <Field as='input' className='modal-input-field ' name='serialNumber' id='serianNumber'/>
                            <ErrorMessage className='text-red-400' component='p' name='serialNumber'/>
                        </div>
                        <div className='flex flex-wrap space-x-5 '>
                            <p className='font-semibold w-full'>Состояние продукта</p>
                            <label className='font-normal w-fit '>
                                <Field as='input' type='radio' name='isNew' value='new' className='mr-1'/>
                                Новый
                            </label>
                            <label className='font-normal w-fit'>
                                <Field as='input' type='radio' name='isNew' value='old' className='mr-1'/>
                                Б/У
                            </label>
                        </div>
                        <div className='modal-field-container'>
                            <label htmlFor='serialNumber'>Название продукта</label>
                            <Field as='input' className='modal-input-field ' name='title' id='title'/>
                            <ErrorMessage className='text-red-400' component='p' name='title'/>
                        </div>
                        <div className='modal-field-container'>
                            <label htmlFor="type">Тип продукта</label>
                            <Field as='select' name='type' id='type' className='select-field border-1 border-black mb-0'>
                                <option value="" className='hidden'>Выбрать тип...</option>
                                {productTypes.map((type: string, index: number) => <option key={index} value={type}>{type}</option>)}
                            </Field>
                            <ErrorMessage className='text-red-400' component='p' name='type'/>
                        </div>
                        <div className='modal-field-container'>
                            <label htmlFor="specification">Описание продукта</label>
                            <Field as='textarea' name='specification' id='specification' className=' modal-textarea-field'/>
                            <ErrorMessage className='text-red-400' component='p' name='specification'/>
                        </div>
                        <div className='modal-field-container '>
                            <p className='font-semibold'>Гарантия продукта</p>
                            <div className='space-y-2 flex justify-between '>
                                <label className='font-normal '>
                                    Начало: 
                                    <Field as='input' type='date' name='guarantee.start' id='guarantee.start' className='modal-input-field ml-2'/>
                                </label>
                                <label className='font-normal text-right'>
                                    Конец: 
                                    <Field as='input' type='date' name='guarantee.end' id='guarantee.end' className='modal-input-field ml-2'/>
                                </label>
                            </div>
                            <ErrorMessage className='text-red-400' component='p' name='guarantee.start'/>
                            <ErrorMessage className='text-red-400' component='p' name='guarantee.end'/>
                        </div>
                        <div className='modal-field-container'>
                            <p className='font-semibold'>Цена продукта</p>
                            <div className='flex border-1 border-black w-fit rounded-lg p-1 focus:border-2 mb-0'>
                                <label className='font-normal'>
                                    <Field as='input' type='number' name='price[0].value' className='border-0 outline-0 font-semibold w-30 '/>
                                </label>
                                <label className='font-normal'>
                                    <Field as='select' name='price[0].symbol' id='specification' className='border-0 outline-0 font-semibold' >
                                        <option value="USD" >USD</option>
                                    </Field>
                                </label>
                            </div>
                            <ErrorMessage className='text-red-400' component='p' name='price[0].value'/>
                        </div>
                        <div>
                            <label htmlFor="order">Название прихода</label>
                            <Field as='select' name='order' className='select-field border-1 border-black mb-0 disabled:bg-gray-200' disabled={orderId?true:false} >
                                <option value="" className='hidden'>Выбрать приход...</option>
                                {orderNames.map((orderName: string, index: number) => <option key={index} value={orderIdFinder(orderName, orders)}>{orderName}</option>)}
                            </Field>
                            <ErrorMessage className='text-red-400' component='p' name='order'/>
                        </div>
                    </div>
                    <div className='modal-buttons-container'>
                        <button type='button' className='hover:cursor-pointer text-white hover:text-red-500 duration-100 ' data-modal='close' >Отменить</button>
                        <button type="submit" className='hover:cursor-pointer hover:scale-105 hover:text-green-600 duration-100 bg-white rounded-lg p-1 disabled:text-gray-400' disabled={isSubmitting}>
                           {isSubmitting?`Приход создается`:'Создать приход'}{isSubmitting?<ThreeDotAnimated />:''}
                        </button>
                    </div>
                </Form>
                )
            }}
                 
            </Formik>
        </>
    )
} 

