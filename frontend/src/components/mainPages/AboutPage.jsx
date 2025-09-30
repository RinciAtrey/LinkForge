import React, { useEffect, useState } from "react";

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
    text: "Performance",
    description: "See both overall account trends and granular per-link performance so you know what content drives engagement."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
      </svg>
    ),
    text: "Analytics & Click Tracking",
    description: "Get detailed click analytics — total clicks plus precise daily breakdowns so you can measure impact over time."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
    text: "Link Management",
    description: "Manage your links in a clean, organized dashboard with LinkForge."
  }
];

const AboutPage = () => {
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const getCols = () => {
      if (typeof window === "undefined") return 1;
      const w = window.innerWidth;
      if (w >= 1024) return 3;
      if (w >= 640) return 2;
      return 1;
    };
    const update = () => setCols(getCols());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const firstRow = features.slice(0, cols);
  const rest = features.slice(cols);

  return (
     <div className="relative pt-4 pb-9 min-h-[640px] sm:px-8">
      <div className="text-center">
        <span></span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide ">
          Easily build{" "}
          <span className="bg-gradient-to-r from-orange-500 to-orange-800 text-transparent bg-clip-text">
            your short links
          </span>
        </h2>
      </div>

      <div className="mt-10 lg:mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {firstRow.map((feature, index) => (
            <div key={index} className="px-3 mb-6">
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

        {rest.length > 0 && (
          <div className="mt-6">
            <div className="hidden lg:block">
              <div className="w-full px-3">
                <div className="flex justify-between gap-6">
                  {rest.map((feature, idx) => (
                    <div key={idx} className="w-1/3">
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
            </div>

            <div className="block lg:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {rest.map((feature, index) => (
                  <div key={index} className="px-3 mb-6">
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
          </div>
        )}
      </div>
    </div>
  );
}
export default AboutPage;
