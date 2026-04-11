import type { JSXElementConstructor, ReactElement, ReactNode } from "react";

type LayoutProps = {
  children:
    | ReactNode
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>
    | ReactNode[]
    | ReactElement<unknown, string | JSXElementConstructor<unknown>>[];
};

const Layout = ({ children }: LayoutProps) => {
  return <div className="layout-container">{children}</div>;
};

export default Layout;
