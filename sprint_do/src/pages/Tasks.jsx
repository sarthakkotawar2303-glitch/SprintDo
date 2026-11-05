
import { useOutletContext } from "react-router-dom";
import TaskList from "../components/TaskList";
import useTasks from "../hook/useTasks";

const Tasks = () => {
  const { taskData } = useTasks();
  const { openEditModal } = useOutletContext();

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold text-gray-800">All Tasks</h1>

      <p className="text-gray-500">
        You have {taskData.length} tasks.
      </p>

      <TaskList tasks={taskData} onEditTask={openEditModal} />
    </div>
  );
};

export default Tasks;
