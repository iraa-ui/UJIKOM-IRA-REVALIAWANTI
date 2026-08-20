/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { api } from "../services/api";

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all tasks
  const getTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.fetchTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message || "Gagal memuat daftar tugas.");
    } finally {
      setLoading(false);
    }
  };

  // Add a task
  const addTask = async (taskData) => {
    setLoading(true);
    try {
      const newTask = await api.createTask(taskData);
      setTasks((prev) => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message || "Gagal menambahkan tugas baru.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a task
  const editTask = async (id, taskData) => {
    setLoading(true);
    try {
      const updatedTask = await api.updateTask(id, taskData);
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? updatedTask : t))
      );
      return updatedTask;
    } catch (err) {
      setError(err.message || "Gagal memperbarui tugas.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Remove a task
  const removeTask = async (id) => {
    setLoading(true);
    try {
      await api.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message || "Gagal menghapus tugas.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on mount
  useEffect(() => {
    const init = async () => {
      await Promise.resolve();
      getTasks();
    };
    init();
  }, []);

  // Compute statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "Selesai").length;
    const pending = tasks.filter((t) => t.status === "Belum Selesai").length;
    
    // Check if task is overdue
    const todayStr = new Date().toISOString().split("T")[0];
    const overdue = tasks.filter(
      (t) => t.status === "Belum Selesai" && t.deadline && t.deadline < todayStr
    ).length;

    return { total, completed, pending, overdue };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        getTasks,
        addTask,
        editTask,
        removeTask,
        stats
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks harus digunakan di dalam TaskProvider");
  }
  return context;
}
