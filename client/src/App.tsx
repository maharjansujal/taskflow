import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { HomePage } from "./pages/HomePage";
import { useAuth } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/ProtectedRoute";

function AuthRouteGuard({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/workspace" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <AuthRouteGuard>
                <LoginPage />
              </AuthRouteGuard>
            }
          />
          <Route
            path="/register"
            element={
              <AuthRouteGuard>
                <RegisterPage />
              </AuthRouteGuard>
            }
          />

          <Route element={<ProtectedRoute />}>
            <Route path="/workspace" element={<HomePage />} />
          </Route>

          <Route path="/" element={<Navigate to="/workspace" replace />} />
          <Route path="*" element={<Navigate to="/workspace" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
