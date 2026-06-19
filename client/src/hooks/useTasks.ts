import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: "pending" | "in_progress" | "completed";
  priority: "low" | "medium" | "high";
  created_at: string;
  updated_at: string;
}

export function useTasks() {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await axiosInstance.get("/tasks");
      return response.data;
    },
  });

  const addTaskQuery = useMutation({
    mutationFn: async (newTask: Partial<Task>) => {
      const response = await axiosInstance.post("/tasks", newTask);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate and refetch tasks cache immediately
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const updateTaskQuery = useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Task>;
    }) => {
      const response = await axiosInstance.patch(`/tasks/${id}`, updates);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  const deleteTaskQuery = useMutation({
    mutationFn: async (id: number) => {
      const response = await axiosInstance.delete(`/tasks/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });

  return {
    tasks: tasksQuery.data,
    isFetchingTasks: tasksQuery.isFetching,
    isLoadingTasks: tasksQuery.isLoading,
    tasksError: tasksQuery.error,

    addTask: addTaskQuery,
    isAddingTask: addTaskQuery.isPending,
    addTaskError: addTaskQuery.error,

    updateTask: updateTaskQuery,
    isUpdatingTask: updateTaskQuery.isPending,
    updateTaskError: updateTaskQuery.error,

    deleteTask: deleteTaskQuery,
    isDeletingTask: deleteTaskQuery.isPending,
    deleteTaskError: deleteTaskQuery.error,
  };
}
