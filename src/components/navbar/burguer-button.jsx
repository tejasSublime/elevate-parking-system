import React from "react";
import { useSidebarContext } from "@/context/SidebarContext";
import { StyledBurgerButton } from "./navbar.styles";
import { FaBarsStaggered } from "react-icons/fa6";
export const BurguerButton = () => {
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <div
      className={StyledBurgerButton()}
      // open={collapsed}
      onClick={setCollapsed}
    >
      <FaBarsStaggered />
    </div>
  );
};
