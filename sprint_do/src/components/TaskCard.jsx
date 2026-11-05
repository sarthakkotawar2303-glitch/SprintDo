
const TaskCard = ({ task, onDelete, onEdit, onStatusChange }) => {
  const priorityStyles = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  return (
    <article className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            priorityStyles[task.priority] || priorityStyles.Medium
          }`}
        >
          {task.priority || "Medium"}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-600">
        {task.description || "No description"}
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <span className="font-medium">Status:</span>
          {" "}{task.status}
        </p>

        {task.dueDate ? (
          <p>
            <span className="font-medium">Due date:</span>
            {" "}
            {new Date(`${task.dueDate}T00:00:00`).toLocaleDateString(
              "en-IN",
              { day: "2-digit", month: "short", year: "numeric" }
            )}
          </p>
        ) : (
          <p className="text-gray-400">No due date set</p>
        )}
      </div>

      <div className="mt-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">
          Change status
        </label>

        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value)
          }
          className="w-full rounded-md border p-2 text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          type="button"
          onClick={() => onEdit(task)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onDelete(task.id)}
          className="rounded-md bg-red-100 px-4 py-2 text-sm text-red-700 hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default TaskCard;
