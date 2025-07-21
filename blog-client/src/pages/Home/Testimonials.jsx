import { useEffect, useState, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ThemeContext } from "../../context/ThemeProvider";
import axiosSecure from "../../api/axiosSecure";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axiosSecure.get("/api/comments/top-rated").then((res) => {
      setReviews(res.data);
    });
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto my-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
        What Our Members Say
      </h2>
      <Swiper
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="rounded-xl"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div
              className={`h-full w-full flex flex-col items-center justify-center text-center p-8 md:p-12 shadow-xl transition-all duration-300 rounded-xl ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-800 to-gray-900 text-white"
                  : "bg-gradient-to-br from-white to-gray-100 text-gray-800"
              }`}
            >
              <img
                src={review.userImage || "/default-user.png"}
                alt={review.userName}
                className="w-20 h-20 mb-5 rounded-full object-cover border-4 border-indigo-500 shadow-md"
              />
              <h4 className="text-xl font-semibold mb-1">{review.userName}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {review.userEmail}
              </p>
              <p className="italic mt-4 text-base max-w-2xl leading-relaxed px-4 text-gray-700 dark:text-gray-300">
                “{review.text}”
              </p>
              <div className="flex gap-1 mt-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${
                      i < review.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
