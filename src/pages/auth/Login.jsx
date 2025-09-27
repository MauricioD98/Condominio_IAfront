import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import { User, Lock } from "lucide-react";  

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { values, errors, loading, handleChange, handleSubmit } = useForm({
    username: '',
    password: ''
  });

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (formData) => {
    const result = await login(formData.username, formData.password);
    if (!result.success) {
      throw new Error(result.error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Condominio Inteligente</h2>
          <p className="text-gray-500 text-sm">Administrativo</p>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(onSubmit);
          }}
        >
          {/* Usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                id="username"
                name="username"
                type="text"
                required
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingresa tu usuario"
                value={values.username}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-gray-400" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-xl shadow-sm text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingresa tu contraseña"
                value={values.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Error */}
          {errors.detail && (
            <div className="text-red-600 text-sm text-center">
              {errors.detail}
            </div>
          )}

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>

          {/* Pie */}
          <p className="text-center text-xs text-gray-500">
            © {new Date().getFullYear()} Condominio Inteligente
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;