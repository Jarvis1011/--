import React, { useState } from 'react';
import styles from './styles/calendar.module.sass';
import ActivityCalendar from './activity-calendar';
import ActivityList from './activity-list';
import Link from 'next/link';

export default function Calendar({ data, isMobile }) {
  const [switcher, setSwitcher] = useState(true);
  const [month, setMonth] = useState(new Date().getMonth()); // 初始月份
  const [eventCount, setEventCount] = useState(data?.length)
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
              <div className={styles['panel']}>
                {/* <a></a>
                <span className={styles['text-big']}>2021/7月</span>
                <a></a> */}
              </div>
              <div className={`${styles['panel']} mt-md-4 pt-md-3`}>
                <a href="#!" className={styles['btn-purple']} onClick={() => setSwitcher(false)} title="切換為列表模式顯示活動" >
                  <img src="/images/home/icon-activity-cached.png" className="mr-1" alt="列表模式" />{' '}
                  切換列表模式
                </a>
              </div>
            </div>
            {/* {isMobile && (
              <div className={styles['panel']}>
                <span className={styles['text-small']}>
                  {month}月份有 <span className={styles['text-blue']}>{eventCount}</span>{' '}
                  則活動訊息
                </span>
              </div>
            )} */}
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
              <div className={styles['panel']}>
                <Link href="/activity/list">
                  <button className={styles['btn-blue']} title="移至所有活動列表">所有活動列表</button>
                </Link>
              </div>
            </div>
          </div>

          <div className={styles['subtitle']}>
            <a href="#!" className={styles['btn-purple']} onClick={() => setSwitcher(true)} title="切換為月曆模式顯示活動" >
              <img src="/images/home/icon-activity-cached.png" className="mr-1" alt="月曆模式" />
              切換月曆模式
            </a>
            提供新北大都會公園各園區相關活動訊息
          </div>

          <ActivityList posterData={data} isMobile={isMobile} />
        </div>
      )}
    </div>
  );
}
