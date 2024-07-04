import React from 'react';
import styles from './styles/news.module.sass';
import moment from 'moment';

export default function Content({ data }) {
  console.log('inner', data);

  // 20220324 內文處理
  const FormatDescText = (text) => {
    let value = text;

    // while (value.indexOf('<') !== -1) {
    //   let count = 0;
    //   let tagStart = value.indexOf('<');
    //   let tagEnd = value.indexOf('>') + 1;
    //   value = value.slice(0, tagStart) + value.slice(tagEnd);
    //   count++;
    //   if (count > 10) {
    //     break;
    //   }
    // }

    // value = value.replaceAll('&nbsp;', '');
    // value = value.replaceAll('：', '：&nbsp;');
    // value = value.replaceAll('　　', '');
    // value = value.replaceAll('\r\n\r\n\r\n', '<br/>');

    return value;
  }
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
            alt={data.Title}
          />
        )}

        <div style={{fontSize: '1.25rem'}}
          dangerouslySetInnerHTML={{
            __html: FormatDescText(data?.Description),
          }}
          className={styles['description']}
        />
      </div>
    </div>
  );
}
