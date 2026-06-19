import { Calendar, Pencil, Trash2 } from "lucide-react";
import { type Task } from "../hooks/useTasks";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (id: number) => void;
}

export const TaskCard = ({ task, onEdit, onDelete }: TaskCardProps) => {
  const priorityStyles = {
    low: "bg-blue-50 text-blue-700 border-blue-100",
    medium: "bg-amber-50 text-amber-700 border-amber-100",
    high: "bg-red-50 text-red-700 border-red-100",
  };

  const formattedDate = new Date(task.created_at).toLocaleDateString("en-CA"); // Canadian English locale

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-all duration-200 cursor-pointer flex flex-col gap-4 group">
      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-900 tracking-tight leading-snug transition-colors duration-150 text-sm">
            {task.title}
          </h3>
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit?.(task)}
              className="p-1.5 rounded hover:bg-secondary text-muted-foreground hover:text-primary transition-colors cursor-pointer"
              title="Edit task"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={() => onDelete?.(task.id)}
              className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              title="Delete task"
            >
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        {task.description && (
          <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between mt-1">
        <span
          className={`text-[10px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-md border ${priorityStyles[task.priority] || priorityStyles.medium}`}
        >
          {task.priority}
        </span>

        <div className="flex items-center gap-1 text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium tracking-tight">
            {formattedDate}
          </span>
        </div>
      </div>
    </div>
  );
};
