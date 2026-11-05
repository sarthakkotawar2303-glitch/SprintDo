
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import useTasks from "../hook/useTasks";


const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleAddTask = (newTask) => {
    addTask(newTask);
    navigate("/tasks");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <h1 className="text-3xl font-bold text-gray-800">
        Add New Task
      </h1>

      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
};

export default AddTask;
