
const TaskCard = ({
  task,
  onDelete,
  onEdit,
  onStatusChange,
}) => {
  const statusStyles = {
    Completed: "bg-green-100 text-green-700",
    Pending: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
  };

  const priorityStyles = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm space-y-4">

      {/* Title and Status */}
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-lg font-semibold text-gray-800">
          {task.title}
        </h3>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusStyles[task.status]
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* Priority */}
      <div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            priorityStyles[task.priority || "Medium"]
          }`}
        >
          {task.priority || "Medium"} Priority
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500">
        {task.description || "No description provided."}
      </p>

      {/* Update Status */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">
          Update Status
        </label>

        <select
          value={task.status}
          onChange={(event) =>
            onStatusChange(task.id, event.target.value)
          }
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Edit and Delete */}
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onEdit(task)}
          className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
        >
          Delete
        </button>
      </div>

    </div>
  );
};

export default TaskCard;
