import React from 'react';
import styles from './styles/news.module.sass';
import moment from 'moment';

export default function Content({ data }) {
  let text = data?.Description;
  return (
    <div className={styles['content']}>
      <div className="container mb-5">
        <div className="row mt-4">
          <div className="col-md-10 mb-3">
            <div className={styles['title']}>{data.Title}</div>
          </div>
          <div className="col-md-2 mb-3 text-right">
            <div className={styles['date']}>
              {moment(data.CreateTime).format('YYYY/MM/DD')}
            </div>
          </div>
        </div>

        {data.ImagePath && (
          <img
            src={(process.env.NEXT_PUBLIC_URL ?? '') + data.ImagePath}
            alt={data.ImageAlt ?? data.Title} />
        )}
        <div dangerouslySetInnerHTML={{ __html: text?.replace(/\n/g, '') }}
          className={styles['description']}
        />
      </div>
    </div>
  );
}