import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#FFEDD5]/10 to-[#FFF7ED]/5 text-neutral-200 py-8 z-40 relative border-t border-neutral-800">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:justify-between items-center gap-6">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl font-bold mb-1 text-white">LinkForge</h2>
          <p className="text-sm text-neutral-400">
            Simplifying URL shortening for efficient sharing
          </p>
        </div>

        <div className="flex flex-col items-center">
          <p className="text-sm text-neutral-400 mb-2">
            &copy; 2025 LinkForge. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-2">
            <a
              href="https://github.com/RinciAtrey/LinkForge"
              className="p-2 rounded-md bg-neutral-800/40 hover:bg-orange-600 transition-colors"
              aria-label="Instagram"
            >
              <FaGithub size={18} className="text-white" />
            </a>
            <a
              href="http://www.linkedin.com/in/rinci-atrey-dev018"
              className="p-2 rounded-md bg-neutral-800/40 hover:bg-orange-600 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin size={18} className="text-white" />
            </a>
          </div>
        </div>

        <div className="text-center lg:text-right">
          <p className="text-sm text-neutral-400">
            Built with care • Privacy friendly • Lightweight
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
