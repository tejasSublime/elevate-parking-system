import NextLink from "next/link";
import React from "react";
import { useSidebarContext } from "@/context/SidebarContext";
import Image from "next/image";
import clsx from "clsx";
export const SidebarItem = ({ icon, title, isActive, href = "" }) => {
  const { collapsed, setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive ? "" : "hover:bg-purple-500",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        <div className={isActive ? "bg-red-500 p-1   rounded-md" : ""}>
          <Image src={icon} alt={title}  />
        </div>
        <span className={isActive ? "font-semibold" : "font-normal"}>
          {title}
        </span>
      </div>
    </NextLink>
  );
};
