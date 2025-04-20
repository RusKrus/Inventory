import Link from "next/link"

export default function NotFoundPage(): React.JSX.Element {
    return (
        <div className='flex justify-center mt-20 mb-10 flex-wrap'>
            <div className='size-48 relative rounded-full border-lime-600 border-2 flex items-center justify-center bg-white '>
                <span className='text-5xl text-lime-600'>404</span>
                <div className='border-4 border-lime-500 opacity-25 animate-ping absolute rounded-full size-48'></div>
            </div>
            <h2 className='w-full text-center text-3xl my-10'>Страница не найдена!</h2>
            <Link href='/' className='bg-lime-500 text-white font-bold text-xl text-center p-2 rounded-md'>На главную </Link>
        </div>

    )
}