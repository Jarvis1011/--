import React from 'react';
import styles from './styles/news.module.sass';
import Link from 'next/link';

export default function News({ params, data }) {
  const setDefaultImg = path => {
    return path
      ? (process.env.NEXT_PUBLIC_URL ?? '') + path
      : 'https://picsum.photos/380/180.jpg';
  };

  const FormatDesc = (text) => {
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
    return value;
  }

  return (
    <div className={styles['']}>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-12 mb-4">
            <div className={styles['search-area-mobile']}>
              <label htmlFor="search" className="d-none">請輸入關鍵字搜尋</label>
              <input
                type="text"
                className="form-control"
                placeholder="請輸入關鍵字搜尋"
                title="請輸入關鍵字搜尋"
                id="search"
              />
              <button className={styles['btn-search']} type="submit">
                <img src="/images/video/icon-search.png" alt="搜尋" />
                <span className='d-none'>搜尋</span>
              </button>
            </div>
          </div>

          {data?.rows?.map((item, index) => (
            <div className="col-md-4 col-6 mb-4 px-2" key={index}>
              <div className={styles['news-wrapper']}>
                <img src={setDefaultImg(item.ImagePath)} alt={item.ImageDesc} key={item.ID} />
                <span className={styles['type']}>{params?.Formatter?.ArticleCategoryFormatter?.find(val => val.Value === item.Category)?.Text}</span>
                <div className={styles['title']}>{item.Title}</div>
                <div className={styles['desc']} dangerouslySetInnerHTML={{ __html: item.Description }} />
                <div className="text-center">
                  <Link href={`/news/detail?id=${item.ID}`}>
                    <a className={styles['btn-main']}>詳細內容</a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
