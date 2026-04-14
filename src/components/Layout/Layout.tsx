import type { JSXElementConstructor, ReactElement, ReactNode } from "react";
import type { Tab } from "../../types/Tab";
import "./Layout.css";
import Sidebar from "../Sidebar/Sidebar";

type LayoutProps = {
  children:
    | ReactNode
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode[]
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>[];
  currentTab: Tab;
};

const Layout = ({ children, currentTab }: LayoutProps) => {
  return (
    <div className="layout-container">
      {currentTab === "new" ? <Sidebar /> : null}
      <div className={`layout-page ${currentTab}`}>{children}</div>
    </div>
  );
};

export default Layout;
