import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useStoredContext } from "../contextApi/ContextApi";
import { FaLink } from "react-icons/fa";
import { IoMdAnalytics } from "react-icons/io";

const ShortLinkSection = () => {
  const { token } = useStoredContext();
  const navigate = useNavigate();

  const [longUrl, setLongUrl] = useState("");

  const isValidUrl = (value) => {
    if (!value || typeof value !== "string") return false;
    try {
      const u = new URL(value);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch (err) {
      return false;
    }
  };

  const handleGetLink = (e) => {
    e?.preventDefault?.();

    if (token) {
      navigate("/dashboard");
      return;
    }

  
    if (!longUrl.trim()) {
      toast.error("Please paste a URL.");
      return;
    }

    if (!isValidUrl(longUrl.trim())) {
      toast.error("Please enter a valid URL.");
      return;
    }

    navigate("/login");
  };

  return (
    <section className="w-full mb-20">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-4">
          <h3 className="text-orange-500 text-lg sm:text-xl md:text-2xl font-semibold">
            Create a short link
          </h3>
        </div>

        <div className="relative bg-[#fffdf8] rounded-[48px] border border-neutral-800 p-6 sm:p-10 lg:p-14 overflow-hidden shadow-[0_20px_50px_rgba(2,10,20,0.18)]">
          <div className="absolute -left-10 -top-10 w-40 h-40 rounded-[50%]" />
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-[40%] bg-gradient-to-br from-[#fffdf8] to-[#fff7f0] opacity-20 blur-[24px]" />

          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="flex-1">
              <h2 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-extrabold text-black">
                Shorten a long link
              </h2>
              <p className="mt-2 text-neutral-600">
                No credit card required. Create short links — fast and reliable.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="mt-6">
                <label className="block text-sm font-medium text-[#0b2b34] mb-2">
                  Paste your long link here
                </label>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <input
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    type="url"
                    placeholder="https://example.com/my-long-url"
                    className="flex-1 rounded-full border border-neutral-200 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                    aria-label="Long URL"
                  />

                  <button
                    type="button"
                    onClick={handleGetLink}
                    className="w-full sm:w-auto flex justify-center items-center gap-3 rounded-full px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-700 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition duration-150"
                  >
                    <span>Get your link for free</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <aside className="w-full sm:w-80">
              <div className="rounded-2xl p-4 bg-white/60 backdrop-blur-sm border border-neutral-200 shadow-md">
                <h4 className="text-lg font-semibold text-[#042233]">Quick perks</h4>
                <p className="mt-2 text-sm text-neutral-600">
                  Everything designed to make sharing safer and easier.
                </p>

                <ul className="mt-4 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-orange-700 ring-1 ring-neutral-800 shadow-sm">
                      <FaLink/>
                      {/* icon */}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-[#022732]">Quick Shortening</div>
                      <div className="text-xs text-neutral-500">Shorten links with one click.</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-orange-700 ring-1 ring-neutral-800 shadow-sm">
                      <IoMdAnalytics/>
                      {/* icon */}
                    </span>
                    <div>
                      <div className="text-sm font-medium text-[#022732]">Analytics</div>
                      <div className="text-xs text-neutral-500">Track performance.</div>
                    </div>
                  </li>
                </ul>
                
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortLinkSection;
