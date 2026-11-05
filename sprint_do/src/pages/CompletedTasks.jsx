
import { useOutletContext } from "react-router-dom";

import TaskList from "../components/TaskList";
import useTasks from "../hook/useTasks";

const CompletedTasks = () => {
  const { taskData } = useTasks();
  const { openEditModal } = useOutletContext();

  const tasks = taskData.filter(
    (task) => task.status === "Completed"
  );

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-gray-800">Completed Tasks</h1>
      <TaskList tasks={tasks} onEditTask={openEditModal} />
    </div>
  );
};

export default CompletedTasks;
