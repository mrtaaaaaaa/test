"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavLink = ({
  href = "",
  exact = true,
  children,
  className = "",
  ...props
}: any) => {
  const pathname = usePathname();
  const active = `${className} whitespace-nowrap md:text-base boder-b text-sm pb-4 block font-medium border-b-2 border-b-blue pb-4`;
  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += active;
  } else {
    props.className += "whitespace-nowrap md:text-base boder-b text-sm pb-4 block font-medium"
  }

  return (
    <Link href={href} {...props} >
      {children}
    </Link>
  );
};
