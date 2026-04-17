import React from "react";
function TaskList() {
  return (
    <div className="container mt-4">
      <h1 className="mb-3"> Daftar Tugas</h1>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary">
          + Tambah Tugas
        </button>
      </div>
      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>No</th>
            <th>Nama Tugas</th>
            <th>Diugaskan Kepada</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>

        <tbody>
          {/* DATA DUMMY */}
          <tr>
            <td>1</td>
            <td>Belajar React</td>
            <td>Ira</td>
            <td>
              <span className="badge bg-success">Selesai</span>
            </td>
            <td>
              <button className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button className="btn btn-danger btn-sm">
                Hapus
              </button>
            </td>
          </tr>

          <tr>
            <td>2</td>
            <td>UI Dashboard</td>
            <td>Tim</td>
            <td>
              <span className="badge bg-secondary">
                Belum
              </span>
            </td>
            <td>
              <button className="btn btn-warning btn-sm me-2">
                Edit
              </button>
              <button className="btn btn-danger btn-sm">
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default TaskList;