
// import React from "react";
// import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";
// const AboutPage = () => {
//   return (
//     <div className="lg:px-14 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-2">
//       <div className="bg-white w-full sm:py-10 py-8  ">
//         <h1 className="sm:text-4xl text-slate-800 text-3xl font-bold italic  mb-3">
//           About LinkForge
//         </h1>
//         <p className="text-gray-700 text-sm  mb-8 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
//           LinkForge simplifies URL shortening for efficient sharing. Easily
//           generate, manage, and track your shortened links. Linklytics simplifies
//           URL shortening for efficient sharing. Easily generate, manage, and
//           track your shortened links. Linklytics simplifies URL shortening for
//           efficient sharing. Easily generate, manage, and track your shortened
//           links. Linklytics simplifies URL shortening for efficient sharing.
//           Easily generate, manage, and track your shortened links.
//         </p>
//         <div className="space-y-5 xl:w-[60%] lg:w-[70%] sm:w-[80%] w-full ">
//           <div className="flex items-start">
//             <FaLink className="text-blue-500 text-3xl mr-4" />
//             <div>
//               <h2 className="sm:text-2xl font-bold text-slate-800">
//                 Simple URL Shortening
//               </h2>
//               <p className="text-gray-600">
//                 Experience the ease of creating short, memorable URLs in just a
//                 few clicks. Our intuitive interface and quick setup process
//                 ensure you can start shortening URLs without any hassle.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start">
//             <FaShareAlt className="text-green-500 text-3xl mr-4" />
//             <div>
//               <h2 className="sm:text-2xl font-bold text-slate-800">
//                 Powerful Analytics
//               </h2>
//               <p className="text-gray-600">
//                 Gain insights into your link performance with our comprehensive
//                 analytics dashboard. Track clicks, geographical data, and
//                 referral sources to optimize your marketing strategies.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start">
//             <FaEdit className="text-purple-500 text-3xl mr-4" />
//             <div>
//               <h2 className="sm:text-2xl font-bold text-slate-800">
//                 Enhanced Security
//               </h2>
//               <p className="text-gray-600">
//                 Rest assured with our robust security measures. All shortened
//                 URLs are protected with advanced encryption, ensuring your data
//                 remains safe and secure.
//               </p>
//             </div>
//           </div>
//           <div className="flex items-start">
//             <FaChartLine className="text-red-500 text-3xl mr-4" />
//             <div>
//               <h2 className="sm:text-2xl font-bold text-slate-800">
//                 Fast and Reliable
//               </h2>
//               <p className="text-gray-600">
//                 Enjoy lightning-fast redirects and high uptime with our reliable
//                 infrastructure. Your shortened URLs will always be available and
//                 responsive, ensuring a seamless experience for your users.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;


const features = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
      </svg>
    ),
    text: "Instant Shortening",
    description: "Shorten any long URL in one click — get a clean, shareable link instantly and copy it to clipboard."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-1.414 1.414a4 4 0 01-5.656-5.656l.707-.707" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.172 13.828a4 4 0 010-5.656l1.414-1.414a4 4 0 015.656 5.656l-.707.707" />
      </svg>
    ),
    text: "Custom Aliases",
    description: "Create human-readable aliases (example.com/cool-deal) or reserve branded slugs for marketing."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
      </svg>
    ),
    text: "Analytics & Click Tracking",
    description: "See total clicks, referrers, geolocation and device stats to measure link performance."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
    text: "Link Management",
    description: "Organize links into folders, tag them, bulk-edit, and restore previously deleted short links."
  }
];

const AboutPage = () => {
  return (
    <div className="relative mt-20 min-h-[640px] px-4 sm:px-8">
      <div className="text-center">
        <span className="bg-neutral-900 text-orange-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          Features
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
          Easily build{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            your short links
          </span>
        </h2>
      </div>

      <div className="flex flex-wrap mt-10 lg:mt-20 -mx-3">
        {features.map((feature, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-3 mb-6">
            <div className="flex p-6 rounded-2xl bg-neutral-900/5 group hover:bg-neutral-900/10 hover:shadow-xl transform hover:-translate-y-1 transition duration-200 ease-out">
              <div className="flex mx-6 h-10 w-10 p-2 bg-neutral-900 text-orange-700 justify-center items-center rounded-full ring-1 ring-neutral-800 group-hover:ring-orange-500 shadow-sm transition-all duration-200">
                {feature.icon}
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl font-semibold transition-colors duration-200 group-hover:text-orange-400">
                  {feature.text}
                </h5>
                <p className="text-md p-0 mb-6 text-neutral-500 max-w-sm leading-relaxed opacity-95">
                  {feature.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AboutPage;


