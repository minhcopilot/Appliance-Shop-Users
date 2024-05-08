"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import HeaderMain from "@/components/header/HeaderMain";
import Navbar from "@/components/header/Navbar";

export default function HeaderTop() {
  const pathname = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Ví dụ: đường dẫn đến trang đăng nhập là '/login'
    if (pathname === "/login" || pathname === "/register") {
      setShowNavbar(false);
    } else {
      setShowNavbar(true);
    }
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div>
        <HeaderMain />
        {showNavbar && <Navbar />}
      </div>
    </header>
  );
}
