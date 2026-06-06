import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "./Authcontext";

export default function AdminProtectedRoute({ children }) {
  const { user, loading } = useContext(Authcontext);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center ">
        <div className="flex items-center gap-2 ">
          <p>Loading Admin Panel</p>
          <span
            className="w-2 h-2 bg-sky-500 rounded-full animate-bounce "
            style={{ animationDelay: "0ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-sky-500 rounded-full animate-bounce "
            style={{ animationDelay: "150ms" }}
          ></span>
          <span
            className="w-2 h-2 bg-sky-500 rounded-full animate-bounce "
            style={{ animationDelay: "300ms" }}
          ></span>
        </div>
      </div>
    );
  }

  if (!user) {
   return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
   return  <Navigate to="/dashboard" replace />;
  }

  return children;
}
