
// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { IoIosMenu } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { useStoredContext } from "../contextApi/ContextApi";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const { token, setToken } = useStoredContext();
//   const path = useLocation().pathname;
//   const [navbarOpen, setNavbarOpen] = useState(false);

//   const onLogOutHandler = () => {
//     setToken(null);
//     localStorage.removeItem("JWT_TOKEN");
//     navigate("/login");
//   };

//   return (
//     <div className="h-16 bg-custom-gradient  z-50 flex items-center sticky top-0 ">
//       <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between">
//         <Link to="/">
//           <h1 className="font-bold text-3xl text-white italic sm:mt-0 mt-2">
//             Link Forge
//           </h1>
//         </Link>
//         <ul
//           className={`flex sm:gap-10 gap-4 sm:items-center sm:mt-1 sm:pt-0 pt-3 text-slate-800 sm:static absolute left-0 top-[62px] sm:shadow-none shadow-md ${
//             navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
//           }  transition-all duration-100 sm:h-fit sm:bg-none  bg-custom-gradient sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
//         >
//           <li className="hover:text-btnColor font-[500]  transition-all duration-150">
//             <Link
//               className={`${
//                 path === "/" ? "text-white font-semibold" : "text-gray-200"
//               }`}
//               to="/"
//             >
//               Home
//             </Link>
//           </li>
//           <li className="hover:text-btnColor font-[500]  transition-all duration-150">
//             <Link
//               className={`${
//                 path === "/about" ? "text-white font-semibold" : "text-gray-200"
//               }`}
//               to="/about"
//             >
//               About
//             </Link>
//           </li>
//           {token && (
//             <li className="hover:text-btnColor font-[500]  transition-all duration-150">
//             <Link
//               className={`${
//                 path === "/dashboard" ? "text-white font-semibold" : "text-gray-200"
//               }`}
//               to="/dashboard"
//             >
//               Dashboard
//             </Link>
//           </li>
//           )}
//           {!token && (
//             <Link to="/register">
//               <li className=" sm:ml-0 -ml-1 bg-rose-700 text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150">
//                 SignUp
//               </li>
//             </Link>
//             )}

//           {token && (
//             <button
//              onClick={onLogOutHandler}
//              className="sm:ml-0 -ml-1 bg-rose-700 text-white  cursor-pointer w-24 text-center font-semibold px-2 py-2 rounded-md  hover:text-slate-300   transition-all duration-150">
//               LogOut
//             </button>
//             )}
//         </ul>
//         <button
//           onClick={() => setNavbarOpen(!navbarOpen)}
//           className="sm:hidden flex items-center sm:mt-0 mt-2"
//         >
//           {navbarOpen ? (
//             <RxCross2 className="text-white text-3xl" />
//           ) : (
//             <IoIosMenu className="text-white text-3xl" />
//           )}
//         </button>
//       </div>
//     </div>
//   );



// };

// export default Navbar;




import { IoIosMenu } from "react-icons/io";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src="" alt="Logo" />
            <span className="text-xl tracking-tight">LinkForge</span>
          </div>
         <ul  className="hidden lg:flex ml-14 space-x-12">
      <li><a href="/">Home</a></li>
       <li><a href="/about">About</a></li>
       <li><a href="/services">Try LinkForge 
       </a>
       </li>
      </ul>
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            <a href="#" className="py-2 px-3 border rounded-md">
              Sign In
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
            >
              Create an account
            </a>
          </div>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={toggleNavbar}>
              {mobileDrawerOpen ? <RxCross2 /> : <IoIosMenu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
          <ul  className="hidden lg:flex ml-14 space-x-12">
       <li><a href="/home">Home</a></li>
       <li><a href="/about">About</a></li>
       <li><a href="/services">Try LinkForge</a></li>
       </ul>
            <div className="flex space-x-6">
              <a href="#" className="py-2 px-3 border rounded-md">
                Sign In
              </a>
              <a
                href="#"
                className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
              >
                Create an account
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


