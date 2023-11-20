"use client";
import CheckUserForm from "@/page/auth/check";

const page = ({ searchParams }: any) => {
  return <CheckUserForm query={searchParams} />;
};

export default page;
