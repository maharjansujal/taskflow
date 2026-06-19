import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface AuthResponse {
  token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { login, logout, user, isAuthenticated, isLoading } = context;

  // Login Mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials: Record<string, string>) => {
      const response = await axiosInstance.post<AuthResponse>(
        "/auth/login",
        credentials,
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Feed the API result straight into our context global state
      login(data.token, data.user);
    },
  });

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (userData: Record<string, string>) => {
      const response = await axiosInstance.post("/auth/register", userData);
      return response.data;
    },
  });

  console.log(registerMutation);

  return {
    user,
    isAuthenticated,
    isLoading,
    logout,

    loginUser: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    loginError: loginMutation.error,

    registerUser: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    registerError: registerMutation.error,
  };
}
