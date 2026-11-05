
import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const initialTasks = [
  {
    id: 1,
    title: "Learn React Components",
    description: "Understand components and props",
    status: "Completed",
    priority: "Low",
  },
  {
    id: 2,
    title: "Practice useState",
    description: "Understand React state management",
    status: "In Progress",
    priority: "High",
  },
  {
    id: 3,
    title: "Build TaskFlow",
    description: "Create the task management application",
    status: "Pending",
    priority: "Medium",
  },
];

const Dashboard = () => {
  const [taskData, setTaskData] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks !== null) {
      const parsedTasks = JSON.parse(savedTasks);

      // Add default priority to older tasks
      return parsedTasks.map((task) => ({
        ...task,
        priority: task.priority || "Medium",
      }));
    }

    return initialTasks;
  });

  const [editingTask, setEditingTask] = useState(null);

  // Save tasks in Local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskData));
  }, [taskData]);

  // Add Task
  const handleAddTask = (newTask) => {
    setTaskData((prevTasks) => [...prevTasks, newTask]);
  };

  // Delete Task
  const handleDeleteTask = (id) => {
    setTaskData((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );

    setEditingTask((currentTask) =>
      currentTask?.id === id ? null : currentTask
    );
  };

  // Edit Task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Update Task
  const handleUpdateTask = (updatedTask) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );

    setEditingTask(null);
  };

  // Update Status
  const handleStatusChange = (id, newStatus) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  // Dashboard Statistics
  const totalTasks = taskData.length;

  const completedTasks = taskData.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = taskData.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = taskData.filter(
    (task) => task.status === "In Progress"
  ).length;

  const highPriorityTasks = taskData.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Dashboard Heading */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome to TaskFlow
          </h1>

          <p className="text-gray-500 mt-2">
            Manage your tasks and track your progress.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

          <div className="bg-white p-5 rounded-xl border">
            <p className="text-gray-500 text-sm">Total Tasks</p>
            <h2 className="text-3xl font-bold mt-2">
              {totalTasks}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <p className="text-gray-500 text-sm">Completed</p>
            <h2 className="text-3xl font-bold text-green-600 mt-2">
              {completedTasks}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <p className="text-gray-500 text-sm">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600 mt-2">
              {pendingTasks}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <p className="text-gray-500 text-sm">In Progress</p>
            <h2 className="text-3xl font-bold text-blue-600 mt-2">
              {inProgressTasks}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl border">
            <p className="text-gray-500 text-sm">High Priority</p>
            <h2 className="text-3xl font-bold text-red-600 mt-2">
              {highPriorityTasks}
            </h2>
          </div>

        </div>

        {/* Task Form */}
        <TaskForm
          onAddTask={handleAddTask}
          editingTask={editingTask}
          onUpdateTask={handleUpdateTask}
          onCancelEdit={() => setEditingTask(null)}
        />

        {/* Task List */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Your Tasks
          </h2>

          {taskData.length === 0 ? (
            <p className="text-gray-500">
              No tasks available. Add your first task!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {taskData.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={handleDeleteTask}
                  onEdit={handleEditTask}
                  onStatusChange={handleStatusChange}
                />
              ))}

            </div>
          )}
        </section>

      </div>
    </div>
  );
};

export default Dashboard;
