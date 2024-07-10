"use server";

import { superbaseCreateClient } from "@/lib/supabase/create-server";

export const registerWithEmail = async (email: string) => {
  if (!email) {
    throw new Error("Email is required");
  }
  const supabase = await superbaseCreateClient();

  const res = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_URL,
    },
  });

  return JSON.stringify(res);
};
