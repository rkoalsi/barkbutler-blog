import Social from "@components/Social";
import social from "@config/social.json";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-custom_yellow dark:bg-custom_yellow_dark transition-colors duration-300">
      <div className="container px-4 py-8 md:py-10">
        <div className="flex flex-col items-center gap-5">
          {/* Brand */}
          <div className="text-center">
            <p className="text-dark dark:text-white font-bold text-lg md:text-xl">
              BarkButler
            </p>
            <p className="text-dark/70 dark:text-white/70 text-xs md:text-sm mt-1">
              Premium pet products, delivered with love.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <a
              href="/"
              className="text-dark dark:text-white/80 text-sm font-medium hover:text-dark/60 dark:hover:text-white transition-colors"
            >
              Blog
            </a>
            <a
              href="https://www.amazon.in/stores/page/39059D39-A60C-4518-B0DF-23C77F797F79"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark dark:text-white/80 text-sm font-medium hover:text-dark/60 dark:hover:text-white transition-colors"
            >
              Shop
            </a>
            <a
              href="https://pupscribe.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark dark:text-white/80 text-sm font-medium hover:text-dark/60 dark:hover:text-white transition-colors"
            >
              Website
            </a>
          </nav>

          {/* Social Icons */}
          <Social source={social} className="social-icons" />

          {/* Divider */}
          <div className="w-full max-w-xs border-t border-dark/20 dark:border-white/20" />

          {/* Copyright */}
          <p className="text-dark/60 dark:text-white/50 text-xs text-center">
            © {currentYear} Pupscribe Enterprises Private Limited
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
