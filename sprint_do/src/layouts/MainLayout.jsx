
import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskModal from "../components/TaskModal";
import useTasks from "../hook/useTasks";

const MainLayout = () => {
  const { updateTask } = useTasks();
  const [editingTask, setEditingTask] = useState(null);

  const openEditModal = (task) => {
    setEditingTask(task);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask);
    setEditingTask(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <Outlet context={{ openEditModal }} />
        </main>
      </div>

      {editingTask && (
        <TaskModal
          editingTask={editingTask}
          onClose={() => setEditingTask(null)}
          onUpdateTask={handleUpdateTask}
        />
      )}
    </div>
  );
};

export default MainLayout;
