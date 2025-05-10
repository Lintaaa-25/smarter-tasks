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
      {!hideHeader && <Header />}
      <Outlet context={{ tasks, setTasks }} />
    </>
  );
};

export default Layout;
