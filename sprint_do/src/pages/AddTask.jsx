
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import useTasks from "../hook/useTasks";

const AddTask = () => {
  const { addTask } = useTasks();
  const navigate = useNavigate();

  const handleAddTask = async (newTask) => {
    try {
      await addTask(newTask);
      navigate("/tasks");
    } catch (error) {
      console.error("Unable to add task:", error);
      throw error;
    }
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
