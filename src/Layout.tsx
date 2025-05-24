import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { TaskItem } from "./types";
import Header from "./components/Header";
import useLocalStorage from "./hooks/useLocalStorage";

const Layout = () => {
  const [storedTasks, setStoredTasks] = useLocalStorage<TaskItem[]>("tasks", []);
  const [tasks, setTasks] = useState<TaskItem[]>(storedTasks);
  const location = useLocation();

  const hideHeader = location.pathname === "/notfound";
  return (
    <>
      {!hideHeader && <Header />}
      <Outlet context={{ tasks, setTasks, setStoredTasks }} />
    </>
  );
};

export default Layout;
