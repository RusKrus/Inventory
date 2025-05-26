//Пришлось сделать компонент клиентским для использвоания ssr:false. Внутренний компонент Order.tsx  использует данные с redux, который загружает их с sessionStorage, из-за чего возникает
//проблема с гидратацией
'use client'

import dynamic from 'next/dynamic';
const Orders = dynamic(() => import('@/components/Orders'), { ssr: false}); 



export default function OrdersPage(): React.JSX.Element {

    return (
        <Orders/>
    )
};