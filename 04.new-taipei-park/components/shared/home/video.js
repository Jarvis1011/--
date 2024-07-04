import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/video.module.sass';
import Slider from 'react-slick';
import Link from 'next/link';
import Popup from '../video/popup';

export default function Video({ data }) {
  const settings = {
    arrows: true,
    dots: false,
    lazyLoad: true,
    infinite: data?.length > 3 ? true : false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '2%',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '50px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: false,
          centerPadding: '50px',
        },
      },
    ],
  };

  const [popup, setPopup] = useState('');
  const [activeElement, setActiveElement] = useState(null);

  useEffect(() => {
    if (popup === '') {
      document.body.style.overflow = 'unset';
      if (activeElement) {
        activeElement.focus();
      }
    }
    else {
      document.body.style.overflow = 'hidden';
      setActiveElement(document.activeElement);
      document.activeElement.blur();
      var icons = document.getElementsByClassName("play_button");
      if (icons && icons.length > 0) {
        icons[icons.length - 1].focus();
      }
    }
  }, [popup]);

  return (
    <>
      <div className={styles['home-video']}>
        <div className="container">
          <div className={styles['cover']}>
            <div className={styles['title']}>影音專區</div>
            <div className={styles['sub']}>
              <hr />
              <span>提供新北大都會公園相關影音訊息</span>
            </div>
            <Link href="/video">
              <button className={styles['btn-main']} title="移至更多影音資訊">更多影音資訊</button>
            </Link>
          </div>
        </div>

        <div className="banner-news">
          {data?.length > 0 && (
            <Slider {...settings}>
              {data?.map((item, index) => (
                <div className={styles['video-wrapper']} key={`${index}`}>
                  <div className={styles['img-wrapper']}>
                    <button
                      onClick={() => setPopup(item)}
                      className={styles['play-icon'] + " play_button"}
                      title={item.Title + "(開啟懸浮視窗)"}
                    >
                      <img src="/images/home/icon-video-play.png" alt="播放" />
                      <span className="d-none">播放</span>
                    </button>
                    <img
                      src={`https://img.youtube.com/vi/${
                        item.LinkUrl.split('be/')[1]
                      }/hqdefault.jpg`}
                      alt={item.Title}
                      key={item.ID}
                      width="100%"
                    />
                  </div>
                  <div className={styles['title']}>
                    <div className={styles['inside']}>{item.Title}</div>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}
