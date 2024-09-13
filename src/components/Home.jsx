import React, { useState, useRef, useEffect } from 'react';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState('');
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Normal',
    status: 'Pendiente',
    category: '',
  });

  const formRef = useRef(null);

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
          body: JSON.stringify({
            ...newTask,
            status: newTask.status === 'Completed' ? 'Completada' : newTask.status,
          }),
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error creating task.');
        }

        await response.json();
        fetchTasks();
        setNewTask({
          title: '',
          description: '',
          dueDate: '',
          priority: 'Normal',
          status: 'Pendiente',
          category: '',
        });
        setShowForm(false);
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

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
          prevTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );
        setEditTask(null);
        setNewTask({
          title: '',
          description: '',
          dueDate: '',
          priority: 'Normal',
          status: 'Pendiente',
          category: '',
        });
        setShowForm(false);
        fetchTasks();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  };

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
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === '') return true;
    return task.status === filter;
  });

  const priorityClasses = {
    Low: 'bg-green-100',
    Normal: 'bg-yellow-100',
    High: 'bg-red-100',
  };

  return (
    <div className="p-6  min-h-screen font-poppins text-gray-900 relative rounded-lg">
      <h1 className="text-3xl font-light text-black mb-8 text-center">My Tasks Overview</h1>

      {/* Add Task Button */}
      <div
        className={`fixed top-4 right-4 bg-blue-500 text-white p-2 rounded-full cursor-pointer ${showForm ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 z-10`}
        onClick={() => setShowForm(true)}
      >
        <span className="text-xs">Add Task</span>
      </div>

      {/* Filter Buttons */}
      <div className="mb-4 flex justify-center space-x-4">
        <button onClick={() => setFilter('')} className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-sm">All Tasks</button>
        <button onClick={() => setFilter('Pendiente')} className="px-2 py-1 bg-blue-200 text-gray-800 rounded text-sm">Pendientes</button>
        <button onClick={() => setFilter('En Progreso')} className="px-2 py-1 bg-yellow-200 text-gray-800 rounded text-sm">En Progreso</button>
        <button onClick={() => setFilter('Completada')} className="px-2 py-1 bg-green-200 text-gray-800 rounded text-sm">Completadas</button>
      </div>

      <div className={`flex flex-col lg:flex-row gap-4 ${showForm ? 'opacity-20' : 'opacity-100'} transition-opacity duration-300`}>
        {/* Kanban Columns */}
        {['Low', 'Normal', 'High'].map((priority) => (
          <div key={priority} className="flex-1 bg-white shadow-md rounded-lg p-4  border-2">
            <h2 className="text-lg font-light mb-3 text-gray-800 capitalize">{`Priority ${priority}`}</h2>
            <div className="space-y-4">
              {filteredTasks.filter(task => task.priority === priority).map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg shadow-sm flex flex-col space-y-2 ${priorityClasses[task.priority]} border-l-4 border-${priority}-500`}
                >
                  <div className="flex flex-col">
                    <h3 className="text-lg font-medium text-gray-800">{task.title}</h3>
                    <p className="text-sm text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{task.dueDate}</span>
                    <span className={`px-2 py-1 rounded text-sm ${task.status === 'Completada' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{task.status}</span>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        setEditTask(task);
                        setNewTask(task);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-10">
          <div
            ref={formRef}
            className="bg-white p-6 rounded-lg shadow-lg w-80 mx-4"
          >
            <h2 className="text-xl font-light mb-4 text-gray-800">{editTask ? 'Edit Task' : 'Add Task'}</h2>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <textarea
                placeholder="Description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
              >
                <option value="Low">Low</option>
                <option value="Normal">Normal</option>
                <option value="High">High</option>
              </select>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
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
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={editTask ? handleEditTask : handleCreateTask}
              >
                {editTask ? 'Update Task' : 'Add Task'}
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => {
                  setShowForm(false);
                  setEditTask(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
