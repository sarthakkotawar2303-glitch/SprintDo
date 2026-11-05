
import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onEditTask }) => {
  if (tasks.length === 0) {
    return (
      <p className="rounded-lg bg-white p-6 text-center text-gray-500">
        No tasks found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEditTask}
        />
      ))}
    </div>
  );
};

export default TaskList;
