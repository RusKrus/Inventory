import type { Order, Product, CreateNewProductParams } from "./types";
import { v4 as uuidv4 } from 'uuid';

export const getTime = (): string => {
    const dateObject: Date = new Date();
    let hours: number|string = dateObject.getHours();
    let minutes: number|string = dateObject.getMinutes();
    if(hours < 10) hours = `0${hours}`;
    if(minutes < 10) minutes = `0${minutes}`;
    return `${hours}:${minutes}`;
};

export const getDayOfTheWeek = (): string => {
    const dayOfTheWeekNumber: number = new Date().getDay();
    const daysOfTheWeek:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfTheWeek[dayOfTheWeekNumber];
};

export const getDate = (): string => {
    const dateObject: Date = new Date();
    const dayOfMonth: number = dateObject.getDate();
    const monthNumber: number = dateObject.getMonth();
    const year: number = dateObject.getFullYear();
    const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month: string = monthNames[monthNumber];
    return `${dayOfMonth} ${month}, ${year}`;
};

export const getProductWordWithCorrectEnding = (number: number): string => {
    const lastDigit: number = number%10;
    if(lastDigit===1){
        return 'Продукт';
    }
    else if(lastDigit>1&&lastDigit<5){
        return 'Продукта';
    }
    else{
        return 'Продуктов';
    };
};

export const getCorrectProductImage = (type: string): string => {
    let imageUrl: string;
    
    switch(type){
        case 'Гарнитура':
            imageUrl = '/ProductsPhoto/headphones.png';
            break;
        case 'Мышь':
            imageUrl = '/ProductsPhoto/mouse.png';
            break;
        case 'Клавиатура':
            imageUrl = '/ProductsPhoto/keyboard.png';
            break;
        case 'Монитор':
            imageUrl = '/ProductsPhoto/monitor.png';
            break;
        default:
            imageUrl = '/ProductsPhoto/unknownDevice.png';
            break;
            
    }

    return imageUrl;
};

export const getDateFromString = (dateString: string): {full: string, short: string} => {
    const dateObject = new Date(dateString);
    const monthNames: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const year: number = dateObject.getFullYear();
    let monthNumber: number|string = dateObject.getMonth();
    const month: string = monthNames[monthNumber];
    let date: number|string = dateObject.getDate();
    
    if(monthNumber < 10) monthNumber = `0${monthNumber}`; 
    if(date < 10) date = `0${date}`;

    return {
        full: `${date} /  ${month} / ${year} `,
        short:`${monthNumber} / ${year}`
    };
};

export const createNewOrder = (name: string, date: string, description: string): Order  => { 
    return {
        id: uuidv4(),
        title: name, 
        date, 
        description,
    }
};

export const createNewProduct = ({serialNumber, isNew, title, type, specification, guarantee, price, order}: CreateNewProductParams): Product  => {
    
    return {
        id: uuidv4(),
        serialNumber,
        isNew: isNew==='new',
        title, 
        type,
        specification, 
        guarantee, 
        price, 
        order,
        date: new Date().toDateString()
    }
};   

export const orderIdFinder = (orderName: string, orders: Order[]): string => {
   const relatedOrder: Order | 'not found' = orders.find((order: Order)=>order.title===orderName)??'not found'; 
   if(relatedOrder === 'not found'){
    return relatedOrder;
   }
   else{
    return relatedOrder.id; 
   }
};
