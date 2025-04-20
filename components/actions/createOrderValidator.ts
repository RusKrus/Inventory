'use server'
import { checkNewOrderActionState } from "@/utils/types";

export const createdOrderValidator = async (state: checkNewOrderActionState, formData: FormData): Promise<checkNewOrderActionState> => {
    const name = formData.get('name')?.toString()??'Имя не задано';
    const forbidenNames = ['Приход 1', 'Приход 2', 'Приход 3'];
    if(forbidenNames.includes(name)){
        return {success: false, errors: {nameError: 'Такое имя использовать запрещено!'}, obtainedFormData: formData }
    }
    else{
        return {success: true, errors: {}, obtainedFormData: formData }
    }
}