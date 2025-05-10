import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TaskItem } from "./types";
import Header from "./components/Header";

const Layout = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const location = useLocation();

  const hideHeader = location.pathname === "/notfound";
  return (
    <>
      <nav className="bg-slate-900 text-white p-4 flex justify-between">
        <div>
          <a href="/" className="mr-4">
            Home
          </a>
          <a href="/tasks">Tasks</a>
        </div>
        <span className="font-bold">Smarter Tasks</span>
      </nav>
      {!hideHeader && <Header />}
      <Outlet context={{ tasks, setTasks }} />
    </>
  );
};

export default Layout;
