import React, { useState } from 'react';
import styles from './styles/video.module.sass';
import Popup from './popup';

const videoData = [
  {
    ImageUrl: '/images/home/video01.webp',
    Title: '新北景點 熊猴森樂園 新北大都會公園 跟著領隊玩~',
  },
  {
    ImageUrl: '/images/home/video02.webp',
    Title: '大台北地區免費溜小孩好去處！新北大都會公園．熊猴森公園',
  },
  {
    ImageUrl: '/images/home/video01.webp',
    Title:
      '【全台最大全齡共融遊戲場 | 熊猴森樂園】離捷運站走路只要2分鐘，共有31座特色溜滑梯和100組遊具',
  },
  {
    ImageUrl: '/images/home/video02.webp',
    Title: '大台北地區免費溜小孩好去處！新北大都會公園．熊猴森公園',
  },
  {
    ImageUrl: '/images/home/video02.webp',
    Title: '大台北地區免費溜小孩好去處！新北大都會公園．熊猴森公園',
  },
  {
    ImageUrl: '/images/home/video01.webp',
    Title:
      '【全台最大全齡共融遊戲場 | 熊猴森樂園】離捷運站走路只要2分鐘，共有31座特色溜滑梯和100組遊具',
  },
  {
    ImageUrl: '/images/home/video02.webp',
    Title: '大台北地區免費溜小孩好去處！新北大都會公園．熊猴森公園',
  },
  {
    ImageUrl: '/images/home/video01.webp',
    Title:
      '【全台最大全齡共融遊戲場 | 熊猴森樂園】離捷運站走路只要2分鐘，共有31座特色溜滑梯和100組遊具',
  },
  {
    ImageUrl: '/images/home/video02.webp',
    Title: '大台北地區免費溜小孩好去處！新北大都會公園．熊猴森公園',
  },
];

export default function Video({ data }) {
  const [popup, setPopup] = useState('');
  return (
    <>
      <div className="container">
        {/* <div className={styles['search-area']}>
        <img src="/images/" />
      </div> */}

        <div className="row mt-4">
          <div className="col-md-12 mb-4">
            <div className={styles['search-area-mobile']}>
              <label htmlFor="search" className="d-none">
                請輸入關鍵字搜尋
              </label>
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
            <div className="col-md-4 mb-4" key={index}>
              <a
                href="#"
                className={styles['video-wrapper']}
                onClick={() => setPopup(item)}
              >
                <div className={styles['img-wrapper']}>
                  <img
                    src="/images/home/icon-video-play.png"
                    className={styles['play-icon']}
                    alt=""
                  />
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
              </a>
            </div>
          ))}
        </div>
      </div>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}
