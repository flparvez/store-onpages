"use client";

import { useState, useEffect } from "react";
import { Nav } from "./ui/nav";
import { ShoppingCart, LayoutDashboard, UsersRound, Settings, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useWindowWidth } from "@react-hook/window-size";

export default function SideNavbar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);
  const onlyWidth = useWindowWidth();

  useEffect(() => {
    setMobileWidth(onlyWidth < 768);
  }, [onlyWidth]);

  function toggleSidebar() {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className=" relative  border-r px-2 pb-10 pt-12">
      {!mobileWidth && (
        <div className="absolute right-[-20px] top-7">
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            className="rounded-full p-2"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          { title: "Dashboard", href: "/admin", icon: LayoutDashboard, variant: "default" },
          { title: "Category", href: "/admin/category", icon: UsersRound, variant: "ghost" },
          { title: "Add Product", href: "/admin/product/add", icon: UsersRound, variant: "ghost" },
          { title: "Users", href: "/admin/product/user", icon: UsersRound, variant: "ghost" },
          { title: "Orders", href: "/admin/order", icon: ShoppingCart, variant: "ghost" },

        ]}
      />
    </div>
  );
}
