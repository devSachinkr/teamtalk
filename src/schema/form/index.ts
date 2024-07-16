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

export const createChannelSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
});
export const channelUploadFileSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, { message: "File is required " })
    .refine((files) => {
      const file = files?.[0];
      return (
        file?.type === "image/png" ||
        file?.type === "image/jpeg" ||
        file?.type === "application/pdf"
      );;
    },{message:"File must be image or pdf"}),
});
