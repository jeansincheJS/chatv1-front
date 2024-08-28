import { Manager, Socket } from "socket.io-client";
export let socket: Socket;
export const connectToServer = (
    handleMessages: (payload: { id: string, message: string }) => void,
    setMyId: React.Dispatch<React.SetStateAction<string>>,
) => {
    const manager = new Manager("https://chatv1-back-production.up.railway.app/socket.io/socket.io.js");
    socket?.removeAllListeners();
    socket = manager.socket('/');
    socket.on('connect', () => {
        console.log('connected');
        setMyId(socket.id!);
    })
    socket.on('message-from-server', (payload: { id: string, message: string }) => {
        console.log('message from server');
        handleMessages(payload);
    })
}
export const sendMessage = (message: string) => {
    console.log('sending message');
    socket.emit('message-from-client', { message });
}
