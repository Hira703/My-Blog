import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { ThemeContext } from "../../context/ThemeProvider"; // adjust path if needed

const NewsletterSection = () => {
  const { theme } = useContext(ThemeContext);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please enter a valid email.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Subscribed!",
      text: "Thank you for subscribing to our newsletter!",
      timer: 2500,
      showConfirmButton: false,
    });

    setEmail("");
  };

  return (
    <section
      className={`py-10 text-center px-4 md:px-20 transition-colors duration-500
        ${theme === "light" ? "bg-white text-gray-800" : "bg-gray-900 text-gray-100"}
      `}
    >
      <h2
        className={`text-2xl md:text-3xl font-semibold mb-4
          ${theme === "light" ? "text-gray-800" : "text-white"}
        `}
      >
        Subscribe to our Newsletter
      </h2>
      <form
        onSubmit={handleSubscribe}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className={`
            input input-bordered w-full sm:w-96 transition-colors duration-300
            ${theme === "light"
              ? "bg-white text-gray-900 placeholder-gray-400"
              : "bg-gray-800 text-white placeholder-gray-500"}
          `}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`
            btn btn-primary transition-colors duration-300
            ${theme === "light"
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"}
          `}
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;
