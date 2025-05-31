'use server'
import { CheckNewProductValidatorParams, Product, CheckNewOrderAnswer, CheckNewOrderErrors } from  '@/utils/types'
import initTranslations from "@/i18n/i18nInitTranslations";
import { headers } from 'next/headers';

export const newOrderValidator = async ({newProductSerialNumber, newProductOrderId, orderIds, products}: CheckNewProductValidatorParams): Promise<CheckNewOrderAnswer> => {

    const headersList = await headers();
    const locale = headersList.get('x-next-i18n-router-locale') || 'ru';
    const { t } = await initTranslations(locale, ['server_validation'])

    const serialNumbers: string[] = products.map((product: Product)=>product.serialNumber);
    let status: 'ok'|'error' ='ok';
    const errors: CheckNewOrderErrors = {};
    if(serialNumbers.includes(newProductSerialNumber)) {
        errors.serialNumberError = t("forbidden_sn");
        status='error';
    };

    if(!orderIds.includes(newProductOrderId)){
        errors.orderId = t("incorrect_order");
        console.log(orderIds, newProductOrderId)
        status='error';
    }
    return {status, errors};    
};
