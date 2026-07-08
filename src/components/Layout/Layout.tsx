import "./Layout.css";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router";
import { useEffect, useMemo } from "react";

const Layout = () => {
  const { pathname } = useLocation();

  const path = useMemo(() => {
    return pathname.slice(1) || "new";
  }, [pathname]);

  useEffect(() => {
    document.title = `${path.toLocaleUpperCase()} | JLTG: Map Maker`;
  }, [path]);

  return (
    <div className="layout-container">
      {path === "new" ? <Sidebar /> : null}
      <div className={`layout-page ${path}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
