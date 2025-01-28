import { InsuranceDetailsContext } from "@/context/InsuranceDetailsContext";
import React from "react";

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <InsuranceDetailsContext>{children}</InsuranceDetailsContext>;
}

export default layout;
