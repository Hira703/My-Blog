import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FcGoogle } from 'react-icons/fc';
import { saveUserToBackend } from '../api/saveUserToBackend';

const Register = () => {
  const { createUser, signInWithGoogle } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    photoURL: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isValidImageURL = url => {
    return /^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);
  };

  const handleSubmit = e => {
    e.preventDefault();

    createUser(formData.email, formData.password)
      .then(async result => {
        const user = result.user;

        if (user) {
          user.displayName = formData.name;
          user.photoURL = formData.photoURL;
        }

        const finalPhoto = isValidImageURL(formData.photoURL?.trim())
          ? formData.photoURL.trim()
          : 'https://i.ibb.co/5WhpW6Wv/user-profile.png';

        const userData = {
          uid: user.uid,
          email: user.email,
          name: formData.name,
          photoURL: finalPhoto,
          phone: formData.phone,
          address: formData.address,
        };

        try {
          await saveUserToBackend(userData);
          Swal.fire({
            icon: 'success',
            title: 'Registered Successfully!',
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from, { replace: true });
        } catch (backendErr) {
          console.error("Error saving to backend:", backendErr);
          Swal.fire({
            icon: 'error',
            title: 'Backend Error',
            text: 'Failed to save user to server.',
          });
        }
      })
      .catch(error => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message
        });
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then(async (result) => {
        const user = result.user;

        const userData = {
          uid: user.uid,
          email: user.email,
          name: user.displayName || 'No Name',
          photoURL: 'https://i.ibb.co/5WhpW6Wv/user-profile.png',
          phone: '+8801714567780',
          address: 'Dhaka',
        };

        try {
          await saveUserToBackend(userData);
          Swal.fire({
            icon: 'success',
            title: 'Google Sign-in Successful!',
            showConfirmButton: false,
            timer: 1500
          });
          navigate(from, { replace: true });
        } catch (err) {
          console.error("Error saving Google user to backend:", err);
          Swal.fire({
            icon: 'error',
            title: 'Backend Error',
            text: 'Failed to save Google user to server.',
          });
        }
      })
      .catch(err => {
        Swal.fire({
          icon: 'error',
          title: 'Google Sign-in Failed',
          text: err.message
        });
      });
  };

  return (
    <div className={`flex justify-center items-center min-h-screen px-4 transition duration-300 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className={`card w-full max-w-lg shadow-xl transition duration-300 ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
        <div className="card-body">
          <h2 className="text-3xl font-bold text-center mb-4">Register</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {['name', 'email', 'password', 'phone', 'address', 'photoURL'].map((field, i) => (
              <input
                key={i}
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                placeholder={
                  field === 'photoURL' ? 'Photo URL (optional)' :
                  field === 'name' ? 'Full Name' :
                  field === 'email' ? 'Email' :
                  field === 'phone' ? 'Phone Number' :
                  field === 'address' ? 'Address' : ''
                }
                className={`input input-bordered w-full transition duration-300 ${
                  theme === 'dark'
                    ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-300'
                    : 'bg-white text-black border-gray-300 placeholder-gray-500'
                }`}
                required={field !== 'photoURL'}
                onChange={handleChange}
              />
            ))}

            <button type="submit" className="btn btn-primary w-full">
              Register
            </button>
          </form>

          <div className="divider">OR</div>
          <button
            onClick={handleGoogle}
            className={`btn w-full flex justify-center items-center gap-2 transition duration-300 ${
              theme === 'dark'
                ? 'btn-outline border-white text-white hover:bg-white hover:text-black'
                : 'btn-outline border-black text-black hover:bg-black hover:text-white'
            }`}
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <p className="text-center mt-4 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
