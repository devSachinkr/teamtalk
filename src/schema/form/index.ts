import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .min(1, { message: "Email is required" }),
});

export const workspaceFormSchemaStep1 = z.object({
  name: z.string().min(3, { message: "Name is required" }),
});
export const workspaceFormSchemaStep2 = z.object({
  imageUrl: z.string().url({ message: "Invalid image url" }).optional(),
});
