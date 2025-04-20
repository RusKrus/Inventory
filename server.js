import { WebSocketServer } from 'ws';

const port = 4000;
const ws = new WebSocketServer({ port});

let count = 0;
ws.on('connection', (socket)=>{
    count++;
    broadcast(count);

    socket.on('error', (error)=>{
        console.log('Ошибка на ws сервере:', error);
    });

    socket.on('close', () => {
        console.log("Клиент закрыл приложение")
        count--;
        broadcast(count);
    });

});

ws.on('close', () => {
    console.log('Server is closed');
});

ws.on('error', (error)=>{
    console.log('Error on ws server:', error);
});

const broadcast = (message) => {
    const jsonMessage = JSON.stringify(message);

    ws.clients.forEach((client) => {
        if(client.readyState === 1 ){
            client.send(jsonMessage);
        }
    });
};

ws.on('listening', () => {
    console.log(`WebSocket server is listening on ws://localhost:${port}`);
});









