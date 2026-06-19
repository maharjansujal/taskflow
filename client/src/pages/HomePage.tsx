import { useState } from "react";
import { useTasks, type Task } from "../hooks/useTasks";
import { Navbar } from "../components/Navbar";
import { StatsSummary } from "../components/StatsSummary";
import { Board } from "../components/Board";
import { TaskModal } from "../components/TaskModal";
import { Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

export function HomePage() {
  const { tasks, isLoadingTasks, tasksError, deleteTask, deleteTaskError } =
    useTasks();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [targetStatus, setTargetStatus] = useState<Task["status"]>("pending");

  const handleOpenNewTask = (status: Task["status"] = "pending") => {
    setSelectedTask(null);
    setTargetStatus(status);
    setIsModalOpen(true);
  };

  const handleOpenEditTask = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask.mutateAsync(id);
    } catch (err) {
      const error =
        err instanceof Error ? err.message : "Failed to delete task";
      toast.error(`${error}`);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      <Navbar onAddTaskClick={() => handleOpenNewTask("pending")} />

      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Workspace Header Section Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            My Workspace
          </h1>
          <p className="text-sm text-gray-600 mt-1">{today}</p>
        </div>

        {isLoadingTasks ? (
          <div className="flex flex-col items-center justify-center py-32 gap-3">
            <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
            <p className="text-sm font-bold text-gray-500 tracking-tight">
              Loading your tasks...
            </p>
          </div>
        ) : tasksError ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-8 flex flex-col items-center gap-4 text-center">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <div>
              <h3 className="text-lg font-bold text-red-900">
                Failed to load workspace
              </h3>
              <p className="text-sm text-red-600 mt-1">
                Please check your connection or try logging in again.
              </p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <StatsSummary tasks={tasks} />
            <Board
              tasks={tasks}
              onAddTaskClick={handleOpenNewTask}
              onEditTaskClick={handleOpenEditTask}
              onDeleteTaskClick={handleDelete}
            />
          </>
        )}
      </main>

      <TaskModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editTask={selectedTask}
        initialStatus={targetStatus}
      />
    </div>
  );
}
