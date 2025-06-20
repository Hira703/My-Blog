import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import {
  Sparkles,
  PenTool,
  Flame,
  BookOpenCheck,
  Lightbulb,
  Pencil,
  Feather,
} from "lucide-react";
import animationData from "../../assets/lotties/Animation - 1749701232513 (1).json";
import { ThemeContext } from "../../context/ThemeProvider";
import { useContext } from "react";

const HeroSection = () => {
  const { theme } = useContext(ThemeContext);

  // Brighter gradient for light mode
  const bgGradient =
    theme === "light"
      ? "from-pink-100 via-blue-50 to-yellow-100"
      : "from-gray-900 via-gray-800 to-gray-900";

  const textColor = theme === "light" ? "text-gray-900" : "text-white";
  const paragraphColor = theme === "light" ? "text-gray-700" : "text-gray-300";

  const iconColors = {
    sparkles: theme === "light" ? "text-yellow-400" : "text-yellow-300",
    pentool: theme === "light" ? "text-pink-500" : "text-pink-400",
    flame: theme === "light" ? "text-orange-500" : "text-orange-400",
    lightbulb: theme === "light" ? "text-purple-500" : "text-purple-400",
    bookopen: theme === "light" ? "text-sky-500" : "text-sky-400",
    feather: theme === "light" ? "text-teal-500" : "text-teal-400",
    pencil: theme === "light" ? "text-rose-500" : "text-rose-400",
  };

  return (
    <section
      className={`
        min-h-[90vh] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16
        bg-gradient-to-br ${bgGradient}
        ${textColor}
        transition-colors duration-500 relative overflow-hidden
      `}
    >
      {/* Floating icons */}
      <motion.div
        className={`absolute top-10 left-10 ${iconColors.sparkles} z-0`}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <Sparkles size={36} />
      </motion.div>

      <motion.div
        className={`absolute bottom-16 right-10 ${iconColors.pentool} z-0`}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      >
        <PenTool size={36} />
      </motion.div>

      <motion.div
        className={`absolute top-24 right-32 ${iconColors.flame} z-0`}
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ repeat: Infinity, duration: 4 }}
      >
        <Flame size={36} />
      </motion.div>

      <motion.div
        className={`absolute bottom-28 left-24 ${iconColors.lightbulb} z-0`}
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1 }}
      >
        <Lightbulb size={32} />
      </motion.div>

      <motion.div
        className={`absolute top-44 left-1/2 ${iconColors.bookopen} z-0`}
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 3, delay: 1.5 }}
      >
        <BookOpenCheck size={32} />
      </motion.div>

      <motion.div
        className={`absolute top-12 right-1/3 ${iconColors.feather} z-0`}
        animate={{ y: [0, 12, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 0.7 }}
      >
        <Feather size={32} />
      </motion.div>

      <motion.div
        className={`absolute bottom-10 right-1/4 ${iconColors.pencil} z-0`}
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ repeat: Infinity, duration: 4, delay: 1 }}
      >
        <Pencil size={32} />
      </motion.div>

      {/* Left content */}
      <motion.div
        className="md:w-1/2 space-y-8 text-center md:text-left z-10"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 via-pink-700 to-yellow-500 bg-clip-text text-transparent drop-shadow-md">
            Dive into Ideas,
          </span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-purple-700 to-pink-700 bg-clip-text text-transparent drop-shadow-md">
            Explore Inspiring Blogs
          </span>
        </h1>
        <p className={`${paragraphColor} text-lg md:text-xl max-w-xl mx-auto md:mx-0`}>
          Your daily dose of insights, creativity, and stories. Discover trending thoughts, explore new perspectives, and get inspired.
        </p>
        <motion.button
          whileHover={{ scale: 1.1 }}
          className={`
            px-8 py-4 
            ${
              theme === "light"
                ? "bg-gradient-to-r from-pink-500 to-yellow-400 hover:from-yellow-400 hover:to-pink-500"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-indigo-600 hover:to-blue-700"
            }
            text-white font-semibold rounded-lg shadow-lg 
            transition cursor-pointer
          `}
        >
          Explore Blogs
        </motion.button>
      </motion.div>

      {/* Right animation */}
      <motion.div
        className="md:w-1/2 flex justify-center mb-12 md:mb-0 z-10"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        aria-label="Blog inspiring animation"
        role="img"
      >
        <Player
          autoplay
          loop
          src={animationData}
          style={{ height: "450px", width: "450px" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
