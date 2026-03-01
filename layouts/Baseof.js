import config from "@config/config.json";
import { useTheme } from "context/ThemeContext";
import { plainify } from "@lib/utils/textConverter";
import Footer from "@partials/Footer";
import Header from "@partials/Header";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Base = ({
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
  children,
}) => {
  const { meta_image, meta_author, meta_description } = config.metadata;
  const { base_url } = config.site;
  const router = useRouter();
  const { isDark } = useTheme();

  // Keep <html> dark class in sync with context
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const resolvedTitle = plainify(
    meta_title ? meta_title : title ? title : config.site.title
  );
  const resolvedDescription = plainify(
    description ? description : meta_description
  );
  const resolvedImage = `${base_url}${image ? image : meta_image}`;

  return (
    <>
      <Head>
        <title>{resolvedTitle}</title>
        {canonical && <link rel="canonical" href={canonical} itemProp="url" />}
        {noindex && <meta name="robots" content="noindex,nofollow" />}
        <meta name="description" content={resolvedDescription} />
        <meta name="author" content={meta_author} />
        <meta property="og:title" content={resolvedTitle} />
        <meta property="og:description" content={resolvedDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${base_url}/${router.asPath.replace("/", "")}`} />
        <meta property="og:image" content={resolvedImage} />
        <meta name="twitter:title" content={resolvedTitle} />
        <meta name="twitter:description" content={resolvedDescription} />
        <meta name="twitter:image" content={resolvedImage} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 overflow-x-hidden transition-colors duration-300">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Base;
