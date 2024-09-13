import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera el correo electrónico guardado en localStorage
    const savedEmail = localStorage.getItem('registerEmail');
    
    // Verifica si hay un correo electrónico guardado
    if (savedEmail) {
      setEmail(savedEmail);
      localStorage.removeItem('registerEmail'); // Limpia el correo electrónico después de usarlo
    }
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('https://taskapi-7z2t.onrender.com/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password, phone, city }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }

      const data = await response.json();
      console.log('Registration successful:', data);

      // Redirect to the login page after successful registration
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-white overflow-hidden fade-in">
      {/* Curva de fondo */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <div className="relative w-full h-full">
          <div className=" inset-0 bg-white"></div>
          <div className="absolute inset-0 bg-gray-700 clip-path-curved bg-task-pattern"></div>
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
            src="/public/svg/undraw_subscriber_re_om92.svg"
            alt="Subscriber"
            className="absolute right-0 w-[40%] h-auto object-contain"
          />
        </div>
      </div>

      {/* Sección derecha */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative z-20">
        <h1 className="text-6xl font-bold mb-4 text-center text-[#FFF5C2]">
          Taskmaster
        </h1>

        <span className='text-lg text-white'>Tu solución para una vida más organizada</span>

        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200"
        >
          <h2 className="text-2xl font-semibold mb-6 text-[#878786] text-center">Create Your Account</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {/* Username Input */}
          <div className="mb-4">
            <label htmlFor="username" className="block text-[#878786] text-sm font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your username"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-[#878786] text-sm font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-[#878786] text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your password"
            />
          </div>

          {/* Phone Input */}
          <div className="mb-4">
            <label htmlFor="phone" className="block text-[#878786] text-sm font-medium mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your phone number"
            />
          </div>

          {/* City Input */}
          <div className="mb-6">
            <label htmlFor="city" className="block text-[#878786] text-sm font-medium mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow-sm border rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Enter your city"
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="submit"
              className="bg-[#ebeb7f] hover:bg-[#b7b7b3] text-[#222222] font-medium py-2 px-4 rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
            >
              Register
            </button>
          </div>

          {/* Links to Login and Home */}
          <div className="flex flex-col mt-4 gap-2">
            <Link to="/" className=" hover:bg-[#dedead] text-[#fffffe] bg-[#688fc2] font-medium py-2 px-4 rounded-md text-center transition-all">
              Login
            </Link>
            <Link to="/inicio" className=" hover:bg-[#dcdc9e] bg-[#d8d8c6] text-[#242423] font-medium py-2 px-4 rounded-md text-center transition-all border ">
              Page Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
