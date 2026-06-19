import React, { useState, useEffect } from "react";
import { X, Loader2 } from "lucide-react";
import { type Task, useTasks } from "../hooks/useTasks";
import { TextField } from "./TextField";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  editTask: Task | null;
  initialStatus?: Task["status"];
}

export function TaskModal({
  isOpen,
  onClose,
  editTask,
  initialStatus = "pending",
}: TaskModalProps) {
  const { addTask, updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Task["status"]>("pending");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [error, setError] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description || "");
      setStatus(editTask.status);
      setPriority(editTask.priority);
    } else {
      setTitle("");
      setDescription("");
      setStatus(initialStatus);
      setPriority("medium");
    }
    setError("");
  }, [editTask, initialStatus, isOpen]);

  if (!isOpen) return null;

  const isPending = addTask.isPending || updateTask.isPending;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    try {
      if (editTask) {
        await updateTask.mutateAsync({
          id: editTask.id,
          updates: { title, description, status, priority },
        });
      } else {
        await addTask.mutateAsync({ title, description, status, priority });
      }
      onClose();
      toast.success(
        `${editTask ? "Task edited successfully" : "Task created successfully"} `,
      );
    } catch (err) {
      const error = err as AxiosError<{ error?: string }>;
      setError(
        error.response?.data?.error ??
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={!isPending ? onClose : undefined}
      />

      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl border border-gray-100 p-6 z-10 relative flex flex-col gap-5 animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-2 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            {editTask ? "Edit Task" : "Create New Task"}
          </h2>
          <button
            onClick={onClose}
            disabled={isPending}
            className="text-gray-400 cursor-pointer hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-100 p-3 rounded-xl text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField
            label="Task Title"
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
          />

          <div className="w-full flex flex-col gap-2">
            <label className="text-[11px] font-bold tracking-wider text-gray-800 uppercase">
              Description
            </label>
            <textarea
              placeholder="Task description"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isPending}
              className="w-full px-4 py-3 bg-[#f3f4f6] text-gray-900 placeholder-gray-400 text-sm rounded-xl border border-gray-300 focus:outline-none focus:bg-white focus:border-indigo-600 transition-colors duration-200 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-wider text-gray-800 uppercase">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Task["status"])}
                disabled={isPending}
                className="w-full px-4 py-3 bg-[#f3f4f6] text-gray-900 text-sm rounded-xl border border-gray-300 focus:outline-none focus:bg-white focus:border-indigo-600 transition-colors font-medium cursor-pointer"
              >
                <option value="pending">To Do</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Done</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[11px] font-bold tracking-wider text-gray-800 uppercase">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as Task["priority"])
                }
                disabled={isPending}
                className="w-full px-4 py-3 bg-[#f3f4f6] text-gray-900 text-sm rounded-xl border border-gray-300 focus:outline-none focus:bg-white focus:border-indigo-600 transition-colors font-medium cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="w-full flex items-center justify-end gap-x-4 mt-2 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 cursor-pointer font-semibold text-sm rounded-xl transition-all disabled:opacity-40"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white font-semibold cursor-pointer text-sm rounded-xl transition-all shadow-sm flex items-center gap-1.5 disabled:opacity-50"
            >
              {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>{editTask ? "Save Changes" : "Create Task"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
