import React, { useContext } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeProvider";
import { NavLink } from "react-router-dom";

const Footer = () => {
  const { theme } = useContext(ThemeContext);

  const bgClass = theme === "dark" ? "bg-gray-900" : "bg-gray-100";
  const textClass = theme === "dark" ? "text-gray-100" : "text-gray-800";
  const linkActive =
    theme === "dark"
      ? "text-indigo-400 border-b border-indigo-400 pb-0.5"
      : "text-indigo-600 border-b border-indigo-600 pb-0.5";
  const linkDefault =
    theme === "dark"
      ? "hover:text-indigo-300 text-gray-300"
      : "hover:text-indigo-600 text-gray-700";

  return (
    <footer className={`${bgClass} ${textClass} pt-10 pb-6 px-4`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 grid-cols-1 gap-8 text-sm">
        {/* Logo and Brief */}
        <div>
          <h2 className="text-2xl font-bold mb-2">BlogVista</h2>
          <p className="text-xs leading-5">
            Discover inspiring blogs and connect with amazing minds. Built with
            💙 by MyApp Team.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <nav className="flex flex-col space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? linkActive : linkDefault
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/all-blogs"
              className={({ isActive }) =>
                isActive ? linkActive : linkDefault
              }
            >
              All Blogs
            </NavLink>
            <NavLink
              to="/featured-blogs"
              className={({ isActive }) =>
                isActive ? linkActive : linkDefault
              }
            >
              Featured Blogs
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? linkActive : linkDefault
              }
            >
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2">Contact Us</h3>
          <p>123 Blog Street</p>
          <p>Dhaka, Bangladesh</p>
          <p>Email: support@myapp.com</p>
          <p>Phone: +880 123 456 789</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-400 text-white hover:bg-blue-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 text-white hover:opacity-90 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-700 text-white hover:bg-blue-800 transition"
            >
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-xs mt-10 border-t pt-4 border-gray-600 opacity-80">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
