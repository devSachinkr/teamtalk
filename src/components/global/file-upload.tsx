import { FileIcon, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { UploadDropzone } from "@/lib/uploadthing";

type Props = {
  value?: string;
  onChange: (value?: string) => void;
  endpoints: "workPlaceImage";
};

const FileUpload = ({ endpoints, onChange, value }: Props) => {
  const fileType = value?.split(".")?.pop();
  if (value) {
    return (
      <div className="flex flex-col justify-center items-center">
        {fileType !== "pdf" ? (
          <div className="relative w-40 h-40 ">
            <Image
              src={value}
              alt="Uploaded Image"
              className="object-contain"
              fill
            />
          </div>
        ) : (
          <div
            className="relative flex items-center
             p-2 mt-2 rounded-md bg-background/10"
          >
            <FileIcon />
            <a
              href={value}
              target="_blank"
              rel="noopener_noreferrer"
              className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline"
            >
              view PDF
            </a>
          </div>
        )}
        <Button variant={"ghost"} type="button" onClick={() => onChange("")}>
          Remove Logo <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }
  return (
    <div>
      <UploadDropzone
        endpoint={endpoints}
        onClientUploadComplete={(res) => onChange(res[0].url)}
        onUploadError={(err) => console.log(err)}
      />
    </div>
  );
};

export default FileUpload;
