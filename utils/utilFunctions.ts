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

export const timeUntillMidnight = (): number => {
    const now = Date.now();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    return midnight.getTime() - now;
};

export const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const getCorrectProductImage = (type: string): string => {
    let imageUrl: string;
    
    switch(type){
        case 'headphones':
            imageUrl = '/ProductsPhoto/headphones.png';
            break;
        case 'mouse':
            imageUrl = '/ProductsPhoto/mouse.png';
            break;
        case 'keyboard':
            imageUrl = '/ProductsPhoto/keyboard.png';
            break;
        case 'monitor':
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
