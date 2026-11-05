
import { useOutletContext } from "react-router-dom";
import TaskList from "../components/TaskList";
import useTasks from "../hook/useTasks";

const PendingTasks = () => {
  const { taskData } = useTasks();
  const { openEditModal } = useOutletContext();

  const tasks = taskData.filter(
    (task) => task.status === "Pending"
  );

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-gray-800">Pending Tasks</h1>
      <TaskList tasks={tasks} onEditTask={openEditModal} />
    </div>
  );
};

export default PendingTasks;
