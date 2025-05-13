'use client' 
import { useEffect, useState } from "react";
import { createPortal } from "react-dom"
import AddProductForm from "./forms/AddProductForm";
import AddOrderForm from './forms/AddOrderForm';
import DeleteOrder from "./forms/DeleteOrder";

//Этот элемент содержит всю логику работу модальных оконо для удаления и добавления продуктов и приходов. 
//На все кнопки установлен один универсальный обработчик, что ловит всплывшее нажатие по кнопке в элементе document 
//На каждой кнопке, связанной с работой с приходом или продуктом есть атрибут data-modal и data-delete-id, благодаря которым универсальный обработчик понимает, что и с чем надо сделать
//Эти кнопки находятся в элементах Orders, OrderItem, SmallProductItem и др. подобных компонентах
export default function ModalContainer(): React.JSX.Element | null {
    
    const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
    const [currentContent, setCurrentContent] = useState<React.JSX.Element | null>(null);

    const handleModalButtonClick = (event: MouseEvent): void => {

        let targetEvent: HTMLElement | null = null;
        if(event.target instanceof Element){
            targetEvent = event.target.closest('[data-modal]');
            if(targetEvent instanceof HTMLButtonElement){

                switch (targetEvent.dataset.modal){
                    case 'open-add-order':
                        setCurrentContent(<AddOrderForm setCurrentContent={setCurrentContent}/>);
                        break;
                    case 'open-add-product':
                        setCurrentContent(<AddProductForm/>);
                        break;
                    case 'open-delete-order':
                        setCurrentContent(<DeleteOrder orderId={targetEvent.dataset.orderid}/>);
                        break;
                    case 'open-delete-product':
                        setCurrentContent(null);
                        break;
                    case 'close':
                        setCurrentContent(null);
                        break;
                    default: 
                        break;
                };
            };
        };
    };

    const handleEscapePress = (event: KeyboardEvent): void => {
        if(event instanceof KeyboardEvent&&event.code==='Escape'){
            setCurrentContent(null);
        };
    };

    useEffect(() => {
        document.addEventListener('keydown', handleEscapePress);
        document.addEventListener('click', handleModalButtonClick);

        setModalRoot(document.getElementById('modal-root'));

        return () => {
            document.removeEventListener('keydown', handleEscapePress);
            document.removeEventListener('click', handleModalButtonClick);
        };
    }, []);

    if(!modalRoot) {
        return null;
    };

    return createPortal(
        (
            <div className={`modal-backdrop ${currentContent?'duration-200':'invisible '} ` } >
                <div className={`modal-container ${currentContent?'opacity-100 duration-200':'opacity-0'}`}>
                    {currentContent}
                    <button data-modal='close' className='text-gray-400 bg-white absolute -top-5 -right-5 size-8 rounded-full  shadow-[0_0_5px_2px] shadow-gray-400 hover:cursor-pointer hover:text-red-500 hover:font-bold'>X</button>
                </div>
            </div>
        ), modalRoot
    );
};