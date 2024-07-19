import React from "react";
import { format } from "date-fns";
type Props = {
  type: "Channels" | "DirectMessage";

  name: string;
  creationDate: string;
};

const IntroBanner = ({ creationDate, name, type }: Props) => {
  const channelMessage = creationDate
    ? `You created this channel on ${format(
        new Date(creationDate),
        "dd MMMM yyyy"
      )}`
    : "You haven't created this channel yet";
  const directMessage = `You created this direct message on ${format(
    new Date(creationDate),
    "dd MMMM yyyy"
  )}`;
  return (
    <div className="px-2 mb-5">
      {type === "Channels" && <p>{channelMessage}</p>}
      {type === "DirectMessage" && (
        <p className="text-zinc-600 dark:text-zinc-400 text-sm">
          {directMessage}
        </p>
      )}
    </div>
  );
};

export default IntroBanner;
