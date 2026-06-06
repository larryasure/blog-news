import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext.jsx";

export default function ProtectedRoutes({ children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500 font-medium animate-pulse text-sm">
          Loading your session please wait...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }
  return children;
}
