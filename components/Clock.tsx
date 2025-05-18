'use client';
import { useState, useEffect } from 'react';
import OnlineCounter from '@/components/Counter';
import { getTime, getDayOfTheWeek, getDate } from '@/utils/utilFunctions';

export default function Clock(): React.JSX.Element {
    const [time, setTime] = useState<string>(getTime());
    const [dayOfTheWeek, setDayOfTheWeek] = useState<string>(getDayOfTheWeek());
    const [date, setDate] = useState<string>(getDate());
    useEffect(()=>{
        const timer = setInterval(() => {
            setTime(getTime());
            setDayOfTheWeek(getDayOfTheWeek());
            setDate(getDate());
        }, 1000)

        return () => clearInterval(timer);

    }, [time, dayOfTheWeek])

    return (
        <div className='space-y-2'>
            <h3 className='w-full text-left text-xl font-bold '>{dayOfTheWeek}</h3>
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