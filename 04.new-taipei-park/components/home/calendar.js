import React, { useState } from 'react';
import styles from './styles/calendar.module.sass';
import ActivityCalendar from './activity-calendar';
import ActivityList from './activity-list';
import Link from 'next/link';

export default function Calendar({ data }) {
  const [switcher, setSwitcher] = useState(true);

  return (
    <div className={styles['home-calendar']}>
      {switcher ? (
        <div className="container">
          <div className={styles['cover']}>
            <div className={styles['title']}>活動行事曆</div>
            <div className={styles['sub']}>
              <hr />
              <span>提供新北大都會公園各園區相關活動訊息</span>
            </div>

            <div className={styles['calendar-control']}>
              <div className={`${styles['panel']} mt-md-4 pt-md-3`}>
                <a className={styles['btn-purple']} onClick={() => setSwitcher(false)} >
                  <img src="/images/home/icon-activity-cached.png" className="mr-1" alt="" />{' '}
                  切換列表模式
                </a>
              </div>
            </div>
          </div>

          <ActivityCalendar />
        </div>
      ) : (
        <div className="container">
          <div className={styles['cover']}>
            <div className={styles['title']}>活動行事曆</div>
            <hr className={styles['divider']} />

            <div className={styles['img-control']}>
              <img src="/images/home/icon-activity-title-obj-01.png" alt="" className={styles['img-deco01']} />
              <img src="/images/home/icon-activity-title-obj-02.png" alt="" className={styles['img-deco02']} />
            </div>

            <div className={styles['btn-control']}>
              <Link href="/activity/list">
                <button className={styles['btn-blue']}>所有活動列表</button>
              </Link>

              <a className={styles['btn-purple']} onClick={() => setSwitcher(true)} >
                <img src="/images/home/icon-activity-cached.png" className="mr-1" alt="" />{' '}
                切換月曆模式
              </a>
            </div>
          </div>

          <div className={styles['subtitle']}>
            <a className={styles['btn-purple']} onClick={() => setSwitcher(true)} >
              <img src="/images/home/icon-activity-cached.png" className="mr-1" alt="" />
              切換月曆模式
            </a>
            提供新北大都會公園各園區相關活動訊息
          </div>

          <ActivityList posterData={data} />
        </div>
      )}
    </div>
  );
}
