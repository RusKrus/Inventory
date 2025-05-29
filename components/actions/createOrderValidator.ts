'use server'
import { checkNewOrderActionState } from "@/utils/types";
import initTranslations from "@/i18n/i18nInitTranslations";
import { headers } from 'next/headers';

export const createdOrderValidator = async (state: checkNewOrderActionState, formData: FormData): Promise<checkNewOrderActionState> => {
    const headersList = await headers();
    const locale = headersList.get('x-next-i18n-router-locale') || 'ru';
    const { t } = await initTranslations(locale, ['server_validation'])

    const name = formData.get('name')?.toString().trim()??'Имя не задано';
    const forbidenNames = ['Приход 1', 'Приход 2', 'Приход 3'];
    if(forbidenNames.includes(name)){
        return {success: false, errors: {nameError: t('fobidden_name')}, obtainedFormData: formData }
    }
    else{
        return {success: true, errors: {}, obtainedFormData: formData }
    }
}
