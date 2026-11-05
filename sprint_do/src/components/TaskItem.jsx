
import useTasks from "../hook/useTasks";
import TaskCard from "./TaskCard";

const TaskItem = ({ task, onEdit }) => {
  const { deleteTask, updateTaskStatus } = useTasks();

  return (
    <TaskCard
      task={task}
      onEdit={onEdit}
      onDelete={deleteTask}
      onStatusChange={updateTaskStatus}
    />
  );
};

export default TaskItem;
