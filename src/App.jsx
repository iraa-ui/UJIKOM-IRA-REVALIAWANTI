import { useState } from 'react'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import TaskList from "./pages/TaskList";


function App() {
  return (
    <>
    
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskList />} />
      


      </Routes>
    </Router>
    </>
  )
}

export default App
