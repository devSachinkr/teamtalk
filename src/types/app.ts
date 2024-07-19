import { NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";

export type USER = {
  avatar_url: string;
  channels: string[] | null;
  created_at: string | null;
  email: string;
  id: string;
  is_away: boolean;
  name: string | null;
  phone: string | null;
  type: string | null;
  workplaces: string[] | null;
};

export type Workplaces = {
  channels: string[] | null;
  created_at: string;
  id: string;
  image: string | null;
  invite_code: string | null;
  members: USER[] | null;
  name: string;
  regulators: string[] | null;
  slug: string;
  super_admin: string;
};

export type Channel =
  | {
      id: string;
      members: string[] | null;
      name: string;
      regulators: string[] | null;
      user_id: string;
      workplace_id: string;
    }
  | undefined;

export type Message = {
  channel_id: string;
  content: string | null;
  created_at: string;
  file_url: string | null;
  id: string;
  id_deleted: boolean;
  updated_at: string;
  userId: string;
  workplace_id: string;
};

export type SocketIoRes = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export type MessageWithUser = Message & {
  user: USER;
};
