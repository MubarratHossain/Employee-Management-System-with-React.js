import React from 'react';

// JSON data for testimonials
const testimonialsData = [
  {
    id: 1,
    quote: "This company provided outstanding service. Highly recommend!",
    name: "Mohammad Salah",
    position: "CEO, SomeCompany",
    image: "https://i.ibb.co/WxL1mLf/14.webp",
  },
  {
    id: 2,
    quote: "A fantastic experience. Will definitely work with them again.",
    name: "Jane Smith",
    position: "Marketing Director, AnotherCompany",
    image: "https://i.ibb.co/R7cdG3y/1.webp",
  },
  {
    id: 3,
    quote: "Excellent customer service and results that exceed expectations!",
    name: "Michael Brown",
    position: "Founder, ExampleCo",
    image: "https://i.ibb.co/TYMc8gd/w-Fu-Zo8h-O-BROZ-1024.webp",
  },
];

const Testimonials = () => {
  return (
    <section className="py-12  mt-2 bg-gradient-to-r from-green-50 via-green-100 to-white rounded-md">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl font-semibold text-black mb-8">What Our Clients Say</h2>
        <div className="overflow-hidden ">
          <div className="whitespace-nowrap  animate-marquee">
            {testimonialsData.map((testimonial) => (
              <div
                key={testimonial.id}
                className="inline-block bg-gradient-to-br from-black via-teal-400 to-teal-700 p-6 rounded-lg shadow-xl w-80 mx-4 mb-8 transition-transform transform hover:scale-105"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <div className='flex flex-col text-wrap'>
                <p className="text-black mb-4 text-sm italic text-left break-words leading-relaxed">
                  "{testimonial.quote}"
                </p>
                </div>
                <h4 className="font-semibold text-lg text-gray-800">{testimonial.name}</h4>
                <p className="text-black">{testimonial.position}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
