import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Product, Order } from '@/utils/types';
import { useAppDispatch, useAppSelector } from '@/redux/typedReduxHooks';


export default function AddProductForm(): React.JSX.Element {

    const dispatch = useAppDispatch();
    const orders: string[] = useAppSelector(state => state.ordersData.orders.map((order: Order) => order.id));
    const uniqOrders: Set<string> = new Set(orders);
    const productTypes: string[] = useAppSelector(state => state.ordersData.productTypes);


    const initialValues: Omit<Product, 'id' | 'date' > = {
        //id: '',
        serialNumber: '',
        isNew: false,
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
        order: '',
        //date
    };

    return (
        <>
            <h3 className='font-bold text-xl p-5 rounded-t-md bg-lime-600/90 text-white'>Создание нового прихода</h3>
            <Formik 
                initialValues = {initialValues}
                validationSchema={Yup.object({
                    serialNumber: Yup.string().required('Укажите серийный номер продукта'),
                    isNew: Yup.string().transform(value=>value==='new').required('Укажите состояние продукта'),
                    title: Yup.string().required('Укажите название продукта'), 
                    type: Yup.string().oneOf(['Монитор', "Клавиатура", "Мышь", "Гарнитура"]).required('Выберите тип продукта'),
                    specification: Yup.string().max(100, 'Описание должно быть не длинее чем 100 символов').required("Укажите описание продукта"),
                    guarantee: Yup.object({
                        start: Yup.string().required('Укажите дату начала гарантии'),  
                        end: Yup.string().required('Укажите дату окончания гарантии')
                    }),
                    price: Yup.object({
                        value: Yup.number().integer().required('Укажите цену продукта в долларах'),
                        symbol: Yup.string().equals(['USD']).required('Укажите валюту продукта')
                    }),
                     //Yup.string().oneOf(orders).required
                })}
                onSubmit = {(values, helpers) => {
                    console.log(values);
                    console.log(helpers);
                }
            }>
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
                                {/*Индекс тут используется, так как количество типов продуктов динамически не меняется*/}
                                {Array.from(productTypes).map((type: string, index: number) => <option key={index} value={type}>{type}</option>)}
                            </Field>
                            <ErrorMessage className='text-red-400' component='p' name='type'/>
                        </div>
                        <div className='modal-field-container'>
                            <label htmlFor="specification">Описание продукта</label>
                            <Field as='textarea' name='specification' id='specification' className=' modal-textarea-fiel'/>
                            <ErrorMessage className='text-red-400' component='p' name='specification'/>
                        </div>
                        <div className='modal-field-container '>
                            <p className='font-semibold'>Гарантия продукта</p>
                            <div className='space-y-2 flex justify-between '>
                                <label className='font-normal '>
                                    Начало: 
                                    <Field as='input' type='date' name='guarantee.start' id='guarantee.start' className='modal-input-field ml-2'/>
                                    <ErrorMessage className='text-red-400' component='p' name='guarantee.start'/>
                                </label>
                                <label className='font-normal text-right'>
                                    Конец: 
                                    <Field as='input' type='date' name='guarantee.end' id='guarantee.end' className='modal-input-field ml-2'/>
                                    <ErrorMessage className='text-red-400' component='p' name='guarantee.end'/>
                                </label>
                            </div>
                            
                            
                        </div>

                    </div>
                    <div className='modal-buttons-container'>
                        <button type='button' className='hover:cursor-pointer text-white hover:text-red-500 duration-100 ' data-modal='close' >Отменить</button>
                        <button type="submit" className='hover:cursor-pointer hover:scale-105 hover:text-green-600 duration-100 bg-white rounded-lg p-1 disabled:text-gray-400'>
                           Добавить продукт
                        </button>
                    </div>
                </Form>
            </Formik>
        </>
    )
} 

