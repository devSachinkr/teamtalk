import Theme from "@/components/global/theme";
import { QueryProvider } from "@/providers/query-provider";
import { WebSocketProvider } from "@/providers/web-socket";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div>
      <WebSocketProvider>
        <Theme>
          <QueryProvider>
          {children}
          </QueryProvider>
          </Theme>
      </WebSocketProvider>
    </div>
  );
};

export default layout;
