import { useState, useEffect } from 'react'
import Header from './components/Header'
import Form from './components/Form'
import Table from './components/Table'
// import './App.css'

function App() {
  const [showForm, setShowForm] = useState(false);

  // Load tasks from localStorage in the initial state itself
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [editTask, setEditTask] = useState(null);

  // Save tasks whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleForm = () => {
    setEditTask(null);
    setShowForm((v) => !v);
  };

  const handleAddOrUpdate = (data) => {
    if (editTask) {
      const updated = { ...data, id: editTask.id };
      setTasks((prev) => prev.map((t) => (t.id === editTask.id ? updated : t)));
    } else {
      const newTask = { ...data, id: Date.now() };
      setTasks((prev) => [...prev, newTask]);
    }
    setShowForm(false);
    setEditTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEditTask = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <Header toggleForm={toggleForm} />

      {showForm && (
        <div
          className="fixed inset-0 flex justify-center items-center z-50 
                      bg-black/50 backdrop-blur-sm 
                      transition-all duration-300 ease-in-out"
        >
          <Form onSubmit={handleAddOrUpdate} initialData={editTask} />
        </div>
      )}

      <Table tasks={tasks} onDelete={handleDeleteTask} onEdit={handleEditTask} />
    </div>
  )
}

export default App
