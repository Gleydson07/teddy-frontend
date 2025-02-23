import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useState } from "react";

export function LayoutWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex relative flex-col h-screen">
      <Header onClickMenu={() => setIsSidebarOpen((prevState) => !prevState)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="w-full h-[calc(100vh-100px)] overflow-x-hidden bg-neutral-100">
        <Outlet />
      </main>
    </div>
  );
}
