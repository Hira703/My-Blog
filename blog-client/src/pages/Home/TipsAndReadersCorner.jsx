import React, { useContext } from "react";
import { FaPenNib, FaRegComments, FaBookmark, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";
import { ThemeContext } from "../../context/ThemeProvider"; // Adjust path if needed

const TipsAndReadersCorner = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section
      className={`py-16 px-6 md:px-20 transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gray-900 "
          : "bg-white"
      }`}
    >
      {/* Blogging Tips Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-10 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <span className="text-primary">Blogging Tips</span> & Tricks
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FaPenNib className="text-3xl text-primary" />,
              title: "Catchy Titles",
              tip: "Write engaging titles that trigger curiosity or answer a question.",
            },
            {
              icon: <FaSearch className="text-3xl text-primary" />,
              title: "SEO Basics",
              tip: "Use keywords naturally and link to relevant posts.",
            },
            {
              icon: <FaPenNib className="text-3xl text-primary" />,
              title: "Write Consistently",
              tip: "Stick to a content calendar — even once a week works!",
            },
            {
              icon: <FaPenNib className="text-3xl text-primary" />,
              title: "Short Paragraphs",
              tip: "Make your blog easier to read with short, punchy paragraphs.",
            },
            {
              icon: <FaPenNib className="text-3xl text-primary" />,
              title: "Your Voice Matters",
              tip: "Be authentic. Your unique voice makes your blog stand out.",
            },
            {
              icon: <FaPenNib className="text-3xl text-primary" />,
              title: "Add Images",
              tip: "Visuals make content more engaging and shareable.",
            },
          ].map((tip, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-md border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            >
              <div className="mb-4">{tip.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {tip.tip}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reader's Corner Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-10 ${
            theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          Reader’s <span className="text-primary">Corner</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <FaRegComments className="text-3xl text-primary mb-3" />,
              title: "Join the Conversation",
              description:
                "Leave thoughtful comments to engage with writers and other readers.",
            },
            {
              icon: <FaBookmark className="text-3xl text-primary mb-3" />,
              title: "Bookmark Your Favorites",
              description: "Save posts to revisit your favorite reads anytime.",
            },
            {
              icon: <FaSearch className="text-3xl text-primary mb-3" />,
              title: "Discover by Interest",
              description:
                "Use filters and tags to explore what matters to you most.",
            },
            {
              icon: <FaPenNib className="text-3xl text-primary mb-3" />,
              title: "Weekly Highlight",
              description:
                "Don’t miss the editor’s top pick of the week, curated for you.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl shadow-md border transition-colors duration-300 ${
                theme === "dark"
                  ? "bg-gray-800 text-white border-gray-700"
                  : "bg-white text-gray-800 border-gray-200"
              }`}
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p
                className={`${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TipsAndReadersCorner;
