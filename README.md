# Todo List Application

This is a full-stack Todo List application built with React.js for the frontend, Node.js for the backend, and MongoDB for the database. The application allows users to add new tasks, mark tasks as completed, delete tasks, and download the task list as a PDF.

## Features

- **Task List Display**:

  - Display a list of tasks fetched from the MongoDB database.
  - Each task has a checkbox to mark it as completed.
  - Visually distinguish completed tasks.
  - Download all displayed tasks as a PDF.

- **Add New Task**:

  - Provide an input field and a button to add new tasks to the list.
  - New tasks are saved to the MongoDB database and appear in the task list immediately.

- **Delete Task**:
  - Implement a way to delete tasks from the list.
  - Deleted tasks are removed from the MongoDB database and disappear from the task list immediately.

## Technologies Used

- **Frontend**:

  - React.js
  - Axios for HTTP requests
  - jsPDF for PDF generation
  - Tailwind CSS for styling

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
  - Multer for file uploads

## Setup Instructions

### Backend

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/todo-list-backend.git
   cd todo-list-backend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` File**:

   Create a `.env` file in the root directory and add the following:

   ```env
   PORT=3001
   MONGO_URI=your-mongodb-connection-string
   ```

4. **Run the Server**:

   ```bash
   npm start
   ```

   The backend server will be available at `https://react-todo-backend1.onrender.com`.

### Frontend

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/todo-list-frontend.git
   cd todo-list-frontend
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` File**:

   Create a `.env` file in the root directory and add the following:

   ```env
   REACT_APP_API_URL=`https://react-todo-backend1.onrender.com`
   ```

4. **Run the Application**:

   ```bash
   npm start
   ```

   The application will be available at `https://react-todo-frontend-tawny.vercel.app`.

## Usage

1. **Add Task**: Type your task in the input field and click the "ADD" button to add a new task to the list.
2. **Mark as Completed**: Click the checkbox next to a task to mark it as completed.
3. **Delete Task**: Click the delete icon next to a task to remove it from the list.
4. **Download PDF**: Click the "Download PDF" button to download the list of tasks as a PDF file.
