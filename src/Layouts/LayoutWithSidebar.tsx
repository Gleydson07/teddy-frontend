import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useState } from "react";

export function LayoutWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col h-screen">
      <Header onClickMenu={() => setIsSidebarOpen((prevState) => !prevState)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
