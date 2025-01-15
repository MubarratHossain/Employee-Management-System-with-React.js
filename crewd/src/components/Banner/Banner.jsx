import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css'; 
import './Banner.css'; 
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; 
import Image1 from './Corporate-Life.jpg'; 
import Image2 from './consulting.jpg';
import Image3 from './consulting2.jpg';

const Banner = () => {
  return (
    <section className="relative w-full h-full md:h-[600px] mt-2 max-w-[95%] mx-auto mb-2">
      
      <Swiper
        modules={[Navigation, Pagination, Autoplay]} 
        spaceBetween={10} 
        slidesPerView={1} 
        loop={true} 
        autoplay={{
          delay: 3000, 
          disableOnInteraction: false, 
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          clickable: true,
        }}
        className="swiper-container w-full h-full"
      >
      
        <SwiperSlide>
          <img
            src={Image1} 
            alt="Corporate Life"
            className="w-full h-64 md:h-full lg:h-full xl:h-full 2xl:h-full object-cover rounded-xl"
          />
        </SwiperSlide>
        
        
        <SwiperSlide>
          <img
            src={Image2} 
            alt="Consulting"
            className="w-full h-64 md:h-full lg:h-full xl:h-full 2xl:h-full object-cover rounded-xl"
          />
        </SwiperSlide>
        
        
        <SwiperSlide>
          <img
            src={Image3} 
            alt="Consulting 2"
            className="w-full h-64 md:h-full lg:h-full xl:h-full 2xl:h-full object-cover rounded-xl"
          />
        </SwiperSlide>
      </Swiper>

      
      <div className="swiper-button-next absolute top-1/2 right-4 z-10 transform -translate-y-1/2">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 18l6-6-6-6" />
        </svg>
      </div>
      <div className="swiper-button-prev absolute top-1/2 left-4 z-10 transform -translate-y-1/2">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
