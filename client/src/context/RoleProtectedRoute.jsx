import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Authcontext } from "./Authcontext";

export default function RoleProtectedRoute({ isAllowed, children }) {
  const { user, loading } = useContext(Authcontext);

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
