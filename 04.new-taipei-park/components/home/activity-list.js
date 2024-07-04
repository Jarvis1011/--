import { useState, useEffect } from 'react';
import styles from './styles/calendar.module.sass';
import moment from 'moment';
import Link from 'next/link';
import { sendPostRequest } from '../../api/helper';

export default function ActivityList(props) {
  const { posterData, params } = props;
  return (
    <div className={styles['poster']}>
      {posterData?.length > 0 && (
        <div className="row mt-5">
          {posterData?.map((data, index) => (
            <div key={index} className="col-md-4 col-6 mb-4">
              <Link href={`/activity/detail?id=${data.ID}`}>
                <a title={"移至" + data.Title + "詳細說明"} style={{ display: "block" }}>
                  <div
                    style={{
                      background: `url(${(process.env.NEXT_PUBLIC_URL ?? '') + (data.ImageVerticalPath === '' ? '/images/none_activity.png' : data.ImageVerticalPath)})`,
                    }}
                    className={styles['poster-image']}
                  />

                  <span className={styles['date']}>{moment(data.StartDate).format('YYYY/MM/DD')}~{moment(data.EndDate).format('YYYY/MM/DD')}</span>
                  <div className={styles['title']}>{data.Title}</div>
                  {data.Organizer && (
                    <span className={styles['type']}>{data.Organizer}</span>
                  )}
                </a>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
