import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Footer from "../Pages/Footer";
import Navbar from "../Pages/Navbar";

export default function Rootlayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isAdmin = location.pathname.startsWith("/admin")
  return (
    <div>
      {!isDashboard && !isAdmin && <Navbar />}

      <div>
        <Outlet />
        
        <ScrollRestoration />
      </div>


      {!isDashboard && !isAdmin && <Footer />}

    </div>
  );
}
