import {
  LayoutDashboard,
  Sparkles,
  Calendar,
  ClipboardList,
  AlertTriangle,
  Settings,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menus = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      title: "AI Assistant",
      path: "/assistant",
      icon: <Sparkles size={20} />,
    },
    {
      title: "Planner",
      path: "/planner",
      icon: <ClipboardList size={20} />,
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: <Calendar size={20} />,
    },
    {
      title: "Rescue",
      path: "/rescue",
      icon: <AlertTriangle size={20} />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="w-72 md:block hidden bg-indigo-700 text-white min-h-screen p-8">      <h1 className="text-3xl font-bold mb-12">Aheadify</h1>

      <div className="space-y-3">
        {menus.map((menu) => (
          <Link key={menu.title} to={menu.path}>
            <div
              className={`flex items-center gap-4 w-full p-4 rounded-xl transition ${location.pathname === menu.path
                ? "bg-white text-indigo-700 font-semibold shadow-lg"
                : "hover:bg-indigo-600"
                }`}
            >
              {menu.icon}
              {menu.title}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}