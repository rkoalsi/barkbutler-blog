import Logo from "@components/Logo";
import menu from "@config/menu.json";
import SearchModal from "@layouts/partials/SearchModal";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = () => {
  // states declaration
  const [navFixed, setNavFixed] = useState(false);
  useEffect(() => {
    const changeNavbarBackground = () => {
      if (window.pageYOffset >= 1) {
        setNavFixed(true);
      } else {
        setNavFixed(false);
      }
    };
    window.addEventListener("scroll", changeNavbarBackground);
  });

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-blue-300 py-2 transition-all ${
          navFixed ? "shadow" : "pt-8 md:pt-16"
        }`}
      >
        <nav className="navbar container">
          {/* logo */}
          <div className="order-0">
            <Logo />
          </div>
          <div className="order-1 ml-auto md:order-2 md:ml-0">
            <div
              className="cursor-pointer p-2 text-xl text-dark hover:text-primary"
              onClick={() => {
                window.location.href = `https://www.amazon.in/stores/page/39059D39-A60C-4518-B0DF-23C77F797F79/?_encoding=UTF8&store_ref=SB_A014467423CL389N2X301&pd_rd_plhdr=t&aaxitk=70cb48be6d96c63361b551460c07fe28&hsa_cr_id=3845384350702&lp_asins=B08F4LLMQN%2CB08Z31LM2Z%2CB08YFDL9W1&lp_query=barkbutler&lp_slot=auto-sparkle-hsa-tetris&ref_=sbx_be_s_sparkle_lsi4d_cta&pd_rd_w=DyJRZ&pf_rd_p=47ac07ef-304a-41df-a673-0b368707e6c6&pd_rd_wg=tZyPT&pf_rd_r=AG2H277TBBWTSCSWC5EH&pd_rd_r=b0cdbc36-1811-4568-ba23-7472261551e6`;
              }}
            >
              Shop
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
