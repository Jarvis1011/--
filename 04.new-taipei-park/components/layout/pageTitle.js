import React, { useEffect } from 'react';
import styles from './styles/pagetitle.module.sass';
import Link from 'next/link';
import messages from '../../data/i18n/messages';
import { useRouter } from 'next/router';

export default function PageTitle({ data }) {
  const router = useRouter();
  const { locale } = router;

  useEffect(() => {
    if (data.setPageTitle) {
      data.setPageTitle(data.pageTitle);
    }
  }, []);
  
  return (
    <div className="container">
      <div className={styles['wrapper']}>
        <a
          id="C"
          className={`${styles['to-main']}`}
          accessKey="C"
          href="#C"
          title={messages[`${locale}`].center_area}
        >
          :::
        </a>
        <div className={styles['title']}>{data.pageTitle}</div>
        <div>
          {data?.img?.img_main && (
            <img
              src={data?.img?.img_main}
              alt=""
              className={styles['main-img']}
            />
          )}
          <div
            className={data?.img?.img_main ? styles['sub'] : styles['subtitle']}
            dangerouslySetInnerHTML={{ __html: data.pageSub }}
          />
        </div>

        {data?.type === 'online-rental' ? (
          <button className={styles['btn-main']} title="移至線上租借(該功能目前建置中)">
            <img src="/images/park/icon-venue-rental.png" alt="" className="mr-1" />線上租借(建置中)
          </button>
        ) : data?.type === 'activity-calendar' ? (
          <Link href="/activity/list">
            <button className={styles['btn-purple']} title="切換為列表模式顯示活動">
              <img src="/images/home/icon-activity-cached.png" alt="" className="mr-1" />切換列表模式
            </button>
          </Link>
        ) : data?.type === 'activity-list' ? (
          <Link href="/activity">
            <button className={styles['btn-purple']} title="切換為月曆模式顯示活動">
              <img src="/images/home/icon-activity-cached.png" alt="" className="mr-1" />切換月曆模式
            </button>
          </Link>
        ) : data?.type === 'without-button' ? null : (
          <img src={data?.img?.img_sub} className={styles['deco-img']} alt="" />
        )}
      </div>

      <div className={styles['breadcrumbs']}>
        <Link href="/">
          <a>{messages[`${locale}`].breadcrumbs}</a>
        </Link>
        <span className={styles['divider']}> | </span>
        {data?.breadcrumbs?.map((data, index) =>
          data.link ? (
            <span key={index}>
              <Link key={index} href={data.link}>
                <a>{data.title}</a>
              </Link>
              <span className={styles['divider']}> | </span>
            </span>
          ) : (
            <span key={index}>{data.title}</span>
          )
        )}
      </div>
    </div>
  );
}
