import config from "@config/config.json";
import theme from "@config/theme.json";
import { JsonContext } from "context/state";
import { ThemeProvider } from "context/ThemeContext";
import Head from "next/head";
import { useEffect, useState } from "react";
import TagManager from "react-gtm-module";
import "styles/style.scss";

const App = ({ Component, pageProps }) => {
  const pf = theme.fonts.font_family.primary;
  const sf = theme.fonts.font_family.secondary;
  const [fontcss, setFontcss] = useState();
  useEffect(() => {
    fetch(
      `https://fonts.googleapis.com/css2?family=${pf}${
        sf ? "&family=" + sf : ""
      }&display=swap`
    ).then((res) => res.text().then((css) => setFontcss(css)));
  }, [pf, sf]);

  const tagManagerArgs = { gtmId: config.params.tag_manager_id };
  useEffect(() => {
    setTimeout(() => {
      config.params.tag_manager_id && TagManager.initialize(tagManagerArgs);
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider>
      <JsonContext>
        <Head>
          {/* Prevent dark mode flash: runs synchronously before paint */}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(){var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}})();`,
            }}
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
          <style dangerouslySetInnerHTML={{ __html: `${fontcss}` }} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </Head>
        <Component {...pageProps} />
      </JsonContext>
    </ThemeProvider>
  );
};

export default App;
