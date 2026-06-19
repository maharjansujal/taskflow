import { CheckSquare } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2 mb-8">
      <div className="bg-[#4f46e5] p-2 rounded-xl text-white shadow-sm">
        <CheckSquare className="w-6 h-6" />
      </div>
      <span className="text-xl font-bold text-gray-900 tracking-tight">
        TaskFlow
      </span>
    </div>
  );
}
