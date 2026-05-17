import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0D1B2A" }}>
        <div className="text-white/60 text-sm tracking-widest uppercase">...</div>
      </div>
    );
  }
  if (!session) return <Navigate to="/acces-premium" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
