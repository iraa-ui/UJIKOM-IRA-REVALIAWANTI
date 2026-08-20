// Simulating a backend API using localStorage with simulated latency.

const DELAY = 400; // Simulated latency in ms
const STORAGE_KEY = "team_tasks";

const defaultTasks = [
  {
    id: "1",
    title: "Mempelajari Fundamental React 19",
    assignee: "Zahra",
    description: "Memahami hooks baru, action, dan transisi state pada React 19.",
    status: "Selesai",
    priority: "Tinggi",
    deadline: "2026-08-22",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Mengiris (Slicing) Desain UI Dashboard",
    assignee: "Revalia",
    description: "Membuat dashboard layout dengan CSS Grid dan Flexbox agar responsive.",
    status: "Belum Selesai",
    priority: "Sedang",
    deadline: "2026-08-25",
    createdAt: new Date().toISOString()
  },
  {
    id: "3",
    title: "Integrasi State Management Context API",
    assignee: "Tim Dev",
    description: "Menghubungkan state data tugas tim ke seluruh view dashboard dan list.",
    status: "Belum Selesai",
    priority: "Tinggi",
    deadline: "2026-08-21",
    createdAt: new Date().toISOString()
  },
  {
    id: "4",
    title: "Uji Coba Fungsionalitas & Dokumentasi",
    assignee: "Ira",
    description: "Menjalankan testing manual dan melengkapi berkas README/Walkthrough.",
    status: "Belum Selesai",
    priority: "Rendah",
    deadline: "2026-08-28",
    createdAt: new Date().toISOString()
  }
];

const getStoredTasks = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultTasks));
    return defaultTasks;
  }
  return JSON.parse(data);
};

const setStoredTasks = (tasks) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const api = {
  // Fetch all tasks
  fetchTasks: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...getStoredTasks()]);
      }, DELAY);
    });
  },

  // Create a new task
  createTask: (taskData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const tasks = getStoredTasks();
        const newTask = {
          ...taskData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          status: taskData.status || "Belum Selesai"
        };
        tasks.push(newTask);
        setStoredTasks(tasks);
        resolve(newTask);
      }, DELAY);
    });
  },

  // Update an existing task
  updateTask: (id, taskData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = getStoredTasks();
        const index = tasks.findIndex((t) => t.id === id);
        if (index === -1) {
          reject(new Error("Task tidak ditemukan."));
          return;
        }
        const updatedTask = { ...tasks[index], ...taskData };
        tasks[index] = updatedTask;
        setStoredTasks(tasks);
        resolve(updatedTask);
      }, DELAY);
    });
  },

  // Delete a task
  deleteTask: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const tasks = getStoredTasks();
        const filtered = tasks.filter((t) => t.id !== id);
        if (tasks.length === filtered.length) {
          reject(new Error("Task tidak ditemukan."));
          return;
        }
        setStoredTasks(filtered);
        resolve({ success: true, id });
      }, DELAY);
    });
  }
};
