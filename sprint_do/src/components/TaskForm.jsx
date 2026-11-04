
import { useState, useEffect } from "react";

const TaskForm = ({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");

  // Fill the form when editingTask changes
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [editingTask]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim()) return;

    if (editingTask) {
      // Update existing task
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
        status,
      });
    } else {
      // Add new task
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        status,
      };

      onAddTask(newTask);
    }

    // Clear form after submission
    setTitle("");
    setDescription("");
    setStatus("Pending");
  };

  const handleCancel = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {editingTask ? "Edit Task" : "Add New Task"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Task Title
        </label>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>

        <textarea
          placeholder="Enter task description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows="3"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
