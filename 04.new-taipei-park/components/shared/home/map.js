import React from 'react';
import styles from './styles/map.module.sass';
import Link from 'next/link';

export default function Map({ data, isMobile }) {
  const park1 = data?.find((item) => item.Sequence === 1);
  const park2 = data?.find((item) => item.Sequence === 2);
  const park3 = data?.find((item) => item.Sequence === 3);
  const park4 = data?.find((item) => item.Sequence === 4);

  return (
    <div className="container">
      <div className={styles['home-map']}>
        <img src="/images/mobile/mobile-main-bg-obj-01.png" className={styles['mobile-deco01']} alt="" />
        <img src="/images/mobile/mobile-main-bg-obj-02.png" className={styles['mobile-deco02']} alt="" />
        <img src="/images/mobile/mobile-main-bg-obj-03.png" className={styles['mobile-deco03']} alt="" />

        <div className={styles['content01']}>
          <div className={styles['title']}>{park1?.Name}</div>
          <div className={styles['wrapper']}>
            {!isMobile 
            ? (park1?.Description?.substr(0, 95) + ' ....') // 網頁內容
            : (park1?.Description)                          // 手機內容
            }
            <Link href={'/about/detail?id=' + park1?.ID}>
              <a className={styles['btn-main']} title={"移至" + park1?.Name + "介紹"}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img src="/images/home/map-park-obj-01.png" className={styles['deco01']} alt="" />

        <div className={styles['content02']}>
          <div className={styles['title']}>{park2?.Name}</div>
          <div className={styles['wrapper']}>
            {!isMobile 
            ? (park2?.Description?.substr(0, 95) + ' ....') // 網頁內容
            : (park2?.Description)                          // 手機內容
            }
            <Link href={'/about/detail?id=' + park2?.ID}>
              <a className={styles['btn-main']} title={"移至" + park2?.Name + "介紹"}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img src="/images/home/map-park-obj-02.png" className={styles['deco02']} alt="" />

        <div className={styles['content03']}>
          <div className={styles['title']}>{park3?.Name}</div>
          <div className={styles['wrapper']}>
            {!isMobile 
            ? (park3?.Description?.substr(0, 95) + ' ....') // 網頁內容
            : (park3?.Description)                          // 手機內容
            }
            <Link href={'/about/detail?id=' + park3?.ID}>
              <a className={styles['btn-main']} title={"移至" + park3?.Name + "介紹"}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img src="/images/home/map-park-obj-03.png" className={styles['deco03']} alt="" />
        <img src="/images/home/map-park-obj-04.png" className={styles['deco04']} alt="" />

        <div className={styles['content04']}>
          <div className={styles['title']}>{park4?.Name}</div>
          <div className={styles['wrapper']}>
            {!isMobile 
            ? (park4?.Description?.substr(0, 95) + ' ....') // 網頁內容
            : (park4?.Description)                          // 手機內容
            }

            <Link href={'/about/detail?id=' + park4?.ID}>
              <a className={styles['btn-main']} title={"移至" + park4?.Name + "介紹"}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img src="/images/home/map-park-obj-05.png" className={styles['deco05']} alt="" />
      </div>
    </div>
  );
}
