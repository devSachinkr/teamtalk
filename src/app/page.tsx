import { Loader } from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return <div>
    <Loader loading={true}>
         hlo
    </Loader>
  </div>;
};

export default page;
