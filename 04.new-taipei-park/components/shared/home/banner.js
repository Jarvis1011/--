import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import styles from './styles/banner.module.sass';
import Link from 'next/link';

const bannerData = [{ ImageUrl: '/images/home/banner.webp' }];

const settings = {
  arrows: true,
  dots: false,
  lazyLoad: true,
  infinite: true,
  speed: 1250,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 4000,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
};

const verticalSettings = {
  arrows: false,
  dots: false,
  lazyLoad: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  vertical: true,
  autoplay: true,
  autoplaySpeed: 1500,
};

export default function Banner({ data, notice, isMobile, fontSize }) {
  const marqueeEl = useRef();
  const carouselEl = useRef();

  // useEffect(() => {
  //   var dots = document.querySelectorAll(".slick-dots button");
  //   if (dots && dots.length > 0) {
  //     for (var i = 0; i < dots.length; i++) {
  //       dots[i].setAttribute("title", "切換輪播圖");
  //     }
  //   }
  // }, []);

  useEffect(() => {
    let pushNotices = notice;
    pushNotices.map((item) => {
      notice.push(item);
    });
  }, [fontSize]);

  const judgeLinks = (url, title) => {
    if (!url) return <a>{title}</a>;
    if (url.includes('http')) {
      return (
        <a href={url} target="_blank" rel="noopener noreferrer" title={"移至" + title + "(開啟新視窗)"}>
          {title}
        </a>
      );
    } else {
      return (
        <Link href={url}>
          <a title={"移至" + title}>{title}</a>
        </Link>
      );
    }
  };

  return (
    <div className="container">
      <div className={styles['banner-wrapper']}>
        <div className={`${styles['control_box']} ${styles['z5']}`}>
          <button onClick={() => carouselEl.current.slickPlay()} title="播放輪播圖">
            <img src="/images/slick/slider-icon-play.png" alt="播放" />
          </button>
          <button onClick={() => carouselEl.current.slickPause()} title="停止輪播圖">
            <img src="/images/slick/slider-icon-pause.png" alt="停止" />
          </button>
        </div>
        {bannerData.length > 0 && (
          <Slider ref={carouselEl} {...settings}>
            {data?.map((item, index) => (
              <a
                key={index}
                href={item.LinkUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={"移至" + item.Title + "(開啟新視窗)"}
              >
                <div
                  style={{
                    background: `url(${(process.env.NEXT_PUBLIC_URL ?? '') + item.ImagePathH
                      }) no-repeat center center`,
                  }}
                  className={styles['banner-image']}
                />
                <span className="d-none">{item.Title}</span>
              </a>
            ))}
          </Slider>
        )}

        <div className={styles['marquee-wrapper']}>
          {notice.length > 0 && (
            <Slider {...verticalSettings} ref={marqueeEl}>
              {notice?.map((data, index) => {
                const { LinkUrl, Title } = data;
                return <span key={index}>{judgeLinks(LinkUrl, Title)}</span>;
              })}
            </Slider>
          )}
          {/* <div className={styles['control_box']}>
            <button onClick={() => marqueeEl.current.slickPlay()}>
              <img src="/images/slick/slider-icon-play.png" alt={massage[`${locale}`].play} />
            </button>
            <button onClick={() => marqueeEl.current.slickPause()}>
              <img src="/images/slick/slider-icon-pause.png" alt={massage[`${locale}`].stop} />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <a
      href="#!"
      title="上一張輪播圖"
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'scale(1, 1) translate(50px, -20px)',
        width: '50px',
        height: 'auto',
        zIndex: 5,
      }}
      onClick={onClick}
    >
      <img src="/images/home/slider-arrow-prev.png" alt="上一張" />
    </a>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <a
      href="#!"
      title="上一張輪播圖"
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'scale(-1, 1) translate(50px, -20px)',
        width: '50px',
        height: 'auto',
      }}
      onClick={onClick}
    >
      <img src="/images/home/slider-arrow-prev.png" alt="下一張" />
    </a>
  );
}