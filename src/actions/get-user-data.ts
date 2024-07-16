import { superbaseCreateClient } from "@/lib/supabase/create-server";
import { supabaseServerPages } from "@/lib/supabase/supabaseServerPages";
import { USER } from "@/types/app";
import { NextApiRequest, NextApiResponse } from "next";

export const getUserData = async (): Promise<null | {
  status: number;
  message: "success" | "error" | "Unauthorized"| string;
  data?: USER;
}> => {
  const supabase = await superbaseCreateClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return {
      status: 401,
      message: "Unauthorized",
    };
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);
  if (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
    };
  }

  return {
    status: 200,
    message: "success",
    data: data[0],
  };
};

export const getUserDataPages = async (req:NextApiRequest,res:NextApiResponse):Promise<USER | null> => {
  const supabase =  supabaseServerPages(req,res);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id);
  if (error) {
    console.log(error);
    return null;
  }
  return data? data[0] : null;
}