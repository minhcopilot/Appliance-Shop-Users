"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderMain from "@/components/header/HeaderMain";

const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    if (
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/forgot-password" ||
      pathname === "/reset-password" ||
      pathname === "/profile" ||
      pathname === "/profile/password" ||
      pathname === "/profile/order" ||
      pathname === "/profile/voucher"
    ) {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card">
      <div>
        <HeaderMain />
        {showNavbar && children}
      </div>
    </header>
  );
};

export default Header;
