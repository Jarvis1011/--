import React from 'react';
import styles from './styles/map.module.sass';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import messages from '../../../data/i18n/messages'

export default function Map(isMobile) {
  const router = useRouter();
  const { locale } = router;

  return (
    <div className="container">
      <div className={styles['home-map']}>
        <img src="/images/mobile/mobile-main-bg-obj-01.png" className={styles['mobile-deco01']} alt="" />
        <img src="/images/mobile/mobile-main-bg-obj-02.png" className={styles['mobile-deco02']} alt="" />
        <img src="/images/mobile/mobile-main-bg-obj-03.png" className={styles['mobile-deco03']} alt="" />

        <div className={styles['content01']}>
          <div className={styles['title']}>{messages[`${locale}`].map_title_01}</div>
          <div className={styles['wrapper']}>
            { !isMobile 
              ? (messages[`${locale}`].map_introduc_01.substr(0, 190) + ' ....') // 網頁內容
              : (messages[`${locale}`].map_introduc_01) // 手機內容
            }
          </div>
          <Link href={'/foreign/detail?id=1e9bd2c4-04e1-41ee-a09a-b9cbc7f5bbba'}>
            <a className={styles['btn-main']} title={messages[`${locale}`].move_to_page + messages[`${locale}`].map_title_01}>
              <FormattedMessage id={messages[`${locale}`].park_introduce} description={'園區介紹'}/>
            </a>
          </Link>
        </div>
        <img src="/images/home/map-park-obj-01.png" className={styles['deco01']} alt="" />

        <div className={styles['content02']}>
          <div className={styles['title']}>{messages[`${locale}`].map_title_02}</div>
          <div className={styles['wrapper']}>
            { !isMobile 
              ? (messages[`${locale}`].map_introduc_02.substr(0, 190) + ' ....') // 網頁內容
              : (messages[`${locale}`].map_introduc_02) // 手機內容
            }
          </div>
          <Link href={'/foreign/detail?id=0e2c5577-150d-4e9c-92ea-653d341736d9'}>
            <a className={styles['btn-main']} title={messages[`${locale}`].move_to_page + messages[`${locale}`].map_title_02}>
              <FormattedMessage id={messages[`${locale}`].park_introduce} description={'園區介紹'}/>
            </a>
          </Link>
        </div>
        <img src="/images/home/map-park-obj-02.png" className={styles['deco02']} alt="" />

        <div className={styles['content03']}>
          <div className={styles['title']}>{messages[`${locale}`].map_title_03}</div>
          <div className={styles['wrapper']}>
            { !isMobile 
              ? (messages[`${locale}`].map_introduc_03.substr(0, 190) + ' ....') // 網頁內容
              : (messages[`${locale}`].map_introduc_03) // 手機內容
            }
          </div>
          <Link href={'/foreign/detail?id=80ff13d2-22f4-4412-814b-5f11e89a1ea7'}>
            <a className={styles['btn-main']} title={messages[`${locale}`].move_to_page + messages[`${locale}`].map_title_03}>
              <FormattedMessage id={messages[`${locale}`].park_introduce} description={'園區介紹'}/>
            </a>
          </Link>
        </div>
        <img src="/images/home/map-park-obj-03.png" className={styles['deco03']} alt="" />
        <img src="/images/home/map-park-obj-04.png" className={styles['deco04']} alt="" />

        <div className={styles['content04']}>
          <div className={styles['title']}>{messages[`${locale}`].map_title_04}</div>
          <div className={styles['wrapper']}>
            { !isMobile 
              ? (messages[`${locale}`].map_introduc_04.substr(0, 190) + ' ....') // 網頁內容
              : (messages[`${locale}`].map_introduc_04) // 手機內容
            }
          </div>
          <Link href={'/foreign/detail?id=d05ddf30-fdc6-4974-94fe-dab80e1013f3'}>
            <a className={styles['btn-main']} title={messages[`${locale}`].move_to_page + messages[`${locale}`].map_title_04}>
              <FormattedMessage id={messages[`${locale}`].park_introduce} description={'園區介紹'}/>
            </a>
          </Link>
        </div>
        <img src="/images/home/map-park-obj-05.png" className={styles['deco05']} alt="" />
      </div>
    </div>
  );
}
