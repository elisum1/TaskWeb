import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    city: '',
    password: '', 
    newPassword: '', 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/'; 
          return;
        }

        const response = await fetch('http://localhost:3001/api/auth/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error fetching user profile.');
        }

        const userData = await response.json();
        setUser(userData);
        setFormData({
          username: userData.username,
          email: userData.email,
          phone: userData.phone,
          city: userData.city,
          password: '', 
          newPassword: '', 
        });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormData({
      username: user.username,
      email: user.email,
      phone: user.phone,
      city: user.city,
      password: '', 
      newPassword: '', 
    });
    setProfilePhoto(null); // Reset photo on cancel
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('newPassword', formData.newPassword);
      if (profilePhoto) {
        formDataToSend.append('profilePhoto', profilePhoto);
      }

      const response = await fetch('http://localhost:3001/api/auth/update', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error updating profile.');
      }

      const updatedUser = await response.json();
      setUser(updatedUser.user);
      setIsEditing(false);
      setSuccessMessage('Perfil actualizado exitosamente');
      setTimeout(() => setSuccessMessage(''), 3000); 
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (!user) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="profile-container  p-6 mx-auto bg-gray-800 shadow-lg rounded-lg border border-gray-300 flex animate-slide-in text-white">
      {/* Sección de la Foto de Perfil */}
      <div className="profile-photo">
        <img
          src={user.profilePhoto || '/default-profile.jpg'}
          alt="Profile"
          className="w-full h-auto object-cover rounded-lg"
        />
        {isEditing && (
          <div className="mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="border border-gray-300 p-2 rounded-sm"
            />
          </div>
        )}
      </div>

      {/* Sección de Información del Usuario */}
      <div className="profile-info p-6 flex flex-col gap-4">
        <h2 className="text-2xl font-medium ">Perfil de Usuario</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
        <label className="flex flex-col ">
          Nombre de usuario:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-2 border border-gray-300 rounded-sm text-sm"
          />
        </label>
        <label className="flex flex-col ">
          Correo electrónico:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-2 border border-gray-300 rounded-sm text-sm"
          />
        </label>
        <label className="flex flex-col ">
          Teléfono:
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-2 border border-gray-300 rounded-sm text-sm"
          />
        </label>
        <label className="flex flex-col ">
          Ciudad:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!isEditing}
            className="mt-1 p-2 border border-gray-300 rounded-sm text-sm"
          />
        </label>
        {isEditing && (
          <>
            <label className="flex flex-col ">
              Contraseña Actual:
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 p-2 border border-gray-300 rounded-sm text-sm pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-2 top-2 "
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </label>
            <label className="flex flex-col ">
              Nueva Contraseña:
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 p-2 border border-gray-300 rounded-sm text-sm"
              />
            </label>
          </>
        )}
        <div className="button-group flex gap-2 mt-4">
          {isEditing ? (
            <>
              <button
                onClick={handleSaveChanges}
                className="bg-green-500 text-white py-1 px-3 rounded-sm text-sm"
              >
                Guardar Cambios
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-500 text-white py-1 px-3 rounded-sm text-sm"
              >
                Cancelar
              </button>
            </>
          ) : (
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white py-1 px-3 rounded-sm text-sm"
            >
              Editar Perfil
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
