"use client"
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    title: "Decentraclasses Partnership Opportunity",
    content: (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">Decentraclasses Partnership Opportunity</h1>
        <h2 className="text-2xl mb-4">Elevate Your Course Reach with Decentraclasses</h2>
        <p className="text-xl">[Current Date]</p>
        <p className="text-xl">[Your Name and Title]</p>
        <p className="text-xl">[Contact Information]</p>
      </div>
    ),
  },
  {
    title: "About Decentraclasses",
    content: (
      <ul className="list-disc pl-6">
        <li>Leading platform for Web3 education</li>
        <li>Empowering developers with skills for tAhe decentralized future</li>
        <li>Extensive community of passionate learners and developers</li>
      </ul>
    ),
  },
  {
    title: "Market Opportunity",
    content: (
      <>
        <h3 className="text-xl font-semibold mb-2">Growing Demand:</h3>
        <ul className="list-disc pl-6 mb-4">
          <li>Rapidly expanding Web3 industry</li>
          <li>Increasing need for skilled developers in blockchain, smart contracts, DeFi, and NFTs</li>
        </ul>
        <h3 className="text-xl font-semibold mb-2">Target Audience:</h3>
        <ul className="list-disc pl-6">
          <li>Developers, tech enthusiasts, and professionals seeking to upskill in Web3 technologies</li>
        </ul>
      </>
    ),
  },
  {
    title: "Our Platform",
    content: (
      <ul className="list-disc pl-6">
        <li>User-friendly interface tailored for effective learning</li>
        <li>Comprehensive course offerings covering various Web3 technologies</li>
        <li>Active community forums for collaboration and support</li>
        <li>Regularly updated content to keep pace with industry developments</li>
      </ul>
    ),
  },
  {
    title: "Benefits for Course Providers",
    content: (
      <ul className="list-disc pl-6">
        <li>Expanded Reach: Access to a global audience of Web3 enthusiasts and developers</li>
        <li>Increased Visibility: Featured placements and promotions within the platform</li>
        <li>Community Engagement: Interactive forums and discussion boards to enhance course value</li>
        <li>Monetization: Revenue-sharing opportunities from course enrollments</li>
      </ul>
    ),
  },
  {
    title: "Partnership Model",
    content: (
      <ul className="list-disc pl-6">
        <li>Course Listing: Your courses listed on Decentraclasses with comprehensive descriptions and previews</li>
        <li>Revenue Share: Competitive revenue-sharing model to ensure mutual benefit</li>
        <li>Marketing Support: Dedicated marketing efforts to promote your courses</li>
        <li>Analytics: Detailed analytics on course performance and learner engagement</li>
      </ul>
    ),
  },
  {
    title: "Success Stories",
    content: (
      <div className="text-center">
        <p className="mb-4">[Insert testimonials and success metrics here]</p>
        <p className="italic">"Decentraclasses has been instrumental in expanding our reach..." - Partner A</p>
        <p className="mt-4">Average course enrollment increase: 200%</p>
        <p>Learner satisfaction rate: 95%</p>
      </div>
    ),
  },
  {
    title: "Marketing and Promotion",
    content: (
      <ul className="list-disc pl-6">
        <li>Multi-channel marketing campaigns (social media, email newsletters, webinars)</li>
        <li>Featured spots on our homepage and targeted course recommendations</li>
        <li>Collaboration on joint marketing initiatives</li>
      </ul>
    ),
  },
  {
    title: "Technical Integration",
    content: (
      <ul className="list-disc pl-6">
        <li>Easy process to upload and manage courses</li>
        <li>Comprehensive support for integrating your course materials</li>
        <li>API access for real-time updates and synchronization</li>
      </ul>
    ),
  },
  {
    title: "Next Steps",
    content: (
      <ol className="list-decimal pl-6">
        <li>Contact us to discuss the partnership in detail</li>
        <li>Schedule a demo or meeting to explore how we can work together</li>
        <li>Begin the onboarding process and start listing your courses</li>
      </ol>
    ),
  },
  {
    title: "Thank You",
    content: (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Thank you for your time and consideration</h2>
        <p className="mb-4">Partner with Decentraclasses to revolutionize Web3 education</p>
        <p>[Contact Information for Follow-up]</p>
      </div>
    ),
  },
];

const Slide = ({ title, content }: any) => (
  <div className="bg-white rounded-lg shadow-lg p-6 h-full">
    <h2 className="text-2xl font-bold mb-4">{title}</h2>
    <div className="text-lg">{content}</div>
  </div>
);

const Page = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-4/5 h-4/5 relative">
        <Slide {...slides[currentSlide]} />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
          <button onClick={prevSlide} className="bg-blue-500 text-white p-2 rounded">
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className="bg-blue-500 text-white p-2 rounded">
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
      <div className="mt-4">
        Slide {currentSlide + 1} of {slides.length}
      </div>
    </div>
  );
};

export default Page;
