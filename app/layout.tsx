import "./globals.css";
import Clock from '@/components/Clock';
import Image from 'next/image';
import logo from '@/public/logo.png';
import Link from 'next/link';
import ded from '@/public/ded.jpg';
import Menu from '@/components/Menu';
import NextProvider from '@/redux/NextProvider'; 
import ModalContainer from "@/components/ModalContainer";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <body className=' h-full'>
        <svg xmlns="http://www.w3.org/2000/svg" className='hidden'>
          <symbol id="clock"    strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </symbol>
          <symbol id='settings' >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
            <path strokeLinecap="round" strokeLinejoin="round" fill='white' d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          </symbol>
          <symbol id='details' >
            <path fillRule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
          </symbol>
          <symbol id='delete'>
            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
          </symbol>
          <symbol id='plus'>
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
          </symbol>
        </svg>
        <header className='h-2/15 bg-white shadow-[0_0_10px_5px] shadow-gray-400 z-10 relative'>
          <div className='h-full flex items-center justify-between px-8'>
            <div className='flex items-center'>
              <Image
                src={logo}
                alt='logo'
                className='w-15 h-15'
                priority
              />
              <h1 className='text-lg font-bold text-lime-600 uppercase'>Inventory</h1>
            </div>
            <input type="find" className='rounded-lg bg-gray-200 inset-shadow-sm inset-shadow-gray-400 w-1/4 p-1 placeholder:font-semibold border-none' placeholder='Search...'/>
            <div className='flex flex-wrap flex-col'>
              <Clock/>

            </div>
          </div>
        </header>
        <main className='h-9/10 grid grid-cols-[2fr_13fr] bg-gray-100' id='modal-root'>
          <nav className='h-full bg-white shadow-[0_5px_10px] shadow-gray-400 pt-10 space-y-20 min-w-fit px-5 relative z-10'>
            <div>
              <figure className='w-30 h-30 mx-auto relative'> 
                  <Image 
                    src={ded}
                    alt='Очень довольный мужчина'
                    fill
                    className='rounded-full'
                  />
                  <Link href='/settings'>
                    <svg viewBox="0 0 24 24" strokeWidth={1.5}  className="fill-gray-600 size-10 absolute bg-white rounded-full ring-gray-300/50 ring-2 p-2 bottom-0 right-0 cursor-pointer stroke-gray-600 hover:animate-spin  ">
                      <use href='#settings'></use>
                    </svg>
                  </Link>
              </figure>
            </div> 
            <Menu/>
          </nav>
          
          <NextProvider>
            <section className='p-20 overflow-scroll '>
              <ModalContainer/>
              {children}
            </section>
          </NextProvider>
        </main>
      </body>
    </html>
  );
}
