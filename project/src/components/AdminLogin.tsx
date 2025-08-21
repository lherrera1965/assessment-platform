import React, { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../services/supabaseService';

interface AdminLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ isOpen, onClose, onLogin }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!supabase) {
      setError('Supabase no está configurado');
      setLoading(false);
      return;
    }

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        setError('Credenciales incorrectas');
        setLoading(false);
        return;
      }

      if (data.user) {
        // Verificar si el usuario tiene rol de admin (opcional)
        // Puedes agregar lógica adicional aquí para verificar roles
      onLogin();
        setEmail('');
      setPassword('');
      onClose();
      }
    } catch (err) {
      console.error('Error de autenticación:', err);
      setError('Error al iniciar sesión. Inténtelo de nuevo.');
    }
    
    setLoading(false);
  };

  const handleClose = () => {
    setEmail('');
    setPassword('');
    setError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Acceso de Administrador">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="text-center mb-6">
          <Lock className="w-12 h-12 text-slate-400 mx-auto mb-2" />
          <p className="text-sm text-slate-600">
            Ingrese sus credenciales de administrador para acceder al panel de gestión
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="admin-email" className="block text-sm font-medium text-slate-700 mb-2">
            Email de Administrador
          </label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="admin@empresa.com"
            required
          />
        </div>

        <div className="relative">
          <label htmlFor="admin-password" className="block text-sm font-medium text-slate-700 mb-2">
            Contraseña
          </label>
          <div className="relative">
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 pr-10 text-slate-900 placeholder-slate-400 bg-slate-50 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="Ingrese la contraseña"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button
            type="button"
            onClick={handleClose}
            variant="secondary"
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            loading={loading}
            disabled={!email.trim() || !password.trim()}
          >
            Acceder
          </Button>
        </div>
      </form>
    </Modal>
  );
};