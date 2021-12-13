import { useState } from "react";
import socketIO from "socket.io-client";

const ENDPOINT = "ws://127.0.0.1:3333";

const useSocket = () => {
    const [socket] = useState(socketIO.io(ENDPOINT));

    return { socket };
};

export default useSocket;
