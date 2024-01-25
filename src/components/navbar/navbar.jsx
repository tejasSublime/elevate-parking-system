import { Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./burguer-button";
// import { UserDropdown } from "./user-dropdown";

export const NavbarWrapper = ({ children }) => {
  return (
    <div className="relative  flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full my-10"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
      </Navbar>

      {children}
    </div>
  );
};
