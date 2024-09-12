import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Typed from 'typed.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); // Nuevo estado para el mensaje de éxito
  const navigate = useNavigate();
  const typedRef = useRef(null);

  useEffect(() => {
    const options = {
      strings: ['Inicia sesión para que organices tu vida !!'],
      typeSpeed: 20,
      backSpeed: 10,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
    };

    let typed;
    if (typedRef.current) {
      typed = new Typed(typedRef.current, options);
    }

    return () => {
      if (typed) {
        typed.destroy();
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoggingIn(true);

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'Login failed. Please check your email and password.'
        );
      }

      const data = await response.json();
      console.log('Login successful:', data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', email);

      setShowWelcome(true);
      setTimeout(() => {
        setShowWelcome(false);
        navigate('/inicio');
      }, 3000); // 3 seconds
    } catch (err) {
      setError(err.message);
      setIsLoggingIn(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/request-reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error sending reset password email.');
      }

      setResetEmail('');
      setShowResetForm(false);
      setSuccessMessage('Solicitud exitosa, revise su correo.'); // Mostrar mensaje de éxito
      setTimeout(() => setSuccessMessage(''), 4000); // Ocultar el mensaje después de 4 segundos
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-white overflow-hidden fade-in">
      {/* Curva de fondo */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="relative w-full h-full">
          <div className="inset-0 bg-white"></div>
          <div className="absolute inset-0 bg-gray-700 clip-path-curved "></div>
        </div>
      </div>

      {/* Sección izquierda con imagen y SVG */}
      <div className="hidden md:flex md:w-1/2 relative justify-center items-center">
        <div className="relative flex items-center">
          <img
            src="/image/Captura de pantalla 2024-08-27 124833.png"
            alt="Background"
            className="w-[60%] h-[70%] object-cover"
          />
          <img
            src="/public/svg/undraw_push_notifications_re_t84m.svg"
            alt="Push Notifications"
            className="absolute right-0 w-[40%] h-auto object-contain"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative z-20">
        <h1 className="text-6xl font-bold mb-4 text-center text-[#FFF5C2]">
          Taskmaster
        </h1>
        <span className='text-lg text-[#FFF5C2]'>Tu solución para una vida más organizada</span>

        {/* Span donde se aplicará el efecto de Typed.js */}
        <div className="text-xl font-medium mb-6 text-[#FFF5C2] relative">
          <span ref={typedRef}></span>
          <span className="absolute -right-5 top-0 text-white animate-blink">
            ✎
          </span>
        </div>

        {showWelcome && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-800 p-6 rounded-lg shadow-lg border border-green-300 z-50">
            <h2 className="text-3xl font-bold mb-2">¡Bienvenido a Taskmaster!</h2>
            <p className="text-lg">Estamos encantados de tenerte aquí. ¡Prepárate para organizar tu vida de manera increíble!</p>
          </div>
        )}

        {successMessage && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-100 text-blue-800 p-6 rounded-lg shadow-lg border border-blue-300 z-50">
            <h2 className="text-xl font-bold mb-2">{successMessage}</h2>
          </div>
        )}

        {showResetForm ? (
          <form
            onSubmit={(e) => { e.preventDefault(); handleResetPassword(); }}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#878786]">Recuperar Contraseña</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-[#878786] text-sm font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Introduce tu correo para recibir el enlace de recuperación"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                className="w-full bg-[#dcdaa4] hover:bg-[#e9e8cb] text-[#878786] font-bold py-2 px-4 rounded-lg transition duration-300 focus:outline-none"
              >
                Enviar enlace de recuperación
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowResetForm(false)}
              className="text-blue-500 hover:underline"
            >
              Volver a iniciar sesión
            </button>
          </form>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-300"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#878786]">¡Hola de Nuevo!</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label htmlFor="email" className="block text-[#878786] text-sm font-semibold mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Introduce tu correo"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-[#878786] text-sm font-semibold mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 rounded-lg w-full py-2 px-4 text-gray-700 focus:outline-none focus:border-blue-500 transition duration-300"
                placeholder="Introduce tu contraseña"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="submit"
                disabled={isLoggingIn}
                className={`w-full ${
                  isLoggingIn ? 'bg-gray-400' : 'bg-[#dcdaa4] hover:bg-[#e9e8cb]'
                } text-[#878786] font-bold py-2 px-4 rounded-lg transition duration-300 focus:outline-none`}
              >
                {isLoggingIn ? 'Iniciando sesión...' : 'Iniciar sesión'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowResetForm(true)}
              className="text-blue-500 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
            <Link to="/register" className="text-blue-500 hover:underline mt-4 block">
              Crear una cuenta
            </Link>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
