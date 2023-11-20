"use client";
import { PageProvider } from "@/template";
import React, { ReactNode } from "react";

interface LayoutType {
  children: ReactNode;
}

const Layout = ({ children }: LayoutType) => {
  return <PageProvider>{children}</PageProvider>;
};

export default Layout;
