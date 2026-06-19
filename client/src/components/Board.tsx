import { useMemo } from "react";
import { Plus } from "lucide-react";
import { type Task } from "../hooks/useTasks";
import { TaskCard } from "./TaskCard";

interface BoardProps {
  tasks: Task[] | undefined;
  onAddTaskClick: (status: Task["status"]) => void;
  onEditTaskClick: (task: Task) => void;
  onDeleteTaskClick: (id: number) => void;
}

interface ColumnConfig {
  id: Task["status"];
  title: string;
  dotColor: string;
  borderColor: string;
}

export function Board({
  tasks = [],
  onAddTaskClick,
  onEditTaskClick,
  onDeleteTaskClick,
}: BoardProps) {
  const columns: ColumnConfig[] = [
    {
      id: "pending",
      title: "To Do",
      dotColor: "bg-blue-500",
      borderColor: "border-b-2 border-blue-500",
    },
    {
      id: "in_progress",
      title: "In Progress",
      dotColor: "bg-amber-500",
      borderColor: "border-b-2 border-amber-500",
    },
    {
      id: "completed",
      title: "Done",
      dotColor: "bg-emerald-500",
      borderColor: "border-b-2 border-emerald-500",
    },
  ];

  const groupedTasks = useMemo(() => {
    const acc: Record<Task["status"], Task[]> = {
      pending: [],
      in_progress: [],
      completed: [],
    };

    tasks.forEach((task) => {
      if (acc[task.status]) {
        acc[task.status].push(task);
      } else {
        acc.pending.push(task);
      }
    });
    return acc;
  }, [tasks]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
      {columns.map((column) => {
        const columnTasks = groupedTasks[column.id] || [];

        return (
          <div key={column.id} className="flex flex-col gap-4 min-w-0">
            <div
              className={`flex items-center justify-between pb-3 ${column.borderColor}`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${column.dotColor}`} />
                <h2 className="font-bold text-sm text-gray-900 tracking-tight">
                  {column.title}
                </h2>
                <span className="bg-gray-100 text-gray-500 font-semibold text-xs px-2 py-0.5 rounded-md">
                  {columnTasks.length}
                </span>
              </div>

              <button
                onClick={() => onAddTaskClick(column.id)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                title={`Add task to ${column.title}`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3 min-h-50">
              {columnTasks.length > 0 ? (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEditTaskClick}
                    onDelete={onDeleteTaskClick}
                  />
                ))
              ) : (
                <div className="border border-dashed border-gray-200 rounded-2xl py-8 text-center text-xs text-gray-400 font-medium bg-gray-50/50">
                  No tasks here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
