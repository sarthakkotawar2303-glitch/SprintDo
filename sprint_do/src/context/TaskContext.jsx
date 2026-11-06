
import { createContext, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/FirebaseConfig";
import useAuth from "../hook/useAuth";

const TaskContext = createContext(null);

export const TaskProvider = ({ children }) => {
  const { currentUser, loading: authLoading } = useAuth();

  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load only the logged-in user's tasks.
  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!currentUser) {
      setTaskData([]);
      setLoading(false);
      setError("");
      return;
    }

    // Clear previous user's tasks when the account changes.
    setTaskData([]);
    setLoading(true);
    setError("");

    const tasksCollection = collection(
      db,
      "users",
      currentUser.uid,
      "tasks"
    );

    const unsubscribe = onSnapshot(
      tasksCollection,
      (snapshot) => {
        const userTasks = snapshot.docs.map((taskDoc) => ({
          id: taskDoc.id,
          ...taskDoc.data(),
          priority: taskDoc.data().priority || "Medium",
          dueDate: taskDoc.data().dueDate || "",
        }));

        setTaskData(userTasks);
        setLoading(false);
        setError("");
      },
      (snapshotError) => {
        console.error("Unable to load tasks:", snapshotError);
        setError("Unable to load your tasks. Please refresh and try again.");
        setTaskData([]);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [currentUser, authLoading]);

  // Add task to the current user's collection.
  const addTask = async (newTask) => {
    if (!currentUser) {
      throw new Error("You must be logged in to add a task.");
    }

    const { id, ...taskDetails } = newTask;

    await addDoc(
      collection(db, "users", currentUser.uid, "tasks"),
      {
        ...taskDetails,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }
    );
  };

  // Update an existing task.
  const updateTask = async (updatedTask) => {
    if (!currentUser) {
      throw new Error("You must be logged in to update a task.");
    }

    const { id, createdAt, ...taskDetails } = updatedTask;

    await updateDoc(
      doc(db, "users", currentUser.uid, "tasks", id),
      {
        ...taskDetails,
        updatedAt: serverTimestamp(),
      }
    );
  };

  // Delete a task.
  const deleteTask = async (id) => {
    if (!currentUser) {
      throw new Error("You must be logged in to delete a task.");
    }

    await deleteDoc(
      doc(db, "users", currentUser.uid, "tasks", id)
    );
  };

  // Update task status.
  const updateTaskStatus = async (id, newStatus) => {
    if (!currentUser) {
      throw new Error("You must be logged in to update a task.");
    }

    await updateDoc(
      doc(db, "users", currentUser.uid, "tasks", id),
      {
        status: newStatus,
        updatedAt: serverTimestamp(),
      }
    );
  };

  const value = {
    taskData,
    loading,
    error,
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
