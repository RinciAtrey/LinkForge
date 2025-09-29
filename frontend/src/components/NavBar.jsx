import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStoredContext } from "../contextApi/ContextApi";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const toggleNavbar = () => setMobileDrawerOpen((s) => !s);

  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { token, setToken } = useStoredContext();

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  const linkClass = (to) =>
    `transition-all duration-150 ${
      path === to ? "text-white font-semibold" : "text-neutral-300"
    }`;

  
  const scrollElementIntoViewWithOffset = (id) => {
    const el = document.getElementById(id);
    if (!el) return false;
    const nav = document.querySelector("nav");
    const navHeight = nav ? nav.getBoundingClientRect().height : 0;
    const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 8; 
    window.scrollTo({ top, behavior: "smooth" });
    return true;
  };

  
  const goToSection = (id) => {
    if (path === "/") {
      
      if (!scrollElementIntoViewWithOffset(id)) {
        setTimeout(() => scrollElementIntoViewWithOffset(id), 60);
      }
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
    setMobileDrawerOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 py-3 backdrop-blur-lg border-b border-neutral-700/80">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="h-10 w-10 mr-2" src="" alt="Logo" />
            <span className="text-xl tracking-tight">LinkForge</span>
          </div>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex ml-14 space-x-12 items-center">
            <li>
              <button onClick={() => goToSection("home")} className={linkClass("/")}>
                Home
              </button>
            </li>
            <li>
              <button onClick={() => goToSection("about")} className={linkClass("/about")}>
                About
              </button>
            </li>
            <li>
              <button onClick={() => goToSection("services")} className={linkClass("/services")}>
                Try LinkForge
              </button>
            </li>

            {token && (
              <li>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  Dashboard
                </Link>
              </li>
            )}
          </ul>

          
          <div className="hidden lg:flex justify-center space-x-12 items-center">
            {!token ? (
              <>
                <Link to="/login" className="py-2 px-3 border rounded-md">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-orange-500 to-orange-800 py-2 px-3 rounded-md"
                >
                  Create an account
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={onLogOutHandler}
                  className="py-2 px-3 border rounded-md"
                >
                  Log Out
                </button>
              </>
            )}
          </div>
         
          <div className="lg:hidden md:flex flex-col justify-end">
            <button onClick={() => setMobileDrawerOpen((s) => !s)} aria-label="Toggle menu">
              {mobileDrawerOpen ? <RxCross2 className="text-xl" /> : <IoIosMenu className="text-xl" />}
            </button>
          </div>
        </div>

        
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-12 flex flex-col justify-center items-center lg:hidden">
            <ul className="flex flex-col items-center space-y-6 mb-8 w-full">
              <li>
                <button onClick={() => goToSection("home")} className={linkClass("/")}>
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => goToSection("about")} className={linkClass("/about")}>
                  About
                </button>
              </li>
              <li>
                <button onClick={() => goToSection("services")} className={linkClass("/services")}>
                  Try LinkForge
                </button>
              </li>

              {token ? (
                <li>
                  <Link to="/dashboard" onClick={() => setMobileDrawerOpen(false)} className={linkClass("/dashboard")}>
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>

            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center">
              {!token ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="py-2 px-3 border rounded-md"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileDrawerOpen(false)}
                    className="py-2 px-3 rounded-md bg-gradient-to-r from-orange-500 to-orange-800"
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    onLogOutHandler();
                  }}
                  className="py-2 px-3 border rounded-md"
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
