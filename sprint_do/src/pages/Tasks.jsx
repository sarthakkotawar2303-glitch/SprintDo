
import { useState, useMemo } from "react";
import { useOutletContext } from "react-router-dom";

import TaskList from "../components/TaskList";
import SearchBar from "../components/SearchBar";
import useTasks from "../hook/useTasks";

const Tasks = () => {
  const { taskData } = useTasks();
  const { openEditModal } = useOutletContext();

  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Sorting state
  const [sortOption, setSortOption] = useState("none");

  // Priority ranking
  const priorityOrder = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  // Stage 1: Search + Status + Priority filtering
  const filteredTasks = useMemo(() => {
    return taskData.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchTerm.trim().toLowerCase());

      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      const matchesPriority =
        priorityFilter === "all" ||
        task.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [taskData, searchTerm, statusFilter, priorityFilter]);

  // Stage 2: Sorting
  const sortedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      switch (sortOption) {
        case "title-asc":
          return a.title.localeCompare(b.title);

        case "title-desc":
          return b.title.localeCompare(a.title);

        case "priority-high":
          return priorityOrder[b.priority] - priorityOrder[a.priority];

        case "priority-low":
          return priorityOrder[a.priority] - priorityOrder[b.priority];

        case "due-asc":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);

        case "due-desc":
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return b.dueDate.localeCompare(a.dueDate);

        default:
          return 0;
      }
    });
  }, [filteredTasks, sortOption]);

  return (
    <div className="space-y-5">
      {/* Page Heading */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          All Tasks
        </h1>

        <p className="mt-2 text-gray-500">
          You have {taskData.length} tasks.
        </p>
      </div>

      {/* Search */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Filters */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3"
        >
          <option value="all">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        {/* Priority Filter */}
        <select
          value={priorityFilter}
          onChange={(event) => setPriorityFilter(event.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white p-3"
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      {/* Sorting */}
      <select
        value={sortOption}
        onChange={(event) => setSortOption(event.target.value)}
        className="w-full rounded-lg border border-gray-300 bg-white p-3"
      >
        <option value="none">Default Order</option>
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="priority-high">Priority (High-Low)</option>
        <option value="priority-low">Priority (Low-High)</option>
        <option value="due-asc">Due Date (Earliest First)</option>
        <option value="due-desc">Due Date (Latest First)</option>
      </select>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        Showing {sortedTasks.length} of {taskData.length} tasks
      </p>

      {/* Task List */}
      <TaskList
        tasks={sortedTasks}
        onEditTask={openEditModal}
      />
    </div>
  );
};

export default Tasks;
