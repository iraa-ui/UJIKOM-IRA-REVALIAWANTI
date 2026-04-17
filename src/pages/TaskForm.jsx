import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TaskForm() {
  return (
    <div className="container mt-4">
      <div className="card shadow-sm p-4">
        <h3 className="mb-3">Tambah Tugas</h3>

        <form>
  
          <div className="mb-3">
            <label className="form-label">Nama Tugas</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan nama tugas"
            />
          </div>

        
          <div className="mb-3">
            <label className="form-label">Diugaskan Kepada</label>
            <input
              type="text"
              className="form-control"
              placeholder="Masukkan nama"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Status</label>
            <select className="form-select">
              <option>Belum Selesai</option>
              <option>Selesai</option>
            </select>
          </div>


          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Simpan Tugas
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;