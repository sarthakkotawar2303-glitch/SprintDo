
import { useState, useEffect } from "react";

// Get today's date in YYYY-MM-DD format
const getTodayDate = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const TaskForm = ({
  onAddTask,
  editingTask,
  onUpdateTask,
  onCancelEdit,
}) => {
  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  // Validation errors
  const [errors, setErrors] = useState({});

  // Reset form
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setStatus("Pending");
    setPriority("Medium");
    setDueDate("");
    setErrors({});
  };

  // Populate form when editing a task
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setStatus(editingTask.status);
      setPriority(editingTask.priority || "Medium");
      setDueDate(editingTask.dueDate || "");
      setErrors({});
    } else {
      resetForm();
    }
  }, [editingTask]);

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (title.trim().length < 3) {
      newErrors.title =
        "Title must contain at least 3 characters.";
    }

    // Description validation
    if (
      description.trim() &&
      description.trim().length < 5
    ) {
      newErrors.description =
        "Description must contain at least 5 characters.";
    }

    // Due date validation
    if (dueDate) {
      const today = new Date();

      const localToday = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
      );

      const selectedDate = new Date(
        `${dueDate}T00:00:00`
      );

      if (selectedDate < localToday) {
        newErrors.dueDate =
          "Due date cannot be in the past.";
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Stop if validation fails
    if (!validateForm()) {
      return;
    }

    if (editingTask) {
      // Update existing task
      onUpdateTask({
        ...editingTask,
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate,
      });
    } else {
      // Create new task
      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        status,
        priority,
        dueDate,
      };

      onAddTask(newTask);
    }

    resetForm();
  };

  // Handle cancel editing
  const handleCancel = () => {
    resetForm();
    onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-4 rounded-lg border p-5 shadow-sm"
    >
      <h2 className="text-xl font-semibold">
        {editingTask ? "Update Task" : "Add New Task"}
      </h2>

      {/* Title */}
      <div>
        <label className="mb-1 block font-medium">
          Task Title *
        </label>

        <input
          type="text"
          value={title}
          maxLength={100}
          onChange={(event) => {
            setTitle(event.target.value);
            setErrors((prev) => ({
              ...prev,
              title: "",
            }));
          }}
          placeholder="Enter task title"
          className="w-full rounded-md border p-2"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-1 block font-medium">
          Description
        </label>

        <textarea
          value={description}
          maxLength={500}
          onChange={(event) => {
            setDescription(event.target.value);
            setErrors((prev) => ({
              ...prev,
              description: "",
            }));
          }}
          placeholder="Enter task description"
          className="w-full rounded-md border p-2"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      {/* Status */}
      <div>
        <label className="mb-1 block font-medium">
          Status
        </label>

        <select
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          className="w-full rounded-md border p-2"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Priority */}
      <div>
        <label className="mb-1 block font-medium">
          Priority
        </label>

        <select
          value={priority}
          onChange={(event) => setPriority(event.target.value)}
          className="w-full rounded-md border p-2"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {/* Due Date */}
      <div>
        <label className="mb-1 block font-medium">
          Due Date
        </label>

        <input
          type="date"
          value={dueDate}
          min={getTodayDate()}
          onChange={(event) => {
            setDueDate(event.target.value);
            setErrors((prev) => ({
              ...prev,
              dueDate: "",
            }));
          }}
          className="w-full rounded-md border p-2"
        />

        {errors.dueDate && (
          <p className="mt-1 text-sm text-red-600">
            {errors.dueDate}
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>

        {editingTask && (
          <button
            type="button"
            onClick={handleCancel}
            className="rounded-md bg-gray-200 px-4 py-2 text-gray-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;
