import io from "socket.io-client";
const socketURL = "http://localhost:5000";
export const socket = io.connect(socketURL);

export const initSocket = () => {};
