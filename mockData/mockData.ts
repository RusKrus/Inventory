import { Order } from "@/utils/types";
import { v4 as uuidv4 } from 'uuid';

const mockData: Order[] = [
    {
        id: '1',
        title: 'Приход 1',
        date: '2017-06-29 12:09:33',
        description: 'Первая партия',
        products: 
        [
            {
                id: uuidv4(),
                serialNumber: '1111',
                isNew: true,
                title: 'Монитор 1',
                type: 'Монитор',
                specification: 'Описания монитора 1',
                guarantee: {
                    start: '2018-03-29 ',
                    end: '2018-04-29 '
                },
                price: [
                    {value: 100, symbol: 'USD'},
                ],
                order: '1',
                date: '2017-06-29 '
            },
            {
                id: uuidv4(),
                serialNumber: '1112',
                isNew: false,
                title: 'Монитор 2',
                type: 'Монитор',
                specification: 'Описания монитора 2',
                guarantee: {
                    start: '2018-03-29 ',
                    end: '2018-06-29 '
                },
                price: [
                    {value: 150, symbol: 'USD'},
                ],
                order: '1',
                date: '2017-06-29 '
            },
        ]
    },
    {
        id: '2',
        title: 'Приход 2',
        date: '2017-07-29 17:00:47',
        description: 'Вторая партия',
        products: [
            {
                id: uuidv4(),
                serialNumber: '1113',
                isNew: false,
                title: 'Клавиатура 1',
                type: 'Клавиатура',
                specification: 'Описания клавиатуры 1',
                guarantee: {
                    start: '2015-02-29 ',
                    end: '2018-06-29 '
                },
                price: [
                    {value: 10, symbol: 'USD'},
                ],
                order: '2',
                date: '2017-06-29 '
            },
            {
                id: uuidv4(),
                serialNumber: '1114',
                isNew: false,
                title: 'Клавиатура 2',
                type: 'Монитор',
                specification: 'Описания клавиатуры 2',
                guarantee: {
                    start: '2012-03-29 ',
                    end: '2015-06-29 '
                },
                price: [
                    {value: 100, symbol: 'USD'},
                ],
                order: '3',
                date: '2017-06-29 '
            },
        ]
    },
    {
        id: '3',
        title: 'Приход 3',
        date: '2017-06-29 15:34:11',
        description: 'Остаток второй партии',
        products: [
            {
                id: uuidv4(),
                serialNumber: '1115',
                isNew: true,
                title: 'Мышь 1',
                type: 'Мышь',
                specification: 'Описания мыши 1',
                guarantee: {
                    start: '2019-06-29 ',
                    end: '2021-06-29 '
                },
                price: [
                    {value: 10, symbol: 'USD'},
                ],
                order: '3',
                date: '2017-06-29 '
            },
            {
                id: uuidv4(),
                serialNumber: '1117',
                isNew: true,

                title: 'Мышь 2',
                type: 'Мышь',
                specification: 'Описания мыши 2',
                guarantee: {
                    start: '2011-02-29 ',
                    end: '2018-06-29 '
                },
                price: [
                    {value: 25, symbol: 'USD'},
                ],
                order: '3',
                date: '2017-06-29 '
            },
            {
                id: uuidv4(),
                serialNumber: '1118',
                isNew: true,
                title: 'Гарнитура 1',
                type: 'Гарнитура',
                specification: 'Описания наушников 1',
                guarantee: {
                    start: '2013-02-29 ',
                    end: '2014-06-29 '
                },
                price: [
                    {value: 50, symbol: 'USD'},
                ],
                order: '3',
                date: '2017-06-29 '
            },
            {
                id: uuidv4(),
                serialNumber: '1116',
                isNew: true,
                title: 'Наушники 2',
                type: 'Гарнитура',
                specification: 'Описания наушников 2',
                guarantee: {
                    start: '2016-04-29 ',
                    end: '2018-06-29 '
                },
                price: [
                    {value: 50, symbol: 'USD'},
                ],
                order: '3',
                date: '2017-06-29 '
            },
        ]
    },
];

export default mockData;