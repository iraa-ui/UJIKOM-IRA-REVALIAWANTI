import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCheck,
  faClock,
  faExclamationTriangle,
  faCalendarAlt,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Dashboard.css";

function Dashboard() {
  const { tasks, stats, loading, error } = useTasks();

  // Calculate percentage completed
  const completionPercentage = useMemo(() => {
    if (stats.total === 0) return 0;
    return Math.round((stats.completed / stats.total) * 100);
  }, [stats]);

  // Filter and sort tasks with upcoming deadlines (excluding finished ones)
  const upcomingTasks = useMemo(() => {
    return [...tasks]
      .filter((t) => t.status !== "Selesai")
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
      .slice(0, 4);
  }, [tasks]);

  if (loading && tasks.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50 flex-column py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-secondary">Memuat data dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-view animate-fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="h2 mb-1 fw-bold text-dark text-start">Dashboard</h1>
          <p className="text-muted text-start text-sm">
            Pantau progres tugas tim dan tenggat waktu kolaborasi secara real-time.
          </p>
        </div>
        <Link to="/task-form" className="btn btn-primary shadow-sm px-4">
          + Tambah Tugas Baru
        </Link>
      </div>

      {error && (
        <div className="alert alert-danger shadow-sm border-0 d-flex align-items-center gap-2 mb-4" role="alert">
          <FontAwesomeIcon icon={faExclamationTriangle} />
          <div>{error}</div>
        </div>
      )}

      {/* Metrics Row */}
      <div className="card-container-grid mb-4">
        {/* Total Tasks Card */}
        <div className="metric-card card-total">
          <div className="card-accent-border"></div>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span className="card-label">Total Tugas</span>
              <h3 className="card-value">{stats.total}</h3>
            </div>
            <div className="icon-badge bg-total-light text-total">
              <FontAwesomeIcon icon={faBook} />
            </div>
          </div>
          <div className="card-footer-info">Semua tugas terdaftar</div>
        </div>

        {/* Completed Card */}
        <div className="metric-card card-completed">
          <div className="card-accent-border"></div>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span className="card-label">Selesai</span>
              <h3 className="card-value">{stats.completed}</h3>
            </div>
            <div className="icon-badge bg-success-light text-success">
              <FontAwesomeIcon icon={faCheck} />
            </div>
          </div>
          <div className="card-footer-info">
            {stats.total > 0
              ? `${Math.round((stats.completed / stats.total) * 100)}% dari total tugas`
              : "Belum ada tugas"}
          </div>
        </div>

        {/* Pending Card */}
        <div className="metric-card card-pending">
          <div className="card-accent-border"></div>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span className="card-label">Belum Selesai</span>
              <h3 className="card-value">{stats.pending}</h3>
            </div>
            <div className="icon-badge bg-warning-light text-warning">
              <FontAwesomeIcon icon={faClock} />
            </div>
          </div>
          <div className="card-footer-info">Menunggu pengerjaan tim</div>
        </div>

        {/* Overdue Card */}
        <div className="metric-card card-overdue">
          <div className="card-accent-border"></div>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <span className="card-label">Melewati Tenggat</span>
              <h3 className={`card-value ${stats.overdue > 0 ? "text-danger-custom" : ""}`}>
                {stats.overdue}
              </h3>
            </div>
            <div className={`icon-badge ${stats.overdue > 0 ? "bg-danger-light text-danger" : "bg-light text-secondary"}`}>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </div>
          </div>
          <div className="card-footer-info">Butuh tindakan segera</div>
        </div>
      </div>

      <div className="row g-4">
        {/* Progress Circular Panel */}
        <div className="col-xl-4 col-md-5">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white text-center d-flex flex-column justify-content-center align-items-center">
            <h5 className="card-title fw-bold text-dark mb-4 text-start w-100">Progres Keseluruhan</h5>
            
            <div className="progress-circle-wrapper position-relative my-3">
              {/* SVG Circular Progress Bar */}
              <svg className="progress-circle" width="160" height="160" viewBox="0 0 160 160">
                <circle
                  className="progress-circle-bg"
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke="#e2e8f0"
                  strokeWidth="12"
                />
                <circle
                  className="progress-circle-bar"
                  cx="80"
                  cy="80"
                  r="70"
                  fill="transparent"
                  stroke="#4f46e5"
                  strokeWidth="12"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * completionPercentage) / 100}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                  style={{ transition: "stroke-dashoffset 0.8s ease-in-out" }}
                />
              </svg>
              <div className="progress-circle-percentage position-absolute top-50 start-50 translate-middle">
                <span className="fs-2 fw-bold text-dark">{completionPercentage}%</span>
              </div>
            </div>

            <p className="text-muted mt-3 small px-2">
              {stats.completed} dari {stats.total} tugas selesai.
              Tetap semangat menjaga ritme kerja tim!
            </p>
          </div>
        </div>

        {/* Upcoming Deadlines Panel */}
        <div className="col-xl-8 col-md-7">
          <div className="card border-0 shadow-sm p-4 h-100 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title fw-bold text-dark mb-0">Tenggat Waktu Terdekat (Urgent)</h5>
              <Link to="/tasks" className="text-decoration-none small d-flex align-items-center gap-1 text-primary">
                Lihat Semua <FontAwesomeIcon icon={faArrowRight} className="small-icon" />
              </Link>
            </div>

            {upcomingTasks.length === 0 ? (
              <div className="d-flex flex-column align-items-center justify-content-center flex-grow-1 py-4 text-center">
                <div className="text-secondary opacity-50 mb-2" style={{ fontSize: "2rem" }}>
                  <FontAwesomeIcon icon={faCalendarAlt} />
                </div>
                <p className="text-muted small">Tidak ada tugas dengan tenggat waktu dekat.</p>
              </div>
            ) : (
              <div className="upcoming-list d-flex flex-column gap-3 mt-2">
                {upcomingTasks.map((task) => {
                  // check if overdue
                  const isTaskOverdue = new Date(task.deadline) < new Date(new Date().toISOString().split("T")[0]);
                  
                  return (
                    <div
                      key={task.id}
                      className="upcoming-item d-flex align-items-center justify-content-between p-3 rounded border border-light transition hover-shadow"
                    >
                      <div className="d-flex align-items-start gap-3">
                        <div className={`priority-indicator rounded-circle ${task.priority.toLowerCase()}`}></div>
                        <div>
                          <h6 className="fw-semibold text-dark mb-1 text-start">{task.title}</h6>
                          <div className="d-flex align-items-center gap-2 flex-wrap">
                            <span className="badge bg-secondary-light text-secondary-dark text-xs">
                              {task.assignee}
                            </span>
                            <span className={`text-xs d-flex align-items-center gap-1 ${isTaskOverdue ? "text-danger fw-bold" : "text-muted"}`}>
                              <FontAwesomeIcon icon={faCalendarAlt} className="text-xxs" />
                              {task.deadline} {isTaskOverdue ? "(Overdue)" : ""}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-end">
                        <span className={`badge ${task.priority === "Tinggi" ? "bg-danger-light text-danger" : task.priority === "Sedang" ? "bg-warning-light text-warning" : "bg-success-light text-success"}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;