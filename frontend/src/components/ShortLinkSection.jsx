
const ShortLinkSection = () => {
  return (
    <section className="w-full py-16">
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
                    type="url"
                    placeholder="https://example.com/my-long-url"
                    className="flex-1 rounded-full border border-neutral-200 bg-white px-4 py-3 text-neutral-800 placeholder:text-neutral-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full sm:w-auto flex justify-center items-center gap-3 rounded-full px-5 py-3 bg-gradient-to-r from-orange-500 to-orange-800 text-white font-semibold shadow-lg hover:scale-[1.02] transform transition duration-150"
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
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-medium text-[#022732]">Custom alias</div>
                      <div className="text-xs text-neutral-500">Use branded slugs for campaigns.</div>
                    </div>
                  </li>

                  <li className="flex items-start gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-neutral-900 text-orange-700 ring-1 ring-neutral-800 shadow-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
                      </svg>
                    </span>
                    <div>
                      <div className="text-sm font-medium text-[#022732]">Analytics</div>
                      <div className="text-xs text-neutral-500">Clicks, geo, referrers and devices.</div>
                    </div>
                  </li>
                </ul>

                <div className="mt-5">
                  <a href="#features" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-600 hover:underline">
                    Explore all features
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShortLinkSection;


