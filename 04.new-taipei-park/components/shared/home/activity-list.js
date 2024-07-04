import { useState, useEffect } from 'react';
import styles from './styles/calendar.module.sass';
import moment from 'moment';
import Link from 'next/link';
import { sendPostRequest } from '../../../api/helper';

export default function ActivityList({isMobile}) {
  const [posterData, setPosterData] = useState();

  useEffect(() => {
    (async () => {
      const payload = {
        Limit: 9,
        Offset: 0,
        Culture: 1,
        Sort: "desc",
        Order: "StartDate",
      };
      const data = await sendPostRequest('/api/activity/Paging', payload);
      setPosterData(data.Data.rows);
    })();
  }, []);

  const settings = {
    arrows: false,
    dots: false,
    lazyLoad: true,
    infinite: false,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    focusOnSelect: true,

  };
  return (
    <div className={styles['poster']}>
      {posterData?.length > 0 && (
        <div className="row mt-5">
          {!isMobile 
          ? (
            posterData?.map((data, index) => (
              <div key={index} className='col-md-4 col-6 mb-4'>
                <Link href={`/activity/detail?id=${data.ID}`}>
                  <a title={"移至" + data.Title + "詳細說明"} style={{ display: "block" }}>
                    <div
                      style={{background: `url(${(process.env.NEXT_PUBLIC_URL ?? '') + (data.ImageVerticalPath === '' ? '/images/none_activity.png' : data.ImageVerticalPath)})`, }}
                      className={styles['poster-image']}
                    />
                    <span className={styles['date']}>
                      {moment(data.StartDate).format('YYYY/MM/DD')}~
                      {moment(data.EndDate).format('YYYY/MM/DD')}
                    </span>
                    <div className={styles['title']}>{data.Title}</div>
                    {data.Organizer && (
                      <span className={styles['type']}>{data.Organizer}</span>
                    )}
                  </a>
                </Link>
              </div>
            ))
          ) 
          : (
            // 手機版畫面 ( 尚未更動 )
            posterData?.map((data, index) => (
              <div key={index} className='col-lg-4 col-6 mb-4'>
                <Link href={`/activity/detail?id=${data.ID}`}>
                  <a title={"移至" + data.Title + "詳細說明"} style={{ display: "block" }}>
                    <div
                      style={{background: `url(${(process.env.NEXT_PUBLIC_URL ?? '') + (data.ImageVerticalPath === '' ? '/images/none_activity.png' : data.ImageVerticalPath)})`, }}
                      className={styles['poster-image']}
                    />
                    <span className={styles['date']}>
                      {moment(data.StartDate).format('YYYY/MM/DD')}~
                      {moment(data.EndDate).format('YYYY/MM/DD')}
                    </span>
                    <div className={styles['title']}>{data.Title}</div>
                    {data.Organizer && (
                      <span className={styles['type']}>{data.Organizer}</span>
                    )}
                  </a>
                </Link>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
