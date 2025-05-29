'use client';
import { useState, useEffect } from 'react';
import OnlineCounter from '@/components/Counter';
import { getTime, timeUntillMidnight, capitalizeFirstLetter } from '@/utils/utilFunctions';
import { useTranslation } from 'react-i18next';





export default function Clock(): React.JSX.Element {

    const { i18n } = useTranslation();
    
    const [time, setTime] = useState<string>(getTime());
    const [dayOfTheWeek, setDayOfTheWeek] = useState<string>(new Date().toLocaleString(i18n.language, { weekday: 'long'}));
    const [date, setDate] = useState<string>(new Date().toLocaleString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' }));

    


    useEffect(()=>{
        const clockTimer = setInterval(() => setTime(getTime()), 1000);
        const dayTimer = setInterval(() => setDayOfTheWeek(new Date().toLocaleString(i18n.language, { weekday: 'long'})), timeUntillMidnight());
        const dateTimer = setInterval(() => setDate(new Date().toLocaleString(i18n.language, { day: 'numeric', month: 'long', year: 'numeric' })), timeUntillMidnight());
        
        return (): void => {
            clearInterval(clockTimer);
            clearInterval(dayTimer);
            clearInterval(dateTimer);
        };
    }, [i18n.language]);

    return (
        
        <div className='space-y-2 flex flex-wrap flex-col'>
            <h3 className='w-full text-left text-xl font-bold '>{capitalizeFirstLetter(dayOfTheWeek)}</h3>
            <div className='flex w-fit flex-wrap space-x-5 font-semibold'>
                <p>{date}</p>
                <p className='flex space-x-1 items-center'>
                    <svg fill="none" viewBox="0 0 24 24" className="size-5 stroke-lime-500">
                        <use href='#clock'></use>
                    </svg>
                    <span>{time}</span>
                </p>
            </div>
            <OnlineCounter/>
        </div>
    )
}