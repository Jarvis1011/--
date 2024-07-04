import React, { useEffect, useState } from 'react';
import { sendGetRequest } from '../../../api/helper';
import styles from './styles/faq.module.sass';

export default function FAQ({ data }) {
  const [id, setID] = useState('');
  const [detail, setDetail] = useState('');

  useEffect(() => {
    async function getData() {
      const detail = await sendGetRequest('/api/questionArea/Details?id=' + id);
      setDetail(detail);
    }
    getData();
  }, [id]);
  return (
    <div className="container">
      {data?.map((item, index) => (
        <div key={index} className={styles['wrapper']}>
          <div className={styles['question']} onClick={() => setID(item.ID)}>
            <img src="/images/faq/title-icon-qa.png" alt="" className="mr-2" />
            {item.Title}
          </div>

          {id === item.ID && detail && (
            <div className={styles['answer']} dangerouslySetInnerHTML={{ __html: detail.Description }} />
          )}
        </div>
      ))}

      <div className="text-center my-4">
        <a
          href="https://www.hrcm.ntpc.gov.tw/Home/DirectorMailbox"
          target="_blank"
          rel="noopener noreferrer"
          className={styles['btn-main']}
          title="移至新北市政府高灘地工程管理處 處長信箱(開啟新視窗)"
        >
          <img src="/images/faq/icon-question.png" alt="" className="mr-1" />
          我要發問
        </a>
      </div>
    </div>
  );
}
