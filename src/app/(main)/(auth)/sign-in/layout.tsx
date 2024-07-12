"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const [isMounted, setIsMounted] = React.useState(false);
  return <div>{children}</div>;
};

export default Layout;
