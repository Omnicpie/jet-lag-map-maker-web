import type { JSXElementConstructor, ReactElement, ReactNode } from "react";
import type { Tab } from "../../types/Tab";

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
      {currentTab === "new" ? <div className="sidebar">sidebar</div> : null}
      {children}
    </div>
  );
};

export default Layout;
