import React from "react";
import HeaderMain from "@/components/header/HeaderMain";
const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card">
      <div>
        <HeaderMain />
        {children}
      </div>
    </header>
  );
};

export default Header;
