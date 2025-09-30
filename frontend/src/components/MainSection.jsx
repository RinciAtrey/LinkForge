

import video1 from "../assets/video1.mp4"
const MainSection = () => {
  return (
    <div className="flex flex-col items-center pt-5 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
       LinkForge
        <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
          {" "}
          Track your links
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Create clean, shareable short links and see exactly how they perform. LinkForge gives you instant shortening and click breakdowns to grow your traffic.
      </p>
      <div className="flex justify-center my-10">
        <a
          href="/register"
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
        >
          Start for free
        </a>
        <a href="/login" className="py-3 px-4 mx-3 rounded-md border">
          Track performance
        </a>
      </div>
      <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default MainSection;
