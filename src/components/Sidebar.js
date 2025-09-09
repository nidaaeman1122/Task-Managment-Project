import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // to use same CSS file

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="sidebar-title">📌 Task Manager</h2>
      <ul className="sidebar-menu">
        <li onClick={() => navigate("/dashboard")}>📋 All Tasks</li>
        <li onClick={() => navigate("/dashboard?filter=pending")}>⏳ Pending</li>
        <li onClick={() => navigate("/dashboard?filter=completed")}>✅ Completed</li>
        <li onClick={() => navigate("/profile")}>👤 Profile</li>
        <li onClick={() => navigate("/settings")}>⚙ Settings</li>
      </ul>
    </div>
  );
}
