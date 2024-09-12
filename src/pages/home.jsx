import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {FaUser, FaListAlt, FaTrello, FaCog, FaQuestionCircle } from 'react-icons/fa';
import { MdOutlineExpandMore } from 'react-icons/md';
import Home from '../components/Home';
import MyTasks from '../components/MyTasks';
import Projects from '../components/Projects';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';

const TaskManagementPage = () => {
  const [activeComponent, setActiveComponent] = useState('home');
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    navigate('/inicio');
  };

  const handleGoToHome = () => {
    navigate('/inicio');
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Home />;
      case 'tasks':
        return <MyTasks />;
      case 'projects':
        return <Projects />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  const userEmail = localStorage.getItem('email') || 'User';
  const userInitial = userEmail.charAt(0).toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row h-screen bg-white text-gray-800"
    >
      {/* Sidebar Navigation */}
      <aside
        className={`bg-gray-100 text-gray-800 flex flex-col justify-between lg:h-full p-2 transition-width duration-300 ${
          sidebarExpanded ? 'w-64' : 'w-16'
        }`}
        onMouseEnter={() => setSidebarExpanded(true)}
        onMouseLeave={() => setSidebarExpanded(false)}
      >
        <div>
          <nav>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setActiveComponent('home')}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-200 w-full text-left ${
                    activeComponent === 'home' && 'bg-[#fcf8c1]'
                  }`}
                >
                  <FaTrello />
                  <span className={`${!sidebarExpanded && 'hidden'} text-sm`}>Tablero</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('tasks')}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-200 w-full text-left ${
                    activeComponent === 'tasks' && 'bg-[#fcf8c1]'
                  }`}
                >
                  <FaListAlt />
                  <span className={`${!sidebarExpanded && 'hidden'} text-sm`}>Lista</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent('profile')}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 hover:bg-gray-200 w-full text-left ${
                    activeComponent === 'profile' && 'bg-[#fcf8c1]'
                  }`}
                >
                  <FaUser className="text-black" />
                  <span className={`${!sidebarExpanded && 'hidden'} text-sm`}>Perfil</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-200 text-xs"
            onClick={handleLogout}
          >
            <span className={`${!sidebarExpanded && 'hidden'}`}>Cerrar sesión</span>
          </button>
          <button
            className="bg-[#fcf8c1] text-gray-700 p-2 rounded-md hover:bg-[#f8f290] transition-colors duration-200 text-xs"
            onClick={handleGoToHome}
          >
            <span className={`${!sidebarExpanded && 'hidden'}`}>Ir a inicio</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* Top Nav */}
        <div className="flex justify-between items-center bg-gray-100 p-3 rounded-md mb-4">
          <nav className="flex space-x-4">
            <button className="text-gray-800 hover:text-[#726f3ca3] text-sm">Planillas</button>
            <button className="text-gray-800 hover:text-[#726f3ca3] text-sm">Trabajos</button>
            <button className="text-gray-800 hover:text-[#726f3ca3] text-sm">Proyectos</button>
            <button className="text-gray-800 hover:text-[#726f3ca3] text-sm">Planes</button>
            <button className="text-gray-800 hover:text-[#726f3ca3] text-sm">Tu trabajo</button>
          </nav>
          <div className="flex items-center space-x-4">
            <span className="text-gray-800 font-mono text-sm">{currentTime.toLocaleTimeString()}</span>
            <FaCog className="text-gray-800 hover:text-black text-xl cursor-pointer" />
            <FaQuestionCircle className="text-gray-800 hover:text-black text-xl cursor-pointer" />
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center space-x-2 bg-[#726f3ca3] text-white p-2 rounded-full hover:bg-[#c0bb65a3]"
              >
                <span className="text-sm font-semibold">{userInitial}</span>
                <MdOutlineExpandMore size={20} />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-50">
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => navigate('/perfil')}
                  >
                    Perfil
                  </button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={() => navigate('/configuracion-personal')}
                  >
                    Configuración personal
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200">Tema</button>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Salir
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-lg"
        >
          {renderComponent()}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default TaskManagementPage;
