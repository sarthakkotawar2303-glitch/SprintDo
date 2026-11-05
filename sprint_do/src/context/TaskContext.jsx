
import { createContext, useEffect, useState } from "react";

const TaskContext = createContext(null);

const initialTasks = [
  {
    id: 1,
    title: "Learn React Components",
    description: "Understand components and props",
    status: "Completed",
    priority: "Low",
    dueDate: "",
  },
  {
    id: 2,
    title: "Practice useState",
    description: "Understand React state management",
    status: "In Progress",
    priority: "High",
    dueDate: "",
  },
  {
    id: 3,
    title: "Build TaskFlow",
    description: "Create the task management application",
    status: "Pending",
    priority: "Medium",
    dueDate: "",
  },
];

export const TaskProvider = ({ children }) => {
  const [taskData, setTaskData] = useState(() => {
    try {
      const savedTasks = localStorage.getItem("tasks");

      if (savedTasks !== null) {
        const parsedTasks = JSON.parse(savedTasks);

        return parsedTasks.map((task) => ({
          ...task,
          priority: task.priority || "Medium",
          dueDate: task.dueDate || "",
        }));
      }
    } catch (error) {
      console.error("Unable to load tasks:", error);
    }

    return initialTasks;
  });

  // Persist tasks whenever taskData changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskData));
  }, [taskData]);

  // Add task
  const addTask = (newTask) => {
    setTaskData((prevTasks) => [...prevTasks, newTask]);
  };

  // Update task
  const updateTask = (updatedTask) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Delete task
  const deleteTask = (id) => {
    setTaskData((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  };

  // Update task status
  const updateTaskStatus = (id, newStatus) => {
    setTaskData((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, status: newStatus }
          : task
      )
    );
  };

  const value = {
    taskData,
    addTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
