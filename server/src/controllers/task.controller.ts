import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/auth.middleware";
import {
  createTaskService,
  deleteTaskService,
  getAllTasksService,
  updateTaskService,
} from "../services/task.service";

export const createTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const { title, description, status, priority } = req.body;
    if (!title) {
      return res.status(400).json({ error: "title is required" });
    }
    const task = await createTaskService({
      userId,
      title,
      description,
      status,
      priority,
    });
    return res.status(201).json({ message: "Task created successfully", task });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
};

export const getAll = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const tasks = await getAllTasksService(userId);
    return res
      .status(200)
      .json({ message: "Task retrieved successfully", tasks });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const { id } = req.params;
    if (Array.isArray(id)) {
      return res.status(422).json({ error: "Invalid task id" });
    }
    const { title, description, status, priority } = req.body;

    const updatedTask = await updateTaskService({
      id: Number(id),
      userId,
      title,
      description,
      priority,
      status,
    });
    return res
      .status(200)
      .json({ message: "Task updated successfully", updatedTask });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not logged in" });
    }
    const { id } = req.params;
    if (Array.isArray(id)) {
      return res.status(422).json({ error: "Invalid task id" });
    }
    const success = await deleteTaskService(Number(id), userId);
    if (!success) {
      return res.status(404).json({ error: "Task not found or unauthorized" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      error: err instanceof Error ? err.message : "Internal server error",
    });
  }
};
