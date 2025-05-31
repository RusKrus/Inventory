'use client'
import dynamic from 'next/dynamic';

//Пришлось сделать компонент клиентским для использвоания ssr:false. Внутренний компонент Products.tsx  использует данные с redux, который загружает их с sessionStorage, из-за чего возникает
//проблема с гидратацией
const Products = dynamic(()=>import('@/components/Products'), { ssr: false});
export default function ProductsPage(): React.JSX.Element {
    return (
        <Products/>
    )
};