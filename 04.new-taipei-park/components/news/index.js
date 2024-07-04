import { useEffect, useState } from 'react';
import Link from 'next/link';
//import DatePicker from "react-datepicker";
import styles from './styles/news.module.sass';
import "react-datepicker/dist/react-datepicker.css";

export default function News(props) {
  const { params, data, setSearchString, setSearching, setStartDateString, setStopDateString, categoryString, setCategoryString, setSelectedPageString } = props;
  const [categoryList, setCategoryList] = useState([])
  const [startDate, setStartDate] = useState('');
  const [stopDate, setStopDate] = useState('');

  function setDefaultImg(path) {
    return path !== '' ? (process.env.NEXT_PUBLIC_URL ?? '') + path : '/images/default_horizontal.jpg';
  }

  const FormatDesc = (text) => {
    let originText = text.split('\r\n')
    let value = text;

    while (value.indexOf('<') !== -1) {
      let count = 0;
      let tagStart = value.indexOf('<');
      let tagEnd = value.indexOf('>') + 1;
      value = value.slice(0, tagStart) + value.slice(tagEnd);
      count++;
      if (count > 10) {
        break;
      }
    }
    return value;
  }

  useEffect(() => {
    let categoryList = [
      { name: '所有消息', value: '' }
    ];
    params.Formatter.ArticleCategoryFormatter.map((item) => {
      categoryList.push({ name: item.Text, value: item.Value });
    });
    setCategoryList(categoryList);
  }, []);

  return (
    <div className="container">
      <div className="row mt-4">
        <div className={styles['search-bar']} >
          <div className={`${styles['select-out']} col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12`}>
            <div className={styles['select-desc']}>類別</div>
            {categoryList.map(c => (
              <div
                key={c.name}
                value={c.value}
                className={`${styles['select-category']} ${categoryString === c.value ? styles['category-active'] : ''}`}
                onClick={() => {
                  setCategoryString(c.value);
                  setSelectedPageString(0);
                }}
              ><a title={"切換至" + c.name + "類別"} href="#!">{c.name}</a></div>
            ))}
          </div>

          <div className={`${styles['floatleft']} ${styles['paddingright05']} ${styles['width095']} col-xl-2 col-lg-2 ${styles['col-md-55']} ${styles['col-sm-55']} ${styles['col-55']} mt-1`}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholderText="開始日期"
              title="請輸入開始日期"
              className={`${styles['']} form-control`} />
          </div>
          <div className={`${styles['floatleft']} ${styles['zindex2']} ${styles['width001']} ${styles['alignicon']} `} >～</div>
          <div className={`${styles['floatright']} ${styles['paddingleft05']} col-xl-2 col-lg-2 ${styles['col-md-55']} ${styles['col-sm-55']} ${styles['col-55']} mt-1`}>
            <input
              type="date"
              value={stopDate}
              onChange={(e) => setStopDate(e.target.value)}
              placeholderText="結束日期"
              title="請輸入結束日期"
              className={`${styles['']} form-control`} />
          </div>
          <label htmlFor="search-input" className="d-none">請輸入關鍵字搜尋</label>
          <input
            type="text" 
            id='search-input' 
            placeholder="請輸入關鍵字搜尋" 
            title="請輸入關鍵字搜尋" 
            className={`${styles['search-input']} col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12`}
          />
          <button
            className={styles['search-btn']}
            type="submit"
            onClick={() => {
              setSearchString(document.querySelector('#search-input').value);
              setStartDateString(startDate);
              setStopDateString(stopDate);
              setSearching(true);
            }}
          >
            <img src="/images/video/icon-search.png" alt="搜尋" />
            <span className='d-none'>搜尋</span>
          </button>

        </div>
        {data?.rows?.map((item, index) => (
          <div className="col-md-4 col-6  px-2" key={index}>
            <div className={styles['news-wrapper']}>
              <img src={setDefaultImg(item.ImagePath)} alt={item.ImageDesc ?? item.Title} key={item.ID} width="100%" />

              <span className={styles['type']}>{params?.Formatter?.ArticleCategoryFormatter?.find(val => val.Value === item.Category)?.Text}</span>
              <div className={styles['title']}>{item.Title}</div>
              <div className={styles['desc']} dangerouslySetInnerHTML={{ __html: FormatDesc(item.Description) }} />

              <div className="text-center">
                <Link href={`/news/detail?id=${item.ID}`}>
                  <a className={styles['btn-main']} title={"移至" + item.Title + "詳細內容"}>詳細內容</a>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
