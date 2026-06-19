import { useState, useRef, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { CheckSquare, Plus, LogOut, ChevronDown } from "lucide-react";

interface NavbarProps {
  onAddTaskClick: () => void;
}

export function Navbar({ onAddTaskClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown cleanly when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="w-full bg-white border-b border-gray-100 h-16 fixed top-0 left-0 right-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-[#4f46e5] p-1.5 rounded-lg text-white shadow-sm">
          <CheckSquare className="w-5 h-5" />
        </div>
        <span className="text-lg font-bold text-gray-900 tracking-tight">
          Taskr
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onAddTaskClick}
          className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-[0.98] flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Task</span>
        </button>

        {/* Profile Dropdown Component Container */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-gray-50 transition-colors duration-150 group"
          >
            <div className="w-8 h-8 rounded-full bg-[#e0e7ff] text-[#4f46e5] font-bold text-xs flex items-center justify-center tracking-wider">
              {initials}
            </div>

            <span className="text-sm font-semibold text-gray-700 hidden sm:inline-block max-w-[120px] truncate">
              {user?.name || "Account"}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-gray-50 flex flex-col">
                <span className="text-xs text-gray-400 font-medium">
                  Logged in as
                </span>
                <span className="text-xs font-bold text-gray-700 truncate">
                  {user?.email}
                </span>
              </div>

              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  logout();
                }}
                className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-medium flex items-center gap-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
