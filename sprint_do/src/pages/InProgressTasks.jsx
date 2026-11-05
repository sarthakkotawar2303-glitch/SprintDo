
import { useOutletContext } from "react-router-dom";
import useTasks from "../hook/useTasks";
import TaskList from "../components/TaskList";

const InProgressTasks = () => {
  const { taskData } = useTasks();
  const { openEditModal } = useOutletContext();

  const tasks = taskData.filter(
    (task) => task.status === "In Progress"
  );

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-gray-800">In Progress</h1>
      <TaskList tasks={tasks} onEditTask={openEditModal} />
    </div>
  );
};

export default InProgressTasks;
