"use client";
import { Spinner } from "@/components/global/spinner";
import { USER } from "@/types/app";
import { useEffect, useState } from "react";

type UseVideoChat = {
  user: USER;
  chatId: string;
};

export const useVideoChat = ({ user, chatId }: UseVideoChat) => {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const fetchToken = async (email: string, room: string) => {
    try {
      const resp = await fetch(
        `/api/liveKit-token?room=${room}&username=${email}`
      );
      const data = await resp.json();
      setToken(data.token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const email = user.email;
    const room = chatId;
    fetchToken(email, room);
  }, [user.email, chatId]);

 

  return {
    token,
    loading,
  };
};
