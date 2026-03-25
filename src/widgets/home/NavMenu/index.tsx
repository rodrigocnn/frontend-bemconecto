import React from "react";
import Link from "next/link";

interface Menu {
  name: string;
  path: string;
}

export const NavbarMenu = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Sobre",
    path: "/shop",
  },

  {
    name: "Localização",
    path: "/shop",
  },
  {
    name: "Contato",
    path: "/contact",
  },
];

const NavMenu = () => {
  return (
    <>
      {NavbarMenu.map((menu: Menu) => {
        return (
          <Link
            key={menu.name}
            href={menu.path}
            className="mx-8 hover:text-red-500 font-semibold"
          >
            {menu.name}
          </Link>
        );
      })}
    </>
  );
};

export default NavMenu;
