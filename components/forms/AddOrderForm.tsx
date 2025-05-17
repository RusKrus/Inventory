import ThreeDotAnimated from '@/components/ThreeDotAnimated';
import { createdOrderValidator } from '@/components/actions/createOrderValidator';
import { addOrder } from '@/redux/ordersSlice';
import { useActionState, useEffect } from 'react';
import { createNewOrder } from '@/utils/utilFunctions';
import { useAppDispatch } from '@/redux/typedReduxHooks';
import type { AddOrderFormProps } from '@/utils/types'; 

export default function AddProductForm({setCurrentContent}: AddOrderFormProps): React.JSX.Element {

    const [formState, orderValidatorObserved, pending] = useActionState(createdOrderValidator, {success: 'idle', errors: {}, obtainedFormData: {} });
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(formState.success===true){
            const formData = formState.obtainedFormData;
            if(formData instanceof FormData){
                const name = formData.get('name')?.toString()??'Имя не задано';
                const date = formData.get('date')?.toString().trim()??Date();
                const description = formData.get('description')?.toString()??'Описание отсутствует';
                const order = createNewOrder(name, date, description);
                dispatch(addOrder({order}));
                setCurrentContent(null);
            };
        }
    }, [formState]);


    return (
        <>
            <h3 className='font-bold text-xl p-5 rounded-t-md bg-lime-600/90 text-white'>Создание нового прихода</h3>
            <form action={orderValidatorObserved} className=' pt-5' >
                <div className='modal-several-fields-container'>
                    <div className='modal-field-container'>
                        <label htmlFor='name' >
                            Имя прихода (только буквы и цифры, с заглавной буквы)<span className='text-red-600'>*</span>
                            <span className='block w-full text-sm font-normal'>Имена &quot;Приход 1&quot;, &quot;Приход 2&quot;, &quot;Приход 3&quot; запрещены! </span>
                        </label>
                        <input required pattern='^[A-ZА-Я][a-zа-я1-9 ]*$' type="text" id='name' name='name' className='modal-input-field'/>
                        {formState.errors.nameError?<span className='block w-full text-red-600 text-sm font-normal'>{formState.errors.nameError}</span>: null}
                    </div>
                    
                    <div className=' modal-field-container'>
                        <label htmlFor='date' >
                            Дата прихода<span className='text-red-600'>*</span>
                        </label>
                        <input required type="date" id='date' name='date' className='modal-input-field'/>
                    </div>

                    <div className=' modal-field-container'>
                        <label htmlFor='description' >
                            Описание прихода (минимум 4 символа)<span className='text-red-600'>*</span>
                        </label>
                        <input required pattern='^.{4,}$' type="text" id='description' name='description' className='modal-input-field'/>
                    </div>
                </div>

                <div className='modal-buttons-container'>
                    <button type='button' className='hover:cursor-pointer text-white hover:text-red-500 duration-100' data-modal='close' >Отменить</button>
                    <button type="submit" className='hover:cursor-pointer hover:scale-105 hover:text-green-600 duration-100 bg-white rounded-lg p-1 disabled:text-gray-400' disabled={pending?true:false}>
                        {pending?`Приход создается`:'Создать приход'}{pending?<ThreeDotAnimated />:''}
                    </button>
                </div>
            </form>
        </>
    )
}