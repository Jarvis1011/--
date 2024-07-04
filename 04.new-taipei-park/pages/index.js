import Layout from '../components/layout';
import Banner from '../components/shared/home/banner';
import Map from '../components/shared/home/map';
import ForeignMap from '../components/shared/foreign/map';
import News from '../components/shared/home/news';
import Video from '../components/shared/home/video';
import Calendar from '../components/shared/home/calendar';
import { sendGetRequest } from '../api/helper';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import messages from '../data/i18n/messages';

function Home({ homeData }) {
  const router = useRouter();
  const { locale } = router;
  const [reWidth, setReWidth] = useState({ width: 460, height: 450 });
  const [isMobile, setIsMobile] = useState(false);
  const [fontSize, setFontSize] = useState('medium');

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
  return (
    <Layout setFontSizeString={setFontSize}>
      {locale === 'tw' ? (
        <>
          <Banner data={homeData.Banners} notice={homeData.Notices} isMobile={isMobile} fontSize={fontSize} />
          <a
            id="C"
            accessKey="C"
            href="#C"
            title={messages[`${locale}`].center_area}
            style={{ position: "absolute" }}
          >
            :::
          </a>
          <Map data={homeData.Parks} isMobile={isMobile} />
          <News data={homeData.Articles} isMobile={isMobile} formatter={homeData.Formatters.ArticleFormatter} />
          <Video data={homeData.Videos} isMobile={isMobile} />
          <Calendar data={homeData.Activities} isMobile={isMobile} />
        </>
      ) : (
        <>
          <div style={{ width: '100%', height: 'auto' }}>
            <img src='/images/language/home-banner.jpg' alt={messages[`${locale}`].home_banner_image} style={{ width: '100%', height: 'auto' }} ></img>
          </div>
          <a
            id="C"
            accessKey="C"
            href="#C"
            title={messages[`${locale}`].center_area}
            style={{ position: "absolute" }}
          >
            :::
          </a>
          <ForeignMap isMobile={isMobile} />
        </>
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context
  const homeData = await sendGetRequest('/api/home?culture=' + (locale === 'tw' ? locale : 'en'));
  return {
    props: {
      homeData,
    },
  };
}

export default Home;
