
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "All Tasks", path: "/tasks" },
  { label: "Add New Task", path: "/tasks/new" },
  { label: "Pending Tasks", path: "/tasks/pending" },
  { label: "Completed Tasks", path: "/tasks/completed" },
  { label: "In Progress", path: "/tasks/in-progress" },
  { label: "Profile", path: "/profile" },
];

const Sidebar = () => {
  return (
    <aside className="hidden min-h-[calc(100vh-65px)] w-64 border-r bg-white p-4 md:block">
      <nav className="space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `block rounded-lg px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
