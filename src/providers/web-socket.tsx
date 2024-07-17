"use client";

import { createContext, FC, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
type WebSocketContextType = {
  socket: Socket | null;
  isConnected: boolean;
};
type WebSocketProviderProps = {
  children: React.ReactNode;
};
const initialValue: WebSocketContextType = {
  socket: null,
  isConnected: false,
};
export const WebSocketContext =
  createContext<WebSocketContextType>(initialValue);

export const WebSocketProvider: FC<WebSocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  useEffect(() => {
    const newSocket = io(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: "/api/web-socket/io",
      addTrailingSlash: false,
    });

    newSocket.on("connect", () => {
      setIsConnected(true);
    });
    newSocket.on("disconnect", () => {
      setIsConnected(false);
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  const value: WebSocketContextType = {
    socket,
    isConnected,
  };
  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
