# Task Manager Dashboard App

## **Project Overview**
A React-based Task Manager Dashboard that provides data-driven insights into task performance. The app allows users to:

- Add, edit, and delete tasks
- Track tasks by status (Completed, Pending, Overdue, Due Today)
- Upload attachments (images/files) per task
- View analytics via charts (Pie, Bar, Line)
- Toggle between Dark and Light mode
- Fully responsive design for desktop & mobile

**Objective:** Provide real-time visual insights into task performance and trends.

---

## **Features**

### ✅ Task Management
- Create, complete, undo, and delete tasks
- Task status automatically calculated (Pending, Completed, Overdue, Due Today)
- Attach files or images to tasks

### 📊 Analytics Dashboard
- **Pie Chart:** Task status breakdown (Completed vs Pending)
- **Bar Chart:** Task deadlines (Overdue, Due Today, Upcoming)
- **Line Chart:** Weekly task trends (Completed vs Overdue)
- Overall progress indicator with percentage

### 🌗 Dark Mode
- Toggle dark mode/light mode with persistence across sessions

### 📱 Responsive Design
- Mobile-friendly layout with stacked cards and sidebar adjustments

---

## **Screenshots**

### Dashboard Overview
<img width="1366" height="768" alt="Screenshot (928)" src="https://github.com/user-attachments/assets/efad0b4f-7e97-4332-bb8b-4691a0ca7f23" />



### Add Task with Attachment
<img width="1047" height="381" alt="Screenshot (929)" src="https://github.com/user-attachments/assets/322dfca8-e6c3-4aa3-a5b4-34a89439b7ff" />



### Analytics Charts
<img width="551" height="296" alt="Screenshot (928)" src="https://github.com/user-attachments/assets/4ebda1ff-afab-4f5c-9807-cf684169bd0f" />

### DataBase 
<img width="1366" height="674" alt="Screenshot (930)" src="https://github.com/user-attachments/assets/4bc2cfa6-940f-4fd9-8245-a63cb346c29c" />


### Postman 
<img width="1366" height="768" alt="Screenshot (798)" src="https://github.com/user-attachments/assets/70dbf161-ac26-49d1-aaaa-1dd73e40cf54" />




---

## **Setup Instructions**

### 1️⃣ Clone the Repository
```bash
git clone (https://github.com/nidaaeman1122/Task-Managment-Project.git)
cd task-manager-dashboard

 Deployment Link: 
https://chipper-valkyrie-764a68.netlify.app/


Backend 

If using a backend API, configure the base URL in the frontend

 Endpoints:

GET /tasks – Get all tasks

POST /tasks – Add new task

PUT /tasks/:id – Update task

DELETE /tasks/:id – Delete task

File Upload / Attachments

Attach files or images when creating a task

Images show preview; other file types are available as clickable download links

Dark Mode

Toggle using the top-right button in the dashboard header

Mode persists even after page refresh

Deployment

Live deployed URL: (https://chipper-valkyrie-764a68.netlify.app/)

Make sure localStorage contains sample currentUser data for testing login
