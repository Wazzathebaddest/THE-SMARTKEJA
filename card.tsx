import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../lib/auth-context";

export function ProtectedRoute({
  role,
  children,
}: {
  role: "student" | "landlord" | "admin";
  children: JSX.Element;
}) {
  const { session, role: currentRole, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex w-full items-center justify-center py-20">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#0600ba] border-t-transparent mx-auto" />
          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated → redirect to login, preserving intended destination
  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // Authenticated but wrong role → redirect to their correct dashboard, not login
  if (currentRole !== role) {
    const correctDashboard =
      currentRole === "landlord" ? "/landlord" :
      currentRole === "admin"    ? "/admin" :
      "/student-dashboard";
    return <Navigate to={correctDashboard} replace />;
  }

  return children;
}
