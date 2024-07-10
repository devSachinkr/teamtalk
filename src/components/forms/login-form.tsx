"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useAuth } from "@/hooks/auth/login";
import { Input } from "../ui/input";
import Typography from "../global/typography";
import { Loader } from "../global/loader";
type Props = {};
const LoginForm = () => {
  const { form, loading, handleLoginWithEmail, socialAuth } = useAuth();
  return (
    <div className=" flex flex-col justify-center text-center">
      <Button
        disabled={loading}
        className="mt-5 py-6 flex gap-3 w-[300px]"
        onClick={() => socialAuth("google")}
      >
        <FcGoogle size={24} />
        Sign in with Google
      </Button>
      <Button
        disabled={loading}
        className="mt-5 py-6 flex gap-3 w-[300px]"
        onClick={() => socialAuth("facebook")}
      >
        <FaMeta size={24} className="text-cyan-400" />
        Sign in with Meta / Facebook
      </Button>
      <Button
        disabled={loading}
        className="mt-5 py-6 flex gap-3 w-[300px]"
        onClick={() => socialAuth("github")}
      >
        <FaGithub size={24} />
        Sign in with Github
      </Button>

      <span className="flex items-center w-full mt-4">
        <hr className="w-full" />
        <span className="px-3">or</span>
        <hr className="w-full" />
      </span>

      <Form {...form}>
        <form onSubmit={handleLoginWithEmail} className="w-full">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className=" flex text-start pl-2 text-muted-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Loader loading={loading}>
            <Button className="w-full mt-2 txet-semibold bg-primary-dark text-white hover:bg-primary-dark/75">
              Sign in with Email
            </Button>
          </Loader>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
