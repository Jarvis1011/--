import React, { useCallback } from 'react';
import Link from 'next/link';
import styles from './styles/about.module.sass';

export default function About({ parkData, facilityData }) {
  const getFacilityOption = useCallback(
    (name) => {
      if (!facilityData) return;
      const facilities = facilityData.Data.rows;
      const target = facilities.find((f) => f.Name === name);

      return target ? (
        <li key={name}>
          <Link href={`/facility-detail?id=${target?.ID}`}>
            <a>{name}</a>
          </Link>
        </li>
      ) : (
        <span style={{ display: 'block' }}>{name}</span>
      );
    },
    [facilityData]
  );

  return (
    <div className="container">
      <div className={styles['about-bg']}>
        <img
          src="/images/about/main-park.webp"
          alt=""
          className={styles['bg-park']}
        />

        <Link
          href={`/about/detail?id=${
            parkData?.Data?.rows?.find((item) => item.Sequence === 1)?.ID
          }`}
        >
          <a>
            <img
              src="/images/about/btn-pic-road-sign-01.png"
              alt={parkData?.Data?.rows?.find((item) => item.Sequence === 1)?.Name}
              className={styles['sign01']}
            />
          </a>
        </Link>

        <Link
          href={`/about/detail?id=${
            parkData?.Data?.rows?.find((item) => item.Sequence === 2)?.ID
          }`}
        >
          <a>
            <img
              src="/images/about/btn-pic-road-sign-02.png"
              alt={parkData?.Data?.rows?.find((item) => item.Sequence === 2)?.Name}
              className={styles['sign02']}
            />
          </a>
        </Link>

        <Link
          href={`/about/detail?id=${
            parkData?.Data?.rows?.find((item) => item.Sequence === 3)?.ID
          }`}
        >
          <a>
            <img
              src="/images/about/btn-pic-road-sign-03.png"
              alt={parkData?.Data?.rows?.find((item) => item.Sequence === 3)?.Name}
              className={styles['sign03']}
            />
          </a>
        </Link>

        <Link
          href={`/about/detail?id=${
            parkData?.Data?.rows?.find((item) => item.Sequence === 4)?.ID
          }`}
        >
          <a>
            <img
              src="/images/about/btn-pic-road-sign-04.png"
              alt={parkData?.Data?.rows?.find((item) => item.Sequence === 4)?.Name}
              className={styles['sign04']}
            />
          </a>
        </Link>

        <div
          className={styles['desc']}
          style={{
            maxWidth: '400px',
            width: '30vw',
            top: '14.9%',
            right: '15%',
          }}
        >
          <div className={styles['title']}>
            【賞鳥勝地】城市秘境 與水鳥㇐起深呼吸
          </div>
          <div className={styles['content']}>
            一塊座落在城市中的國家級濕地，來此探訪不必舟車勞頓，隨時與水鳥一起深呼吸。
          </div>
        </div>

        <div
          className={styles['desc']}
          style={{
            maxWidth: '325px',
            width: '30vw',
            top: '24.3%',
            right: '24%',
          }}
        >
          <div className={styles['title']}>
            【水上運動】與水同行 享受清爽不黏膩的夏日
          </div>
          <div className={styles['content']}>
            來親身體驗風浪板、獨木舟及立式划槳等豐富的水上活動，盡情享受清爽、暢快的夏日樂趣。
          </div>
        </div>

        <div
          className={styles['desc']}
          style={{
            maxWidth: '225px',
            width: '30vw',
            top: '64%',
            left: '4%',
          }}
        >
          <div className={styles['title']}>
            【陸上運動】
            <br />
            奔向太陽 找回熱血的青春記憶
          </div>
          <div className={styles['content']}>
            無拘無束的溜冰、打棒球、玩遙控賽車，還能租借㇐塊小田地，
            栽種屬於自己的都市野菜。
          </div>
        </div>

        <div
          className={styles['desc']}
          style={{
            maxWidth: '200px',
            width: '30vw',
            top: '56.3%',
            right: '4%',
          }}
        >
          <div className={styles['title']}>
            【親子遊樂場】
            <br />
            小朋友大樂園 開心幸福一整天
          </div>
          <div className={styles['content']}>
            以「台灣原生動物」為主題，超過100組遊具設施，讓你眼花撩亂、玩心大開！
          </div>
        </div>

        <div className={styles['wrapper']} style={{ top: '12%', left: '39%' }}>
          <div className={styles['inside']}>
            <ul>{['濕地生態園區', '越野機車練習場'].map(getFacilityOption)}</ul>
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-top-right']}
            />
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-bottom-left']}
            />
          </div>
        </div>

        <div className={styles['wrapper']} style={{ top: '23%', right: '10%' }}>
          <div className={styles['inside']}>
            <ul>
              {['水上活動中心', '蘆堤寵物公園', '微風棒球場'].map(
                getFacilityOption
              )}
            </ul>
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-top-left']}
            />
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-bottom-right']}
            />
          </div>
        </div>

        <div className={styles['wrapper']} style={{ top: '44%', right: '10%' }}>
          <div className={styles['inside']}>
            <ul>
              {[
                '熊猴森樂園',
                '辰光橋',
                '婚紗廣場',
                '樂遊天地',
                '原住民主題園區',
              ].map(getFacilityOption)}
            </ul>
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-top-right']}
            />
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-bottom-left']}
            />
          </div>
        </div>

        <div className={styles['wrapper']} style={{ top: '54%', left: '2%' }}>
          <div className={styles['inside']}>
            <ul>
              {['追風溜冰場', '各球類運動設施', '遙控賽車場', '樂活農園'].map(
                getFacilityOption
              )}
            </ul>
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-top-right']}
            />
            <img
              src="/images/about/park-intro-obj-01.png"
              alt=""
              className={styles['deco-bottom-left']}
            />
          </div>
        </div>
      </div>

      <div className={styles['about-mobile']}>
        <div className={styles['mobile-wrapper']}>
          <div className={styles['about-desc']}>
            <div className={styles['wrapper']}>
              <div className={styles['inside']}>
                <ul>
                  {['濕地生態園區', '越野機車練習場'].map(getFacilityOption)}
                </ul>
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-top-right']}
                />
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-bottom-left']}
                />
              </div>
            </div>

            <div className={styles['img-bg']}>
              <img
                src="/images/home/map-park-obj-01.png"
                alt=""
                className={styles['deco01']}
              />
            </div>
          </div>

          <div className={styles['desc']}>
            <div className={styles['title']}>
              【賞鳥勝地】城市秘境 與水鳥㇐起深呼吸
            </div>
            <div className={styles['content']}>
              一塊座落在城市中的國家級濕地，來此探訪不必舟車勞頓，隨時與水鳥一起深呼吸。
            </div>
          </div>

          <div className="text-right">
            <Link
              href={`/about/detail?id=${
                parkData?.Data?.rows?.find((item) => item.Sequence === 1)?.ID
              }`}
            >
              <button className={styles['btn-main']}>
                {
                  parkData?.Data?.rows?.find((item) => item.Sequence === 1)
                    ?.Name
                }
              </button>
            </Link>
          </div>
        </div>

        <div className={styles['mobile-wrapper']}>
          <div className={styles['about-desc']}>
            <div className={styles['wrapper']}>
              <div className={styles['inside']}>
                <ul>
                  {['水上活動中心', '蘆堤寵物公園', '微風棒球場'].map(
                    getFacilityOption
                  )}
                </ul>
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-top-left']}
                />
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-bottom-right']}
                />
              </div>
            </div>

            <div className={styles['img-bg']}>
              <img
                src="/images/home/map-park-obj-02.png"
                alt=""
                className={styles['deco02']}
              />
            </div>
          </div>

          <div className={styles['desc']}>
            <div className={styles['title']}>
              【水上運動】與水同行 享受清爽不黏膩的夏日
            </div>
            <div className={styles['content']}>
              來親身體驗風浪板、獨木舟及立式划槳等豐富的水上活動，盡情享受清爽、暢快的夏日樂趣。
            </div>
          </div>

          <div className="text-right">
            <Link
              href={`/about/detail?id=${
                parkData?.Data?.rows?.find((item) => item.Sequence === 2)?.ID
              }`}
            >
              <button className={styles['btn-main']}>
                {
                  parkData?.Data?.rows?.find((item) => item.Sequence === 2)
                    ?.Name
                }
              </button>
            </Link>
          </div>
        </div>

        <div className={styles['mobile-wrapper']}>
          <div className={styles['about-desc']}>
            <div className={styles['wrapper']}>
              <div className={styles['inside']}>
                <ul>
                  {[
                    '追風溜冰場',
                    '各球類運動設施',
                    '遙控賽車場',
                    '樂活農園',
                  ].map(getFacilityOption)}
                </ul>
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-top-right']}
                />
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-bottom-left']}
                />
              </div>
            </div>

            <div className={styles['img-bg']}>
              <img
                src="/images/home/map-park-obj-03.png"
                alt=""
                className={styles['deco03']}
              />
            </div>
          </div>

          <div className={styles['desc']}>
            <div className={styles['title']}>
              【陸上運動】奔向太陽 找回熱血的青春記憶
            </div>
            <div className={styles['content']}>
              無拘無束的溜冰、打棒球、玩遙控賽車，還能租借㇐塊小田地，栽種屬於自己的都市野菜。
            </div>
          </div>

          <div className="text-right">
            <Link
              href={`/about/detail?id=${
                parkData?.Data?.rows?.find((item) => item.Sequence === 3)?.ID
              }`}
            >
              <button className={styles['btn-main']}>
                {
                  parkData?.Data?.rows?.find((item) => item.Sequence === 3)
                    ?.Name
                }
              </button>
            </Link>
          </div>
        </div>

        <div className={styles['mobile-wrapper']}>
          <div className={styles['about-desc']}>
            <div className={styles['wrapper']}>
              <div className={styles['inside']}>
                <ul>
                  {[
                    '熊猴森樂園',
                    '辰光橋',
                    '婚紗廣場',
                    '樂遊天地',
                    '原住民主題園區',
                  ].map(getFacilityOption)}
                </ul>
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-top-right']}
                />
                <img
                  src="/images/about/park-intro-obj-01.png"
                  alt=""
                  className={styles['deco-bottom-left']}
                />
              </div>
            </div>

            <div className={styles['img-bg']}>
              <img
                src="/images/home/map-park-obj-05.png"
                alt=""
                className={styles['deco04']}
              />
            </div>
          </div>

          <div className={styles['desc']}>
            <div className={styles['title']}>
              【親子遊樂場】小朋友大樂園 開心幸福一整天
            </div>
            <div className={styles['content']}>
              以「台灣原生動物」為主題，超過100組遊具設施，讓你眼花撩亂、玩心大開！
            </div>
          </div>

          <div className="text-right">
            <Link
              href={`/about/detail?id=${
                parkData?.Data?.rows?.find((item) => item.Sequence === 4)?.ID
              }`}
            >
              <button className={styles['btn-main']}>
                {
                  parkData?.Data?.rows?.find((item) => item.Sequence === 4)
                    ?.Name
                }
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
