import { getUserData } from "@/actions/get-user-data";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const currentUser = async () => {
  const user = await getUserData();
  if (!user) {
    throw new UploadThingError({
      code: "BAD_REQUEST",
      message: "User not found",
    });
  }
  return {
    userId: user.data?.id,
  };
};
export const ourFileRouter = {
  workPlaceImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => currentUser())
    .onUploadComplete(() => {}),
    
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
