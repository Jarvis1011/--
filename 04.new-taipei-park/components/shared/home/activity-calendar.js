import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styles from './styles/calendar.module.sass';
import { sendPostRequest } from '../../../api/helper';

export default function ActivityCalendar() {
  // hooks
  const [controlBar, setControlBar] = useState(''); // 控制鈕
  const [showInfo, setShowInfo] = useState(null); // 彈窗控制
  const [time, setTime] = useState(new Date()); // 初始時間
  const [month, setMonth] = useState(new Date().getMonth()); // 初始月份

  const [days, setDays] = useState([]); // 渲染的資料陣列
  const [dayData, setDayData] = useState(); // 日期資料
  const [posterData, setPosterData] = useState([]); // 活動資料陣列

  const getAPI = date => {
    const year = date.getFullYear();
    // console.log('year', year);
    const month = date.getMonth() + 1;
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();

    (async () => {
      const payload = {
        IncludeAttached: false,
        StartDate: `${year}-${month}-1`,
        EndDate: `${year}-${month}-${lastDay}`,
        Search: '',
        Sort: 'SequenceNo',
        Order: 'desc',
        Limit: 9999,
        Offset: 0,
        Culture: 1,
      };
      const res = await sendPostRequest('/api/activity/Paging', payload);
      setPosterData(res.Data.rows);
    })();
  };

  const renderCalendar = month => {
    // console.log('當前時間', time);
    // console.log('當前月份', month);
    // 初始 and 設定月份及 control bar
    const now = new Date();
    now.setMonth(month);
    // console.log('當前時間2', now);
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    // console.log('currentMonth', currentMonth);
    setTime(currentMonth);
    // 取當月資料
    getAPI(currentMonth);
  };
  const prevMonth = () => {
    setMonth(month - 1);
  };
  const nextMonth = () => {
    setMonth(month + 1);
  };
  const showPopup = dayData => {
    // console.log('傳入的', dayData);
    setShowInfo(null);
    setDayData(dayData);
  };
  const closePopup = () => setShowInfo(null);
  // 監測彈窗
  useEffect(() => {
    !showInfo && setShowInfo(dayData);
  }, [dayData]);

  useEffect(() => {
    // console.log('month01', month);
    setControlBar(`${time.getFullYear()}/${time.getMonth() + 1}月`);

    time.setDate(1); // 設定為一日才能夠抓出當月第一天及最後一天正確位置

    const lastDay = new Date( // 當月最後一天日期
      time.getFullYear(),
      time.getMonth() + 1,
      0
    ).getDate();
    const prevLastDay = new Date( // 上個月最後一天日期
      time.getFullYear(),
      time.getMonth(),
      0
    ).getDate();
    const firstDayIndex = time.getDay(); // 當月第一天在星期幾
    const lastDayIndex = new Date( // 當月最後一天在星期幾
      time.getFullYear(),
      time.getMonth() + 1,
      0
    ).getDay();
    const nextDays = 7 - lastDayIndex - 1; // 下個月顯示的天數

    // 上月+當月+下月的年月格式 for loop used
    const lastYM = moment(
      new Date(time.getFullYear(), time.getMonth(), 0)
    ).format('YYYY/MM');
    const currentYM = moment(
      new Date(time.getFullYear(), time.getMonth() + 1, 0)
    ).format('YYYY/MM');
    const nextYM = moment(
      new Date(time.getFullYear(), time.getMonth() + 2, 0)
    ).format('YYYY/MM');

    const thisMonthArray = [];
    for (let i = firstDayIndex; i > 0; i--) {
      let day = i;
      if (i < 10) day = '0' + i;
      thisMonthArray.push({
        date: new Date(lastYM + '/' + (prevLastDay - i + 1)),
        day: prevLastDay - i + 1,
        currentMonth: false,
        activity:
          posterData?.length > 0
            ? posterData?.filter(
              dt =>
                new Date(lastYM + '/' + (prevLastDay - i + 1)) >=
                new Date(dt.StartDate) &&
                new Date(lastYM + '/' + (prevLastDay - i + 1)) <=
                new Date(dt.EndDate)
            )
            : [],
      });
    }
    for (let j = 1; j <= lastDay; j++) {
      let day = j;
      if (j < 10) day = '0' + j;
      // console.log('posterData', posterData);
      thisMonthArray.push({
        date: new Date(currentYM + '/' + day),
        day: j,
        currentMonth: true,
        activity:
          posterData?.length > 0
            ? posterData?.filter(
              dt =>
                new Date(currentYM + '/' + day) >= new Date(dt.StartDate) &&
                new Date(currentYM + '/' + day) <= new Date(dt.EndDate)
            )
            : [],
      });
    }
    for (let k = 1; k < nextDays + 1; k++) {
      let day = k;
      if (k < 10) day = '0' + k;
      thisMonthArray.push({
        date: new Date(nextYM + '/' + day),
        day: k,
        currentMonth: false,
        activity:
          posterData?.length > 0
            ? posterData?.filter(
              dt =>
                new Date(nextYM + '/' + day) >= new Date(dt.StartDate) &&
                new Date(nextYM + '/' + day) <= new Date(dt.EndDate)
            )
            : [],
      });
    }
    // 補上索引屬性 for popup 左or右使用
    thisMonthArray.forEach((itm, idx) => (itm['index'] = idx));
    // console.log('thisMonthArray', thisMonthArray);
    // console.log(posterData, date);
    setDays(thisMonthArray);
  }, [posterData, time]);
  // init
  useEffect(() => {
    // console.log('month02', month);
    renderCalendar(month);
    // setShowInfo(null);
  }, [month]);

  return (
    <div className="row">
      <div className="col-md-12 mx-auto text-center">
        <div className={styles['control_bar']}>
          <a onClick={() => prevMonth()} title="瀏覽上一個月的行事曆" href="#!">
            <img src="/images/home/arrow-prev-white.png" alt="上一個月" />
          </a>
          <div>{controlBar}</div>
          <a onClick={() => nextMonth()} title="瀏覽下一個月的行事曆" href="#!">
            <img src="/images/home/arrow-next-white.png" alt="下一個月" />
          </a>
        </div>
        <div className={styles['calendar-wrapper']}>
          <div className={styles['main_calendar']}>
            <div className={styles['weekdays']}>
              <div>星期日</div>
              <div>星期一</div>
              <div>星期二</div>
              <div>星期三</div>
              <div>星期四</div>
              <div>星期五</div>
              <div>星期六</div>
            </div>
            <div className={styles['days']}>
              {days.map((day, idx, days) => {
                if (days.length > 35) {
                  return (
                    <div
                      onClick={() => day.currentMonth && showPopup(day)}
                      className={`${day.activity.length === 0 && day.currentMonth
                        ? `${styles['day']} ${styles['small']}`
                        : day.activity.length === 0 && !day.currentMonth
                          ? `${styles['day']} ${styles['not_current_month']} ${styles['small']}`
                          : day.activity.length > 0 && day.currentMonth
                            ? `${styles['day']} ${styles['activity']} ${styles['small']}`
                            : day.activity.length > 0 && !day.currentMonth
                              ? `${styles['day']} ${styles['activity']} ${styles['op05']} ${styles['small']}`
                              : null
                        }`}
                      key={idx}
                    >
                      <div>{day.day}</div>
                      {day.activity.length === 0 ? null : (
                        <a href="#!" title="顯示當日活動(開啟懸浮視窗)" style={{ display: "block" }}>
                          <div>{`${day.activity.length}則`}</div>
                          <div className={styles['info']}>
                            {day?.activity.map((itm, idx) => {
                              return (
                                <span
                                  key={idx}
                                  className={styles['dot']}
                                ></span>
                              );
                            })}
                          </div>
                        </a>
                      )}
                      {day.activity.length ===
                        0 ? null : !showInfo ? null : showInfo.date !==
                          day.date ? null : (
                          <div
                            className={`${styles['detail_popup']} ${day.index % 7 < 2 ? styles['to_right'] : null
                              }`}
                          >
                            <div className={styles['wrapper']}>
                              <a href="#!" title="關閉當日活動訊息" className={styles['close']} onClick={() => closePopup()}>
                                <img
                                  src="/images/home/calendar-popup-close.png"
                                  alt="關閉"
                                />
                              </a>
                              <div className={styles['triangle']}></div>
                              {showInfo?.activity?.map((itm, idx) => {
                                return (
                                  <div className={styles['item']} key={idx}>
                                    <span className={styles['tag']}>
                                      {itm.Organizer}
                                    </span>
                                    <a href={`/activity/detail?id=${itm.ID}`}>
                                      {itm.Title}
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      onClick={() => day.currentMonth && showPopup(day)}
                      className={`${day.activity.length === 0 && day.currentMonth
                        ? `${styles['day']} `
                        : day.activity.length === 0 && !day.currentMonth
                          ? `${styles['day']} ${styles['not_current_month']}`
                          : day.activity.length > 0 && day.currentMonth
                            ? `${styles['day']} ${styles['activity']}`
                            : day.activity.length > 0 && !day.currentMonth
                              ? `${styles['day']} ${styles['activity']} ${styles['op05']}`
                              : null
                        }`}
                      key={idx}
                    >
                      <div>{day.day}</div>
                      {day.activity.length === 0 ? null : (
                        <a href="#!" title="顯示當日活動(開啟懸浮視窗)" style={{ display: "block" }}>
                          <div>{`${day.activity.length}則`}</div>
                          <div className={styles['info']}>
                            {day?.activity.map((itm, idx) => {
                              return (
                                <span
                                  key={idx}
                                  className={styles['dot']}
                                ></span>
                              );
                            })}
                          </div>
                        </a>
                      )}
                      {day.activity.length ===
                        0 ? null : !showInfo ? null : showInfo.date !==
                          day.date ? null : (
                          <div
                            className={`${styles['detail_popup']} ${day.index % 7 < 2 ? styles['to_right'] : null
                              }`}
                          >
                            <div className={styles['wrapper']}>
                              <a href="#!" title="關閉當日活動訊息" className={styles['close']} onClick={() => closePopup()}>
                                <img
                                  src="/images/home/calendar-popup-close.png"
                                  alt="關閉"
                                />
                              </a>
                              <div className={styles['triangle']}></div>
                              {showInfo?.activity?.map((itm, idx) => {
                                return (
                                  <div className={styles['item']} key={idx}>
                                    <span className={styles['tag']}>
                                      {itm.Organizer}
                                    </span>
                                    <a href={`/activity/detail?id=${itm.ID}`}>
                                      {itm.Title}
                                    </a>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <img
            src="/images/home/calendar-obj-bg.png"
            className={styles['calendar']}
            alt=""
          />
          <img
            src="/images/mobile/calendar-obj-bg-mobile.png"
            className={styles['calendar-mobile']}
            alt=""
          />

          <img
            src="/images/home/calendar-cloud-01.png"
            className={styles['deco01']}
            alt=""
          />
          <img
            src="/images/home/calendar-cloud-02.png"
            className={styles['deco02']}
            alt=""
          />
          <img
            src="/images/home/calendar-cloud-03.png"
            className={styles['deco03']}
            alt=""
          />
          <img
            src="/images/home/calendar-obj-01.png"
            className={styles['deco04']}
            alt=""
          />
          <img
            src="/images/home/calendar-obj-02.png"
            className={styles['deco05']}
            alt=""
          />
          <img
            src="/images/home/calendar-obj-03.png"
            className={styles['deco06']}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
