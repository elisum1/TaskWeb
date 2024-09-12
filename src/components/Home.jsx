import React, { useState, useRef, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState(''); // Estado para manejar el filtro
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Normal',
    status: 'Pendiente',
    category: '',
  });

  const formRef = useRef(null);

  // Function to fetch tasks from the API
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in again.');

      const response = await fetch('http://localhost:3001/api/auth/getTasks', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error fetching tasks.');
      }

      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
        setEditTask(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle task creation
  const handleCreateTask = async () => {
    if (newTask.title.trim()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await fetch('http://localhost:3001/api/auth/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error creating task.');
        }

        await response.json();
        fetchTasks();
        setNewTask({ title: '', description: '', dueDate: '', priority: 'Normal', status: 'Pendiente', category: '' });
        setShowForm(false);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  // Handle task editing
  const handleEditTask = async () => {
    if (newTask.title.trim()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Token not found. Please log in again.');

        const response = await fetch(`http://localhost:3001/api/auth/tasks/${editTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newTask),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error updating task.');
        }

        const updatedTask = await response.json();
        setTasks((prevTasks) =>
          prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
        setEditTask(null);
        setNewTask({ title: '', description: '', dueDate: '', priority: 'Normal', status: 'Pendiente', category: '' });
        setShowForm(false);
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in again.');

      const response = await fetch(`http://localhost:3001/api/auth/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error deleting task.');
      }

      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Update task status
  const updateTaskStatus = async (taskId, status) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Token not found. Please log in again.');

      const response = await fetch(`http://localhost:3001/api/auth/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating task status.');
      }

      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    
      );
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === '') return true;
    return task.status === filter;
  });

  // Check if the task is overdue
  const isTaskOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="p-6 bg-white h-screen font-poppins text-gray-900">
      <h1 className="text-3xl font-light text-gray-800 mb-8 text-center">My Tasks Overview</h1>

      <div className="flex flex-col lg:flex-row h-full">
        {/* Left Panel */}
        <div className="relative p-4 bg-white w-full lg:w-1/2 border-r-2 border-gray-300 h-full">
          <h2 className="text-lg font-light mb-3 text-gray-800 capitalize">Tasks</h2>

          {/* Filter Buttons */}
          <div className="mb-4 flex flex-wrap space-x-2">
            {['', 'Pendiente', 'En Progreso', 'Completada'].map((status) => (
              <button
                key={status}
                className={`p-2 rounded ${filter === status ? `bg-${status === '' ? 'gray-300' : status === 'Pendiente' ? 'yellow-400' : status === 'En Progreso' ? 'blue-400' : 'green-400'} text-white` : 'bg-gray-200'}`}
                onClick={() => setFilter(status)}
              >
                {status === '' ? 'All Tasks' : `Tareas ${status}`}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setShowForm(true);
              setEditTask(null);
              setNewTask({ title: '', description: '', dueDate: '', priority: 'Normal', status: 'Pendiente', category: '' });
            }}
            className="bg-green-500 text-white p-2 rounded shadow-md hover:shadow-lg transition-transform transform hover:scale-105"
            style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 10 }}
          >
            Add Task
          </button>

          <ul className="space-y-2 mt-12">
            {filteredTasks.map((task, index) => (
              <li key={task.id} className={`p-2 rounded-lg flex justify-between items-center ${index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'}`}>
                <div className="flex flex-col w-[70%]">
                  <h3 className="text-sm font-light capitalize text-gray-800">{task.title}</h3>
                  <p className="text-xs text-gray-600">{task.description}</p>
                  <p className="text-xs text-gray-500">Due Date: {task.dueDate}</p>
                  <p className="text-xs text-gray-500">Priority: {task.priority}</p>
                  <p className="text-xs text-gray-500">Category: {task.category}</p>
                  {isTaskOverdue(task.dueDate) && <p className="text-xs text-red-500">Tarea vencida</p>}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setEditTask(task);
                      setNewTask(task);
                    }}
                    className="p-1 rounded bg-blue-400 text-white text-xs"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-1 rounded bg-red-400 text-white text-xs"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Pendiente')}
                    className={`p-1 rounded text-xs ${task.status === 'Pendiente' ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}
                  >
                    Pendiente
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'En Progreso')}
                    className={`p-1 rounded text-xs ${task.status === 'En Progreso' ? 'bg-blue-400 text-white' : 'bg-gray-200'}`}
                  >
                    En Progreso
                  </button>
                  <button
                    onClick={() => updateTaskStatus(task.id, 'Completada')}
                    className={`p-1 rounded text-xs ${task.status === 'Completada' ? 'bg-green-400 text-white' : 'bg-gray-200'}`}
                  >
                    Completada
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Task Form */}
        {showForm && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
            <div
              ref={formRef}
              className="bg-white p-6 rounded shadow-lg w-96"
            >
              <h2 className="text-lg font-light mb-4 text-gray-800">{editTask ? 'Edit Task' : 'Add Task'}</h2>
              <input
                type="text"
                placeholder="Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="border p-2 w-full mb-4"
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="border p-2 w-full mb-4"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="border p-2 w-full mb-4"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="border p-2 w-full mb-4"
              >
                <option value="Normal">Normal</option>
                <option value="High">High</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="border p-2 w-full mb-4"
              >
                <option value="Pendiente">Pendiente</option>
                <option value="En Progreso">En Progreso</option>
                <option value="Completada">Completada</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                className="border p-2 w-full mb-4"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 p-2 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={editTask ? handleEditTask : handleCreateTask}
                  className="bg-blue-500 text-white p-2 rounded text-sm"
                >
                  {editTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
