import { SocketIoRes } from "@/types/app";
import { NextApiRequest } from "next"; 
import { Server as NetServer } from "http";
import { Server as IOServer } from "socket.io";
const initializeServer = (httpServer: NetServer): IOServer => {
  const path = "/api/web-socket/io";
  return new IOServer(httpServer, { path, addTrailingSlash: false });
};
const handler = async (req: NextApiRequest, res: SocketIoRes) => {
  if (!res.socket?.server?.io) { 
    res.socket.server.io = initializeServer(
      res.socket.server.io as unknown as NetServer
    );
  }
  res.end();
};

export default handler;
