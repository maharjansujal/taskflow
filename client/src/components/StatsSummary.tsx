import { useMemo } from "react";
import { ClipboardList, CheckCircle2, Circle } from "lucide-react";
import { type Task } from "../hooks/useTasks";

interface StatsSummaryProps {
  tasks: Task[] | undefined;
}

export function StatsSummary({ tasks = [] }: StatsSummaryProps) {
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "completed").length;
    const pending = tasks.filter((t) => t.status === "pending").length;

    return { total, completed, pending };
  }, [tasks]);

  const cards = [
    {
      title: "Total Tasks",
      value: stats.total,
      icon: ClipboardList,
      iconColor: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      iconColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: Circle,
      iconColor: "text-amber-600",
      bgColor: "bg-amber-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_2px_8px_rgba(0,0,0,0.01)] flex items-center gap-5"
          >
            <div
              className={`p-3.5 rounded-xl ${card.bgColor} ${card.iconColor} flex items-center justify-center shrink-0`}
            >
              <Icon className="w-5 h-5 stroke-[2.5]" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                {card.value}
              </span>
              <span className="text-xs font-semibold text-gray-400 tracking-wide">
                {card.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
