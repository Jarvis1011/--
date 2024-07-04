import React from 'react';
import styles from './styles/map.module.sass';
import Link from 'next/link';

export default function Map({ data }) {
  return (
    <div className="container">
      <div className={styles['home-map']}>
        <img src="/images/mobile/mobile-main-bg-obj-01.png" className={styles['mobile-deco01']} alt="" />
        <img src="/images/mobile/mobile-main-bg-obj-02.png" className={styles['mobile-deco02']} alt="" />
        <img src="/images/mobile/mobile-main-bg-obj-03.png" className={styles['mobile-deco03']} alt="" />

        <div className={styles['content01']}>
          <div className={styles['title']}>
            {data?.find((item) => item.Sequence === 1)?.Name}
          </div>
          <div className={styles['wrapper']}>
            {data?.find((item) => item.Sequence === 1)?.Description?.substr(0, 95) + ' ....'}
            <Link href={'/about/detail?id=' + data?.find((item) => item.Sequence === 1)?.ID}>
              <a className={styles['btn-main']}>園區介紹</a>
            </Link>
          </div>
        </div> 
        <img src="/images/home/map-park-obj-01.png" className={styles['deco01']} alt="" />

        <div className={styles['content02']}>
          <div className={styles['title']}>
            {data?.find((item) => item.Sequence === 2)?.Name}
          </div>
          <div className={styles['wrapper']}>
            {data?.find((item) => item.Sequence === 2)?.Description?.substr(0, 95) + ' ....'}
            <Link href={'/about/detail?id=' + data?.find((item) => item.Sequence === 2)?.ID}>
              <a className={styles['btn-main']}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img src="/images/home/map-park-obj-02.png" className={styles['deco02']} alt="" />

        <div className={styles['content03']}>
          <div className={styles['title']}>
            {data?.find((item) => item.Sequence === 3)?.Name}
          </div>
          <div className={styles['wrapper']}>
            {data?.find((item) => item.Sequence === 3)?.Description?.substr(0, 95) + ' ....'}
            <Link href={'/about/detail?id=' + data?.find((item) => item.Sequence === 3)?.ID}>
              <a className={styles['btn-main']}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img src="/images/home/map-park-obj-03.png" className={styles['deco03']} alt="" />
        <img src="/images/home/map-park-obj-04.png" className={styles['deco04']} alt="" />

        <div className={styles['content04']}>
          <div className={styles['title']}>
            {data?.find((item) => item.Sequence === 4)?.Name}
          </div>
          <div className={styles['wrapper']}>
            {data?.find((item) => item.Sequence === 4)?.Description?.substr(0, 95) + ' ....'}

            <Link href={'/about/detail?id=' + data?.find((item) => item.Sequence === 4)?.ID}>
              <a className={styles['btn-main']}>園區介紹</a>
            </Link>
          </div>
        </div>
        <img
          src="/images/home/map-park-obj-05.png"
          className={styles['deco05']}
          alt=""
        />
      </div>
    </div>
  );
}
