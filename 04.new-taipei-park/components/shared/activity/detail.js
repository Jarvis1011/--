import React from 'react';
import styles from './styles/activity.module.sass';
import moment from 'moment';
// import Link from 'next/link';

export default function Content({ detail }) {
  console.log('detail', detail);
  const {
    Title,
    ImageVerticalPath,
    ImagePath,
    Description,
    EndDate,
    StartDate,
    LinkInfos,
    Organizer,
    Location,
    RegisterStartDate,
    RegisterEndDate,
  } = detail;

  // 時間格式處理
  const dayStart = moment(StartDate).format('YYYY-MM-DD');
  const dayEnd = moment(EndDate).format('YYYY-MM-DD');
  const registerStart = RegisterStartDate ? moment(RegisterStartDate).format('YYYY/MM/DD HH:mm') : '';
  const registerEnd = RegisterEndDate ? moment(RegisterEndDate).format('YYYY/MM/DD HH:mm') : '';

  return (
    <div className={styles['content']}>
      <div className={styles['title_area']}>
        <h2>{Title}</h2>
        <span>{dayStart === dayEnd ? dayStart : dayStart + '~' + dayEnd}</span>
      </div>
      <div className={styles['img_box']}>
        <img src={(process.env.NEXT_PUBLIC_URL ?? '') + ImagePath} alt="" />
      </div>
      {/* <img src={process.env.NEXT_PUBLIC_URL + ImagePath} alt="" />
      <img src={process.env.NEXT_PUBLIC_URL + ImageVerticalPath} alt="" /> */}
      <div className={styles['detail_list']}>
        <div className={styles['item']}>
          <span>活動日期</span> |{' '}
          {dayStart === dayEnd ? dayStart : dayStart + '~' + dayEnd}
        </div>
        <div className={styles['item']}>
          <span>主辦單位</span> | {Organizer}
        </div>
        <div className={styles['item']}>
          <span>舉辦地點</span> | {Location}
          <a
            href={`https://www.google.com.tw/maps/search/${Location}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2"
            title="移至Google地圖(開啟新視窗)"
          >
            (查看地圖)
          </a>
        </div>
        {
          RegisterStartDate !== null && RegisterEndDate !== null ?
            <div className={styles['item']}>
              <span>活動時程</span> | {registerStart !== undefined && registerEnd !== undefined ? `${registerStart} ~ ${registerEnd}` : ''} (額滿為止)
            </div> : ''
        }
        {
          LinkInfos?.length > 0 ?
            <div className={styles['item']}>
              <span>相關連結</span> |
              {LinkInfos?.map((itm, idx) => {
                return (
                  <a
                    href={itm.LinkUrl}
                    target="_blank"
                    key={itm.Sequence + idx}
                    className="mx-1"
                    title={"移至" + itm.Name + "(開啟新視窗)"}
                  >
                    {itm.Name}
                  </a>
                );
              })}
            </div> : ''
        }
      </div>
      <div
        className={styles['editor']}
        dangerouslySetInnerHTML={{ __html: Description }}
      />
    </div>
  );
}
