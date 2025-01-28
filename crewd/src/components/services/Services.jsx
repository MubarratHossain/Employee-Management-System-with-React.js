import { useState } from "react";

// JSON data for services
const servicesData = [
  {
    id: 1,
    title: "Employee Workflow Monitoring",
    description: "Track employee tasks, hours worked, and update workflow for efficient project management. Employees can log tasks, and HR can monitor real-time progress.",
    image: "https://i.ibb.co.com/QvVkTjq/Improve-Onboarding-Process-with-Modern-Tech.webp",
    detailsLink: "/workflow-monitoring"
  },
  {
    id: 2,
    title: "Payroll Management",
    description: "Easily manage employee salaries, process payments, and track financial records. HR can issue payments and monitor salary distributions.",
    image: "https://i.ibb.co.com/myrVrQ1/Payroll-Systems.jpg",
    detailsLink: "/payroll"
  },
  {
    id: 3,
    title: "Contract Management",
    description: "Keep track of employee contracts, amendments, and renewal dates. HR can view and manage employee contracts digitally for smoother operations.",
    image: "https://i.ibb.co.com/TWP91y4/what-is-contract-management-system-inset.jpg",
    detailsLink: "/contract-management"
  },
  {
    id: 4,
    title: "User Routes Variation",
    description: "Various user routes for monitoring employee activities, workflow progress, and payroll tasks. HR can easily navigate through reports, payments, and employee management.",
    image: "https://i.ibb.co.com/q9q3zKJ/2240x1090-1-1560x760.jpg",
    detailsLink: "/hr-dashboard"
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-50 via-green-100 to-white rounded-md">
      <div className="max-w-[90%] mx-auto text-left">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-300 to-white mb-8 tracking-wide">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="flex flex-col justify-between bg-[#002B5B]  text-white p-6 rounded-xl shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-48 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-300 mb-4">{service.description}</p>
              <a
                href={service.detailsLink}
                className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-300 to-white transition-all duration-200"
              >
                See Details
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
