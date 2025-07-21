import React, { useContext, useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { ThemeContext } from '../context/ThemeProvider';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from '../components/ThemeToggle';
import logo from '../assets/images/blog-logo.png';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setImgError(false);
  }, [user?.photoURL]);

  const handleLogout = () => {
    logout().then(() => {
      setDropdownOpen(false);
      setMobileMenuOpen(false);
      navigate('/login');
    });
  };

  // Active & default link styles for light & dark themes
  const activeLink =
    theme === 'dark'
      ? 'text-indigo-400 border-b-2 border-indigo-400 pb-1'
      : 'text-indigo-600 border-b-2 border-indigo-600 pb-1';

  const defaultLink =
    theme === 'dark'
      ? 'text-gray-300 hover:text-indigo-400 transition'
      : 'text-gray-700 hover:text-indigo-600 transition';

  return (
    <nav
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-gray-100 shadow-lg shadow-indigo-900/50' : 'bg-white text-gray-900 shadow-md'
      } px-6 py-4 sticky top-0 z-50 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className={`w-12 h-12 rounded-full object-cover border-2 transition-colors duration-300 ${
              theme === 'dark'
                ? 'border-gray-700 hover:border-indigo-400'
                : 'border-gray-300 hover:border-indigo-600'
            }`}
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-8 items-center text-sm font-medium">
          <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            Home
          </NavLink>
          <NavLink to="/all-blogs" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            All Blogs
          </NavLink>
          <NavLink to="/featured-blogs" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            Featured Blogs
          </NavLink>
         

          {user && (
            <>
              <NavLink to="/add-blogs" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                Add Blog
              </NavLink>
              <NavLink to="/my-profile" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                My Profile
              </NavLink>
              <NavLink to="/wishlist" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                Wish List
              </NavLink>
            </>
          )}
        </div>

        {/* Right controls: theme toggle, mobile menu button, user avatar/login */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          <div className="relative" ref={dropdownRef}>
            {!user ? (
              <div className="hidden md:flex space-x-3 font-semibold">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-md transition font-medium shadow-md ${
                    theme === 'dark'
                      ? 'bg-indigo-600 text-gray-100 hover:bg-indigo-700 shadow-indigo-700/70'
                      : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-400/50'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-4 py-2 rounded-md transition font-medium shadow-md ${
                    theme === 'dark'
                      ? 'bg-green-600 text-gray-100 hover:bg-green-700 shadow-green-700/70'
                      : 'bg-green-500 text-white hover:bg-green-600 shadow-green-400/50'
                  }`}
                >
                  Register
                </Link>
              </div>
            ) : (
              <div>
                {user.photoURL && !imgError ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className={`w-10 h-10 rounded-full border-2 cursor-pointer transition-colors duration-300 ${
                      theme === 'dark' ? 'border-indigo-400 hover:border-indigo-500' : 'border-indigo-600 hover:border-indigo-700'
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    onError={() => setImgError(true)}
                    title={user.displayName || user.email}
                  />
                ) : (
                  <FaUserCircle
                    size={40}
                    className={`cursor-pointer transition-colors duration-300 ${
                      theme === 'dark' ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-500 hover:text-indigo-600'
                    }`}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    title={user.displayName || user.email}
                  />
                )}
                {dropdownOpen && (
                  <div
                    className={`absolute right-0 mt-2 w-48 rounded-md shadow-lg py-2 text-sm z-50 transition-colors duration-300 ${
                      theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-white text-gray-900'
                    }`}
                  >
                    <p className="px-4 py-2 border-b border-gray-700 dark:border-gray-600 truncate font-semibold">
                      {user.displayName || user.email}
                    </p>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left px-4 py-2 transition font-semibold ${
                        theme === 'dark'
                          ? 'text-red-400 hover:bg-red-900'
                          : 'text-red-600 hover:bg-red-100'
                      }`}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-4 flex flex-col gap-4 text-sm px-4 rounded-md transition-colors duration-300 ${
            theme === 'dark' ? 'bg-gray-800 text-gray-100' : 'bg-gray-50 text-gray-900 shadow-md'
          }`}
        >
          <NavLink to="/" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            Home
          </NavLink>
          <NavLink to="/all-blogs" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            All Blogs
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
            Wish List
          </NavLink>
          {user && (
            <>
              <NavLink to="/add-blogs" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                Add Blog
              </NavLink>
              <NavLink to="/featured-blogs" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                Featured Blogs
              </NavLink>
              <NavLink to="/my-profile" className={({ isActive }) => (isActive ? activeLink : defaultLink)}>
                My Profile
              </NavLink>
            </>
          )}
          {!user && (
            <div className="flex flex-col gap-2 mt-2">
              <Link
                to="/login"
                className={`px-4 py-2 rounded text-center transition font-semibold shadow-md ${
                  theme === 'dark'
                    ? 'bg-indigo-600 text-gray-100 hover:bg-indigo-700 shadow-indigo-700/70'
                    : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-indigo-400/50'
                }`}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={`px-4 py-2 rounded text-center transition font-semibold shadow-md ${
                  theme === 'dark'
                    ? 'bg-green-600 text-gray-100 hover:bg-green-700 shadow-green-700/70'
                    : 'bg-green-500 text-white hover:bg-green-600 shadow-green-400/50'
                }`}
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
