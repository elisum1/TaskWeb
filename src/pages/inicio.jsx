import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi'; // Importar íconos para el botón de hamburguesa

const LandingPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para el menú desplegable
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (token && email) {
      setIsLoggedIn(true);
      setUserEmail(email);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    setIsLoggedIn(false);
    setUserEmail('');
    navigate('/inicio');
  };

  const handleEmailSubmit = () => {
    localStorage.setItem('registerEmail', emailInput);
    navigate('/register');
  };

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-[#FFF5C2] text-gray-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white z-50">
        <div className=" mx-auto flex items-center justify-center lg:flex-row flex-col lg:items-center lg:justify-between p-4 md:p-6 sm:mr-[10%] sm:ml-[10%]">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/public/svg/undraw_bird(1).svg" alt="Logo" className="md:w-10 w-5" />
          </Link>
          <h1 className='sm:text-4xl text-3xl font-bold text-[#E8E2B0]'>Task<span className='sm:text-4xl text-3xl font-light text-gray-600'>Master</span></h1>

          {/* Menu Toggle Button */}
          <button
            className="md:hidden flex items-center text-gray-700"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenu className="w-6 h-6" />}
          </button>

          {/* Navigation Menu */}
          <nav className={`md:flex items-center space-x-6 ${isMenuOpen ? 'block' : 'hidden'} md:block ml-4`}>
            <div className="md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-yellow-500 transition duration-300">Home</Link>
              <Link to="/features" className="text-gray-700 hover:text-yellow-500 transition duration-300">Features</Link>
              <Link to="/pricing" className="text-gray-700 hover:text-yellow-500 transition duration-300">Pricing</Link>
              <Link to="/about" className="text-gray-700 hover:text-yellow-500 transition duration-300">About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-yellow-500 transition duration-300">Contact</Link>
            </div>
          </nav>

          {/* Search Bar */}
          <div className="relative flex items-center w-[20%] h-[30px] ml-4 mr-9">
            <input
              type="text"
              placeholder="Search..."
              className="w-[100%] h-[100%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
           
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-3 relative text-gray-700">
            {isLoggedIn ? (
              <>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={toggleUserMenu}
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-[#726f3ca3] hover:bg-[#bebb99a3] rounded-full text-white font-bold text-sm">
                    {userEmail[0].toUpperCase()}
                  </div>
                  <span className="text-sm">{userEmail}</span>
                </div>
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48">
                    <Link
                      to="/perfil"
                      className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 transition duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Perfil
                    </Link>
                    <Link
                      to="/home"
                      className="block px-4 py-2 text-gray-800 hover:bg-yellow-100 transition duration-200"
                      onClick={() => setShowUserMenu(false)}
                    >
                      Mis Tareas
                    </Link>
                    <button
                      className="block w-full px-4 py-2 text-gray-800 hover:bg-yellow-100 transition duration-200 text-left"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm py-2 px-4 rounded-sm transition duration-200">
                    Sign Up
                  </button>
                </Link>
                <Link to="/">
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold text-sm py-2 px-4 rounded-sm transition duration-200">
                    Log In
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col md:flex-row items-center text-center md:text-left py-8 px-4 md:py-16 md:px-8 bg-[#FFF5C2] mt-[28%] sm:mt-[23%] lg:mt-[1%] w-[80%] m-auto">
        <div className="md:w-1/2 flex flex-col items-center md:items-start p-10">
          <h2 className="text-5xl font-semibold mb-4 text-black">No tienes cuenta, ¿qué esperas? ¡Aprovecha y regístrate de una vez!</h2>
          <input
            type="email"
            placeholder="Introduce tu email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full md:w-3/4 p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleEmailSubmit}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-sm py-2 px-6 rounded-sm transition duration-200"
          >
            Enviar
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0">
          <img
            src="/public/svg/DrawKit Vector Illustration Project Manager (8).svg"
            alt="Imagen principal"
            className="w-[100%] h-[100%] mt-8"
          />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-8 px-4 md:py-16 md:px-8 bg-white">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-center">
          <div className="w-full md:w-1/2 p-4 flex justify-center items-center">
            <img
              src="/public/svg/DrawKit Vector Illustration Project Manager (19).svg"
              alt="Funciones principales ilustración"
              className="max-w-sm md:max-w-md"
            />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center md:text-left">¿Qué te ofrecemos?</h2>
            <ul className="list-disc pl-6 space-y-4">
              <li className="text-gray-700">Gestión de tareas fácil y eficiente</li>
              <li className="text-gray-700">Integración con otras herramientas</li>
              <li className="text-gray-700">Soporte técnico 24/7</li>
              <li className="text-gray-700">Acceso desde cualquier dispositivo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#575755] py-6">
        <div className="container mx-auto flex flex-col items-center space-y-4">
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white hover:text-yellow-500 transition duration-300 w-6 h-6" />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white hover:text-yellow-500 transition duration-300 w-6 h-6" />
            </a>
            <a href="mailto:info@example.com">
              <FaEnvelope className="text-white hover:text-yellow-500 transition duration-300 w-6 h-6" />
            </a>
          </div>
          <p className="text-white mt-4">© 2024 TaskMaster. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
