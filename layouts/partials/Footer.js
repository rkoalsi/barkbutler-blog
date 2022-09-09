import Social from "@components/Social";
import config from "@config/config.json";
import menu from "@config/menu.json";
import social from "@config/social.json";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

const Footer = () => {
  const { copyright } = config.params;
  return (
    <footer className="bg-custom_yellow section">
      <div className="container text-center">
        {/* footer menu */}
        <ul className="mb-8 space-x-4">
          {menu.footer.map((menu) => (
            <li className="inline-block text-black" key={menu.name}>
              <Link href={menu.url} passHref>
                <a className="p-4 text-black hover:text-white">{menu.name}</a>
              </Link>
            </li>
          ))}
        </ul>
        {/* social icons */}
        <Social source={social} className="social-icons mb-8" />
        {/* copyright */}
        {markdownify(copyright, "p", "text-black")}
      </div>
    </footer>
  );
};

export default Footer;
