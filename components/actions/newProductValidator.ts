'use server'
import { CheckNewProductValidatorParams, Product, CheckNewOrderAnswer, CheckNewOrderErrors } from  '@/utils/types'

export const newOrderValidator = async ({newProductSerialNumber, newProductOrderId, orderIds, products}: CheckNewProductValidatorParams): Promise<CheckNewOrderAnswer> => {
    const serialNumbers: string[] = products.map((product: Product)=>product.serialNumber);
    let status: 'ok'|'error' ='ok';
    const errors: CheckNewOrderErrors = {};
    if(serialNumbers.includes(newProductSerialNumber)) {
        errors.serialNumberError = 'Такой серийный номер уже существует в системе!';
        status='error';
    };

    if(!orderIds.includes(newProductOrderId)){
        errors.orderId = 'Такого прихода не существует! Попробуйте снова или обратитесь к администратору';
        console.log(orderIds, newProductOrderId)
        status='error';
    }
    return {status, errors};    
};
