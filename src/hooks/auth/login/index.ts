"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInFormSchema } from "@/schema/form";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Provider } from "@supabase/supabase-js";
import { supabaseClient } from "@/lib/supabase/create-client";
import { registerWithEmail } from "@/actions/register-with-email";
import ToastNotify from "@/components/global/ToastNotify";
import { useRouter } from "next/navigation";
export const useAuth = () => {
  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const { handleSubmit } = form;
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleLoginWithEmail = handleSubmit(
    async (value: z.infer<typeof signInFormSchema>) => {
      setLoading(true);
      const res = await registerWithEmail(value.email);
      const { data, error } = JSON.parse(res);

      if (error) {
        console.log(error);
        setLoading(false);
      }
      ToastNotify({
        title: "Success",
        msg: `email sent to ${value.email}`,
      });
      setLoading(false);
    }
  );

  const socialAuth = async (provider: Provider) => {
    setLoading(true);
    await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/api/callback`,
      },
    });
    setLoading(false);
  };

  const getUser = async () => {
    const {
      data: { session },
    } = await supabaseClient.auth.getSession();

    if (session) {
      router.push("/");
    }
  };
  useEffect(() => {
    getUser();
  }, [router]);
  return { form, loading, handleLoginWithEmail, socialAuth };
};
