import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import { AuthContext } from "../context/AuthProvider";
import axiosSecure from "../api/axiosSecure";
import { FaUserAlt, FaPhoneAlt, FaMapMarkerAlt, FaSave, FaCamera } from "react-icons/fa";
import Swal from "sweetalert2";

const UpdateProfile = () => {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    photoURL: "",
  });

  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUserInfo = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/api/users?email=${encodeURIComponent(user.email)}`);
        if (res.data) {
          const { _id,name, phone, address, photoURL } = res.data;
          setUserId(_id); 
          setFormData({ name, phone, address, photoURL });
          console.log(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to load profile data.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosSecure.put(`/api/users/${userId}`, formData);

      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Profile updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Update failed",
          text: "Failed to update profile.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error updating profile.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto px-6 py-10 rounded-lg shadow-lg ${
        theme === "dark" ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"
      }`}
    >
      <h2
        className={`text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-yellow-300" : "text-indigo-700"
        }`}
      >
        Update Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className={`block mb-2 font-semibold ${
              theme === "dark" ? "text-yellow-300" : "text-indigo-700"
            }`}
          >
            <FaUserAlt className="inline mr-2" />
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 rounded-md border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-400"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
            } focus:outline-none transition`}
            placeholder="Your full name"
          />
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className={`block mb-2 font-semibold ${
              theme === "dark" ? "text-yellow-300" : "text-indigo-700"
            }`}
          >
            <FaPhoneAlt className="inline mr-2" />
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-400"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
            } focus:outline-none transition`}
            placeholder="Your phone number"
          />
        </div>

        {/* Address */}
        <div>
          <label
            htmlFor="address"
            className={`block mb-2 font-semibold ${
              theme === "dark" ? "text-yellow-300" : "text-indigo-700"
            }`}
          >
            <FaMapMarkerAlt className="inline mr-2" />
            Address
          </label>
          <textarea
            id="address"
            name="address"
            rows={3}
            value={formData.address || ""}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-md border resize-none ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-400"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
            } focus:outline-none transition`}
            placeholder="Your address"
          />
        </div>

        {/* Photo URL */}
        <div>
          <label
            htmlFor="photoURL"
            className={`block mb-2 font-semibold ${
              theme === "dark" ? "text-yellow-300" : "text-indigo-700"
            }`}
          >
            <FaCamera className="inline mr-2" />
            Profile Photo URL
          </label>
          <input
            type="url"
            id="photoURL"
            name="photoURL"
            value={formData.photoURL || ""}
            onChange={handleChange}
            placeholder="https://example.com/photo.jpg"
            className={`w-full px-4 py-3 rounded-md border ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:border-yellow-400"
                : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-indigo-500"
            } focus:outline-none transition`}
          />
          {formData.photoURL && (
            <img
              src={formData.photoURL}
              alt="Preview"
              className="mt-4 w-32 h-32 object-cover rounded-full border-2 border-indigo-500"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-md font-semibold transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed text-gray-700"
              : theme === "dark"
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          <FaSave />
          {loading ? "Saving..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
