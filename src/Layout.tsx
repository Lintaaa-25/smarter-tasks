import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";

const Layout = () => {
  const location = useLocation();
  const isNotFoundPage = location.pathname === "/notfound";

  return (
    <>
      {/* Only show Header if NOT on /notfound */}
      {!isNotFoundPage && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
