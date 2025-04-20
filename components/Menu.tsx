'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function Menu(): React.JSX.Element {
    const path = usePathname();



    return(
        <menu className='w-full flex flex-col items-center space-y-4 text-2xl font-semibold  '>
            <Link href='/' className={`menu-link ${path==='/'?'underline':null}`}>Приходы</Link>
            <Link href='/groups' className={`menu-link ${path==='/groups'?'underline':null} text-gray-500`}>Группы</Link>
            <Link href='/products' className={`menu-link ${path==='/products'?'underline':null} `}>Продукты</Link>
            <Link href='/users' className={`menu-link ${path==='/users'?'underline':null} text-gray-500`}>Пользователи</Link>
            <Link href='/settings' className={`menu-link ${path==='/settings'?'underline':null} text-gray-500`}>Настройки</Link>

        </menu>
    )
};