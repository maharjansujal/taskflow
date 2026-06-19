import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  createTask,
  deleteTask,
  getAll,
  updateTask,
} from "../controllers/task.controller";

const router = Router();

router.use(authenticateToken);

router.post("/", createTask);
router.get("/", getAll);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
