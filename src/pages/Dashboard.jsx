import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="card-container">
        <div className="card">
          <FontAwesomeIcon icon={faBook} />
          <h2 className="card-title">Total Tasks</h2>
          <p>10</p>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faCheck} />
          <h2 className="card-title">Selesai</h2>
          <p>5</p>
        </div>

        <div className="card">
          <FontAwesomeIcon icon={faClock} />
          <h2 className="card-title">Belum Selesai</h2>
          <p>5</p>
        </div>
      </div>

      <Link to="/tasks" className="btn">
        Lihat Semua Task 
      </Link>
    </div>
  );
}

export default Dashboard;