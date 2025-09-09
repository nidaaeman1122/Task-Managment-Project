import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles.css";
import { Doughnut, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      navigate("/login");
      return;
    }
    setUser(currentUser);

    const storedTasks =
      JSON.parse(localStorage.getItem(`tasks_${currentUser.email}`)) || [];
    setTasks(storedTasks);

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);
    document.body.classList.toggle("dark-mode", savedDarkMode);
  }, [navigate]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!title || !description || !dueDate) {
      alert("Please fill in all fields!");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
      completed: false,
      attachment: attachment ? URL.createObjectURL(attachment) : null,
    };

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updatedTasks));

    setTitle("");
    setDescription("");
    setDueDate("");
    setAttachment(null);
  };

  const toggleTask = (id) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(updated);
    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updated));
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    localStorage.setItem(`tasks_${user.email}`, JSON.stringify(updated));
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount
    ? Math.round((completedCount / totalCount) * 100)
    : 0;

  const today = new Date().toISOString().split("T")[0];

  // Pie Chart for Status
  const taskStatusData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedCount, totalCount - completedCount],
        backgroundColor: ["#28a745", "#ffc107"],
        hoverBackgroundColor: ["#218838", "#e0a800"],
      },
    ],
  };

  // Bar Chart for Due Date
  const dueToday = tasks.filter((t) => t.dueDate === today).length;
  const upcoming = tasks.filter((t) => t.dueDate > today).length;
  const overdue = tasks.filter((t) => t.dueDate < today && !t.completed).length;

  const dueDateData = {
    labels: ["Overdue", "Due Today", "Upcoming"],
    datasets: [
      {
        label: "Tasks",
        data: [overdue, dueToday, upcoming],
        backgroundColor: ["#dc3545", "#fd7e14", "#007bff"],
      },
    ],
  };

  // Weekly Trend Line Chart
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const weeklyCompleted = [2, 4, 1, 3, 5, 2, 0]; // Sample: replace with dynamic calculation
  const weeklyOverdue = [0, 1, 0, 2, 0, 1, 1];

  const weeklyData = {
    labels: days,
    datasets: [
      {
        label: "Completed",
        data: weeklyCompleted,
        borderColor: "#28a745",
        backgroundColor: "#28a74533",
        tension: 0.3,
      },
      {
        label: "Overdue",
        data: weeklyOverdue,
        borderColor: "#dc3545",
        backgroundColor: "#dc354533",
        tension: 0.3,
      },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    setDarkMode(isDark);
    localStorage.setItem("darkMode", isDark);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-container">
        {/* Header */}
        <div className="card header-card">
          <div>
            <h2>📊 Task Manager Dashboard</h2>
            <p>
              Welcome back, <strong>{user?.name}</strong> 👋
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={toggleDarkMode} className="task-button">
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Top Grid: Progress + Charts */}
        <div className="dashboard-grid">
          <div className="card progress-card">
            <h3>Overall Progress</h3>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="progress-label">
              {progressPercent}% completed ({completedCount}/{totalCount} tasks)
            </p>
          </div>

          <div className="card chart-card">
            <h3>Task Status Overview</h3>
            <Doughnut data={taskStatusData} />
          </div>

          <div className="card chart-card">
            <h3>Tasks by Due Date</h3>
            <Bar
              data={dueDateData}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true, text: "Task Deadlines" },
                },
              }}
            />
          </div>

          <div className="card chart-card">
            <h3>Weekly Trend</h3>
            <Line
              data={weeklyData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" }, title: { display: true, text: "Weekly Task Trends" } },
              }}
            />
          </div>
        </div>

        {/* Middle Grid: Add Task + Task List */}
        <div className="dashboard-grid">
          <div className="card">
            <h3>Add New Task</h3>
            <form onSubmit={handleAddTask} className="task-form">
              <input
                type="text"
                className="task-input"
                placeholder="Task Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                className="task-input"
                placeholder="Task Description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="date"
                className="task-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <input
                type="file"
                className="task-input"
                onChange={(e) => setAttachment(e.target.files[0])}
              />
              <button className="task-button" type="submit">
                ➕ Add Task
              </button>
            </form>
          </div>

          <div className="card task-list-card">
            <h3>Your Tasks</h3>
            {tasks.length === 0 ? (
              <p className="no-task">No tasks yet. Start by adding one above!</p>
            ) : (
              <ul className="task-list">
                {tasks.map((task) => {
                  let statusClass = "";
                  let badgeText = "";

                  if (task.completed) {
                    statusClass = "completed";
                    badgeText = "Completed";
                  } else if (task.dueDate < today) {
                    statusClass = "overdue";
                    badgeText = "Overdue";
                  } else if (task.dueDate === today) {
                    statusClass = "due-today";
                    badgeText = "Due Today";
                  } else {
                    statusClass = "upcoming";
                    badgeText = "Upcoming";
                  }

                  return (
                    <li key={task.id} className={`task-item ${statusClass}`}>
                      <div className="task-details">
                        <strong>{task.title}</strong>
                        <span className={`badge ${statusClass}`}>{badgeText}</span>
                        <p>{task.description}</p>
                        {task.attachment && (
                          <div>
                            {task.attachment.endsWith(".png") ||
                            task.attachment.endsWith(".jpg") ||
                            task.attachment.endsWith(".jpeg") ? (
                              <img
                                src={task.attachment}
                                alt="attachment"
                                style={{ maxWidth: "100px", marginTop: "6px", borderRadius: "6px" }}
                              />
                            ) : (
                              <a href={task.attachment} target="_blank" rel="noreferrer">
                                View Attachment
                              </a>
                            )}
                          </div>
                        )}
                        <small>Due: {task.dueDate}</small>
                      </div>
                      <div className="task-actions">
                        <button
                          className="task-button"
                          onClick={() => toggleTask(task.id)}
                        >
                          {task.completed ? "Undo" : "Complete"}
                        </button>
                        <button
                          className="delete-btn"
                          onClick={() => deleteTask(task.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
