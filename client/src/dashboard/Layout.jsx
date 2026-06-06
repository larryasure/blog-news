import { Outlet, ScrollRestoration } from "react-router-dom";
import DashNavbar from "../components/DashNavbar";
import Footer from "../Pages/Footer";

export default function Layout() {
  return (
    <>
      <div>
        <DashNavbar />

        <main className="min-h-screen  ">
          <Outlet />
          <ScrollRestoration />
          
        </main>
        <Footer />
      </div>
    </>
  );
}
