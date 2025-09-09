import React from "react";
import { Outlet } from "react-router-dom";

const NoSidebarLayout = () => {
  return (
    <div className="min-h-screen bg-[#121212]">
      <Outlet />
    </div>
  );
};

export default NoSidebarLayout;
