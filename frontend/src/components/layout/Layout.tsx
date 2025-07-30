import TitleBar from "../common/TitleBar";
import Footer from "../common/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <TitleBar />
      <Outlet />
      <Footer />
    </>
  );
}
