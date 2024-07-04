import React from 'react';
import styles from './styles/news.module.sass';
import Slider from 'react-slick';
import Link from 'next/link';

export default function News({ data, isMobile, formatter }) {
  const settings = {
    arrows: false,
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
  const FormatTitle = (text) => {
    let newText = ''
    let originText = text.split('')
    originText.forEach((T, index) => {
      if (T == '-') {
        newText += '- '
      } else {
        newText += T
      }
    })
    return newText
  }

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

  // 處理手機資料過多
  if (data?.length > 15 && isMobile) {
    data = data.slice(0, 15)
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
            <button className={styles['btn-main']} title="移至更多最新消息">更多最新消息</button>
          </Link>
        </div>
      </div>

      <div className="banner-news">
        {data?.length > 0 && (
          <Slider {...settings}>
            {data?.map((item, index) => (
              <div className={styles['news-wrapper']} key={`banner-news-${index}`}>
                {item.ImagePath !== '' ?
                  <img src={(process.env.NEXT_PUBLIC_URL ?? '') + item.ImagePath} alt={item.ImageAlt} key={item.ID} /> :
                  <img src='/images/default_horizontal.jpg' alt='' key={item.ID} />
                }
                <span className={styles['type']}>{formatter?.find(val => val.Key === item.Category)?.Value}</span>
                <div className={styles['title']}>{FormatTitle(item.Title)}</div>
                <div className={styles['desc']} dangerouslySetInnerHTML={{ __html: FormatDesc(item.Description) }} />
                <div className="text-center">
                  <Link href={`/news/detail?id=${item.ID}`}>
                    <a className={styles['btn-main']} title={"移至" + item.Title + "詳細內容"}>詳細內容</a>
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
