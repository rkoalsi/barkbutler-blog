import Logo from "@components/Logo";
import { useTheme } from "context/ThemeContext";
import Link from "next/link";
import { useEffect, useState } from "react";

const SHOP_URL =
  "https://www.amazon.in/stores/page/39059D39-A60C-4518-B0DF-23C77F797F79/?_encoding=UTF8&store_ref=SB_A014467423CL389N2X301&pd_rd_plhdr=t&aaxitk=70cb48be6d96c63361b551460c07fe28&hsa_cr_id=3845384350702&lp_asins=B08F4LLMQN%2CB08Z31LM2Z%2CB08YFDL9W1&lp_query=barkbutler&lp_slot=auto-sparkle-hsa-tetris&ref_=sbx_be_s_sparkle_lsi4d_cta&pd_rd_w=DyJRZ&pf_rd_p=47ac07ef-304a-41df-a673-0b368707e6c6&pd_rd_wg=tZyPT&pf_rd_r=AG2H277TBBWTSCSWC5EH&pd_rd_r=b0cdbc36-1811-4568-ba23-7472261551e6";

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
  </svg>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white dark:bg-gray-900 transition-all duration-300 ${
        scrolled
          ? "shadow-md dark:shadow-gray-900/80"
          : "border-b border-gray-100 dark:border-gray-800"
      }`}
    >
      <div className="container flex items-center justify-between py-3 md:py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/" passHref>
            <a className="hidden sm:inline-block text-sm font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              Blog
            </a>
          </Link>

          {/* Dark mode toggle */}
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary transition-colors bg-transparent"
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Shop button */}
          <a
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-custom_yellow text-dark text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-full hover:opacity-90 transition-opacity shadow-sm whitespace-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 flex-shrink-0"
            >
              <path d="M1 1.75A.75.75 0 011.75 1h1.628a1.75 1.75 0 011.734 1.51L5.43 3h8.82a1.75 1.75 0 011.746 1.91l-.938 6.354A1.75 1.75 0 0113.318 12.5H6.682a1.75 1.75 0 01-1.74-1.236L3.25 3.5H1.75A.75.75 0 011 2.75v-1zM6 15.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM13.5 15.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" />
            </svg>
            <span>Shop</span>
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
