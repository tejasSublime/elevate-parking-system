import React from "react";
import { Sidebar } from "./sidebar.style";
import { SidebarItem } from "./sidebar-item";
import { useSidebarContext } from "@/context/SidebarContext";
import { usePathname } from "next/navigation";
import { sideBarRoute } from "@/routes/sidebarRoute";

export const SidebarWrapper = () => {
  const pathName = usePathname();

  const { collapsed, setCollapsed } = useSidebarContext();
  
  return (
    <aside className="h-screen z-[202] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            {sideBarRoute.map((item, index) => (
              <SidebarItem
                key={index}
                title={item.title}
                icon={item.icon}
                isActive={
                  pathName === (item.href === "/" ? "/" : `/${item.href}`)
                }
                href={item.href}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
