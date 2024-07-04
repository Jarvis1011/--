import React from 'react';
import styles from './styles/news.module.sass';
import Slider from 'react-slick';
import Link from 'next/link';

export default function News({ data }) {
  const settings = {
    arrows: true,
    dots: false,
    lazyLoad: true,
    infinite: data?.length > 2 ? true : false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '250px',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '50px',
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '50px',
        },
      },
    ],
  };

  const FormatDesc = (text)=> {
    let newText = ''
    let originText = text.split('\r\n')
    let textLenght = originText.length
    let value = text;

    while (value.indexOf('<') !== -1) {
      let count = 0;
      let tagStart = value.indexOf('<');
      let tagEnd = value.indexOf('>') + 1;
      value = value.slice(0, tagStart) + value.slice(tagEnd);
      count++;
      if (count > 10) {
        break;
      }
    }
    // value = value?.replaceAll('&nbsp;', '');
    // value = value?.replaceAll('：', '：&nbsp;');
    // value = value?.replaceAll('　　', '');
    // value = value?.replaceAll('\r\n\r\n\r\n', '<br/>');

    return value;
    // originText.forEach((data, index) => {
    //   if ((index == textLenght) && (data == '')) {
        
    //   } else if ((data == '')) {
    //     newText += '</br>'
    //   } else {
    //     newText += data
    //   }
    // });

    // if (newText.slice(-5, ) == '</br>') {
    //   newText = newText.slice(0, -5)
    // }

    // return newText
  }

  return (
    <div className={styles['home-news']}>
      <div className="container">
        <div className={styles['cover']}>
          <div className={styles['title']}>最新消息</div>
          <div className={styles['sub']}>
            <hr />
            <span>提供四大園區最新消息及即時公布欄訊息</span>
          </div>
          <Link href="/news">
            <button className={styles['btn-main']}>更多最新消息</button>
          </Link>
        </div>
      </div>

      <div className="banner-news">
        {data?.length > 0 && (
          <Slider {...settings}>
            {data?.map((item, index) => (
              <div className={styles['news-wrapper']} key={`banner-news-${index}`}>
                {item.ImagePath && (
                  <img src={(process.env.NEXT_PUBLIC_URL ?? '') + item.ImagePath} alt={item.ImageAlt} key={item.ID} width="100%" />
                )}
                <span className={styles['type']}>資訊公告</span>
                <div className={styles['title']}>{item.Title}</div>
                <div className={styles['desc']} dangerouslySetInnerHTML={{ __html: item.Description }} />
                <div className="text-center">
                  <Link href={`/news/detail?id=${item.ID}`}>
                    <a className={styles['btn-main']}>詳細內容</a>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </div>
  );
}
