'use server'

import { superbaseCreateClient } from "@/lib/supabase/create-server";

export const updateUserWorkplace = async(userId:string,workplaceId:string)=>{
  const supabase = await superbaseCreateClient();
  const {data,error} = await supabase.rpc('add_workplace_to_user',{user_id:userId,new_workplace:workplaceId});
  if(error){
    console.log(error);
    return
  }
  return {data,error}

}