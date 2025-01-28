import { GlobalStateProvider } from "@/context/GlobalStateProvider";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <GlobalStateProvider>{children}</GlobalStateProvider>;
}

export default layout;
