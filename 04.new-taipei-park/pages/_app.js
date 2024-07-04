import Head from 'next/head';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import messages from '../data/i18n/messages';
import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.sass';
import '../styles/slick.min.css';
import '../styles/slick-theme.css';
import '../styles/datepicker.css';

function App({ Component, pageProps }) {
  const router = useRouter();
  const { locale } = router;
  const [reWidth, setReWidth] = useState({ width: 460, height: 450 });
  const [isMobile, setIsMobile] = useState(false);
  const [pageTitle, setPageTitle] = useState('');

  if (process.env.NODE_ENV === 'production') {
    console.log = console.warn = console.error = () => { };
  }

  useEffect(() => {
    const handlerResize = () => {
      // if (window.innerWidth <= 500 && reWidth.width === 460) {
      //   setReWidth({ width: 338, height: 400 });
      // } else if (window.innerWidth >= 550) {
      //   setReWidth({ width: 460, height: 450 });
      // }

      if (window.innerWidth < 768) {
        setIsMobile(true);
      } else if (window.innerWidth > 767) {
        setIsMobile(false);
      }
    };
    handlerResize();
    window.addEventListener('resize', handlerResize);
    return () => {
      window.removeEventListener('resize', handlerResize);
    };
  }, []);

  pageProps = { ...pageProps, isMobile, setPageTitle }

  return (
    <>
      <Head>
        <title>
          {locale === 'tw'
            ? '新北大都會公園'
            : 'New Taipei Metropolitan Park'}
          {pageTitle ? `-${pageTitle}` : ''}
        </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="minimum-scale=0.8,initial-scale=0.8" />
        <meta property="keywords" content="" />
        <meta property="title" content="" />
        <meta property="description" content="" />

        <meta property="og:keywords" content="" />
        <meta property="og:title" content="新北市大都會公園" />
        <meta property="og:url" content="" />
        <meta property="og:image" content="/images/favicon.png" />
        <meta property="og:description" content="" />
        <meta property="article:tag" content="新北市大都會公園" />
        <link href="/images/favicon.png" rel="shortcut icon" type="image/x-icon" />
      </Head>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale="zh-Hant"
        onError={() => { }}
      >
        <Component {...pageProps} />
      </IntlProvider>
    </>
  );
}

export default App;
