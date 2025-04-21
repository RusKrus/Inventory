'use client';
import { useEffect, useState } from 'react';


export default function OnlineCounter(): React.JSX.Element {
    const [counter, setCounter] = useState<string>('0');

    useEffect(() => {
        let clientSocket: WebSocket | null = null;
        const domain = window.location.hostname;
        if(window.location.protocol === 'https:'){
            clientSocket = new WebSocket(`wss://${domain}:4000/`);
        }
        else{
            clientSocket = new WebSocket(`ws://${domain}:4000/`);
        };
        clientSocket.onopen = (): void => {
            console.log('Новой пользователь зашел в приложение!');
        };
        clientSocket.onerror = (event): void => {
            console.log(event);
            console.log('Произошла ошибка!');
        };
        clientSocket.onmessage = (messageEvent: MessageEvent<string>): void => {
            setCounter(messageEvent.data);
        };
        clientSocket.onclose = (): void => {
            console.log('Пользователь закрыл приложение.');
            clientSocket = null; 
        };
        

        return () => {
            if(clientSocket){
                clientSocket.onopen = clientSocket.onmessage = clientSocket.onerror = clientSocket.onclose = null;
                clientSocket.close(1000);
            };
        };
    }, []);

    return (
        <h2 >Пользователи онлайн: <span className='font-bold text-lime-500'>{counter}</span></h2>
    )
};