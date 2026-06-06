import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function RoleProtectedRoute({ isAllowed, children }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAllowed.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
