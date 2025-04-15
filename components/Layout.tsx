import { ReactNode } from "react";
import Header from "./Header";
import { ToastContainer } from "react-toastify";
import { useStore } from "../store";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const dark = useStore((state) => state.dark);

  return (
    <div dir="ltr" className="mainLayout">
      <div dir="rtl" className="mainLayout-inside">
        <Header />
        <ToastContainer
          position="bottom-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={dark ? "dark" : "light"}
        />
        <div className="mainContent">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
