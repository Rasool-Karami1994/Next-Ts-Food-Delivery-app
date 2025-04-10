import { ReactNode } from "react";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  return (
    <div dir="ltr" className="mainLayout">
      <div dir="rtl" className="mainLayout-inside">
        <Header />
        <div className="mainContent">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
