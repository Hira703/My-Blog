import React, { useContext, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider'; // make sure path is correct
import { FiMail, FiLock } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { saveUserToBackend } from '../api/saveUserToBackend'; // ensure this function is implemented

const Login = () => {
  const { signIn, signInWithGoogle } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || '/';

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      Swal.fire({
        icon: 'success',
        title: 'Login successful',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login failed',
        text: error.message,
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;

      const userData = {
        uid: user.uid,
        email: user.email,
        name: user.displayName || 'No Name',
        photoURL: 'https://i.ibb.co/5WhpW6Wv/user-profile.png',
        phone: '+8801714567780',
        address: 'Dhaka',
      };

      await saveUserToBackend(userData);

      Swal.fire({
        icon: 'success',
        title: 'Google login successful',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
      });

      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login or backend save failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Google login failed',
        text: error.message || 'Failed to login or save user data.',
      });
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-white'
    }`}>
      <div className={`w-full max-w-md shadow-xl p-8 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
      }`}>
        <h2 className={`text-2xl font-bold text-center mb-6 ${
          theme === 'dark' ? 'text-white' : 'text-primary'
        }`}>
          Login
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">
              <span className={theme === 'dark' ? 'text-white' : 'text-base-content'}>
                Email
              </span>
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                className={`input input-bordered w-full pl-10 ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                }`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className={theme === 'dark' ? 'text-white' : 'text-base-content'}>
                Password
              </span>
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                className={`input input-bordered w-full pl-10 ${
                  theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : ''
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Login
          </button>

          <div className="divider">OR</div>

          <button
            type="button"
            className="btn btn-outline btn-accent w-full flex items-center justify-center gap-2"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle size={22} />
            Continue with Google
          </button>
        </form>

        <p className={`text-sm text-center mt-4 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-primary hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
