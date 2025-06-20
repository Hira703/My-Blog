import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider"; // Adjust the path as needed
import { motion } from "framer-motion";
import { FaRocket, FaLaptopCode, FaBrain, FaLightbulb } from "react-icons/fa";

const topics = [
  {
    icon: <FaRocket className="text-primary text-4xl" />,
    title: "Tech Innovations",
    description: "Explore the latest in AI, Web3, and emerging technologies shaping our world.",
  },
  {
    icon: <FaLaptopCode className="text-primary text-4xl" />,
    title: "Dev Career",
    description: "Guides, tips, and roadmaps to boost your software development journey.",
  },
  {
    icon: <FaBrain className="text-primary text-4xl" />,
    title: "Mind Hacks",
    description: "Productivity hacks, learning strategies, and mental clarity tips for creators.",
  },
  {
    icon: <FaLightbulb className="text-primary text-4xl" />,
    title: "Inspiration",
    description: "Stories and lessons from top creators, developers, and entrepreneurs.",
  },
];

const TrendingTopics = () => {
  const { theme } = useContext(ThemeContext); // 🎯 Access the current theme

  return (
    <section
      className={`py-16 px-4 md:px-20 transition-colors duration-500 ${
        theme === "dark" ? "bg-gray-950" : "bg-white"
      }`}
    >
      <h2
        className={`text-3xl md:text-4xl font-bold text-center mb-12 transition-colors duration-500 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        🔥 Trending <span className="text-primary">Topics</span>
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {topics.map((topic, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className={`rounded-2xl p-6 border transition-all duration-300 shadow-sm hover:shadow-lg ${
              theme === "dark"
                ? "bg-gray-900 border-gray-800 text-gray-100"
                : "bg-white border-gray-200 text-gray-800"
            }`}
          >
            <div className="mb-4">{topic.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{topic.title}</h3>
            <p className="text-sm">
              {topic.description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default TrendingTopics;
