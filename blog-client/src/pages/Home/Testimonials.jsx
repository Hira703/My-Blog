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
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full max-w-5xl mx-auto my-10 px-4">
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Navigation, Pagination]}
        className="h-full w-full rounded-lg overflow-hidden"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div
              className={`h-full w-full flex flex-col items-center justify-center text-center p-6 transition-all duration-300 ${
                theme === "dark"
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <img
                src={review.userImage || "/default-user.png"}
                alt={review.userName}
                className="w-16 h-16 mb-4 rounded-full object-cover border-2 border-indigo-500"
              />
              <h4 className="text-lg font-semibold">{review.userName}</h4>
              <p className="text-sm text-gray-400">{review.userEmail}</p>
              <p className="italic mt-2 text-sm px-4 max-w-md">
                "{review.text}"
              </p>
              <div className="flex gap-1 mt-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-lg ${
                      i < review.rating ? "text-yellow-400" : "text-gray-400"
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
