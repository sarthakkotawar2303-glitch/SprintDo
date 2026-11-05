
import { useOutletContext } from "react-router-dom";
import TaskList from "../components/TaskList";
import useTasks from "../hook/useTasks";

const Dashboard = () => {
  const { taskData } = useTasks();
  const { openEditModal } = useOutletContext();

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

  const statistics = [
    { label: "Total Tasks", count: totalTasks, color: "text-gray-800" },
    { label: "Completed", count: completedTasks, color: "text-green-600" },
    { label: "Pending", count: pendingTasks, color: "text-yellow-600" },
    { label: "In Progress", count: inProgressTasks, color: "text-blue-600" },
    { label: "High Priority", count: highPriorityTasks, color: "text-red-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to TaskFlow
        </h1>
        <p className="mt-2 text-gray-500">
          Manage your tasks and track your progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {statistics.map((item) => (
          <div key={item.label} className="rounded-xl border bg-white p-5">
            <p className="text-sm text-gray-500">{item.label}</p>
            <h2 className={`mt-2 text-3xl font-bold ${item.color}`}>
              {item.count}
            </h2>
          </div>
        ))}
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Your Tasks
        </h2>

        <TaskList
          tasks={taskData}
          onEditTask={openEditModal}
        />
      </section>
    </div>
  );
};

export default Dashboard;
