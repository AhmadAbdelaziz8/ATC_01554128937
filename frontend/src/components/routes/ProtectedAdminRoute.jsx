import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = () => {
  const { user, isAuthenticated, loading } = useAuth();

  // Show loading indicator while auth state is being determined
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // Redirect to home if not an admin
  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  // Render child routes for admin
  return <Outlet />;
};

export default ProtectedAdminRoute;
