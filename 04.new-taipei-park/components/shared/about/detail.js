import React from 'react';
import styles from './styles/about.module.sass';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { sendPostRequest } from '../../../api/helper';
import { useRouter } from 'next/router';
import Link from 'next/link';
import messages from '../../../data/i18n/messages';

export default function Content({ data, isMobile }) {
  const [otherPark, setOtherPark] = useState();
  const [recommand, setRecommand] = useState();

  const router = useRouter();
  const notForeign = router.locale === 'tw';

  const settings = {
    arrows: true,
    dots: false,
    lazyLoad: true,
    infinite: true,
    speed: 1250,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  useEffect(() => {
    async function getData() {
      const payload = {
        Limit: 5,
        Offset: 0,
        Culture: 1,
      };
      const payload2 = {
        ParkID: router.query.id,
        FacilityType: null,
        Search: '',
        Sort: 'SequenceNo',
        Order: 'desc',
        Limit: 9999,
        Offset: 0,
        Culture: 1,
        IsShowRecommend: true
      };
      const res = await sendPostRequest('/api/park/Paging', payload);
      const otherParkResult = res.Data.rows.filter(
        itm => itm.SequenceNo !== data.SequenceNo
      );

      const res2 = await sendPostRequest('/api/facility/Paging', payload2);
      const recommandResult = res2.Data.rows;

      setOtherPark(otherParkResult);
      setRecommand(recommandResult);

      // var dots = document.querySelectorAll(".slick-dots button");
      // if (dots && dots.length > 0) {
      //   for (var i = 0; i < dots.length; i++) {
      //     dots[i].setAttribute("title", messages[`${router.locale}`].dots_banner_title);
      //   }
      // }
    }
    getData();
  }, []);

  useEffect(() => {
    if (!recommand) return;
  }, [recommand]);

  function getMapFileName(title) {
    switch (title) {
      case '五股濕地區': return 'maps04.png';
      case '都會運動區': return 'maps02.png';
      case '親子休閒區': return 'maps01.png';
      case '微風運河區': return 'maps03.png';
      default: return '';
    }
  }

  function getForeignData(locale, id) {
    switch (id) {
      case '1e9bd2c4-04e1-41ee-a09a-b9cbc7f5bbba': // 五股
        return {
          title: messages[`${locale}`]?.map_title_01,
          picture: [
            {
              name: messages[`${locale}`]?.park_area1_01,
              fileName: `foreign_01_01.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area1_02,
              fileName: `foreign_01_02.jpg`,
            },
          ],
        };
      case '0e2c5577-150d-4e9c-92ea-653d341736d9': // 微風運河
        return {
          title: messages[`${locale}`]?.map_title_02,
          picture: [
            {
              name: messages[`${locale}`]?.park_area2_01,
              fileName: `foreign_02_01.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area2_02,
              fileName: `foreign_02_02.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area2_03,
              fileName: `foreign_02_03.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area2_04,
              fileName: `foreign_02_04.jpg`,
            },
          ],
        };
      case '80ff13d2-22f4-4412-814b-5f11e89a1ea7': // 都會運動區
        return {
          title: messages[`${locale}`]?.map_title_03,
          picture: [
            {
              name: messages[`${locale}`]?.park_area3_01,
              fileName: `foreign_03_01.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area3_02,
              fileName: `foreign_03_02.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area3_03,
              fileName: `foreign_03_03.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area3_04,
              fileName: `foreign_03_04.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area3_05,
              fileName: `foreign_03_05.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area3_06,
              fileName: `foreign_03_06.jpg`,
            },
          ],
        };
      case 'd05ddf30-fdc6-4974-94fe-dab80e1013f3': // 親子休閒區
        return {
          title: messages[`${locale}`]?.map_title_04,
          picture: [
            {
              name: messages[`${locale}`]?.park_area4_01,
              fileName: `foreign_04_01.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_02,
              fileName: `foreign_04_02.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_03,
              fileName: `foreign_04_03.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_04,
              fileName: `foreign_04_04.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_05,
              fileName: `foreign_04_05.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_06,
              fileName: `foreign_04_06.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_07,
              fileName: `foreign_04_07.jpg`,
            },
            {
              name: messages[`${locale}`]?.park_area4_08,
              fileName: `foreign_04_08.jpg`,
            },
          ],
        };
    }
  }

  const foreignData = getForeignData(router.locale, data.ID);
  return notForeign ? (
    <div className={styles['content']}>
      <div className="container mb-5">
        <div className="row mt-4">
          <div className="col-md-12 mb-3">
            <div className={styles['title']}>{data.Title}</div>
          </div>
        </div>

        {data?.AttachedFiles?.length > 0 && (
          <Slider {...settings} className="slick-detail">
            {data?.AttachedFiles?.map((item, index) => {
              const { FilePath } = item;
              const unThumbImgPath = FilePath.replace('_thumb', '');
              return (
                <div
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                  }}
                >
                  <img src={(process.env.NEXT_PUBLIC_URL ?? '') + unThumbImgPath} alt={data.Title} key={index} className="detial-img" />
                </div>
              );
            })}
          </Slider>
        )}

        <div
          dangerouslySetInnerHTML={{ __html: data.Description.replace(/\n/g, '<br />'), }}
          className={`${styles['description']} mt-5`}
        />
        <hr />

        <div className={styles['title']}>【交通地圖】</div>
        <img
          src={(process.env.NEXT_PUBLIC_URL ?? '') + data.TransportImagePath}
          alt={data.Title + "周邊景點及交通路線圖，包含下方遊玩推薦的景點"}
          height="auto" />
        <div className="container mt-3">
          <div className="row justify-content-center">
            <Link href={`/maps?park=${router.query.id}`}>
              <a className="strip_btn mx-2" title="移至線上設施地圖檢視">
                <img className="mr-1" src="/images/map-marker.png" alt="" /> 前往線上地圖檢視
              </a>
            </Link>
          </div>
        </div>

        <hr />

        <div className="text-left">
          <div className={styles['big-title']}>遊玩推薦</div>
          <div className="row my-3">
            {recommand?.map((item, idx) => {
              const { Name, ImagePath, ID } = item;

              return (
                <div className="col-4" key={idx}>
                  <div className={styles['recommand_area']}>
                    <div className={styles['img_box']}>
                      <img src={(process.env.NEXT_PUBLIC_URL ?? '') + ImagePath.replace('_thumb', '')} alt="" />
                    </div>
                    <div className={styles['big-title']}>{Name}</div>
                    <div className={styles['links']}>
                      <div className={styles['link']}>
                        <Link href={`/facility-detail?id=${ID}`}>
                          <a className={styles['icon']} title="移至相關介紹">
                            <img src="/images/about/rec-att-icon-intro.png" alt="相關介紹" />
                          </a>
                        </Link>
                        <p>相關介紹</p>
                      </div>
                      <div className={styles['link']}>
                        <Link href={`/maps?facility=${ID}`}>
                          <a className={styles['icon']} title="移至所在位置">
                            <img src="/images/about/rec-att-icon-map.png" alt="所在位置" />
                          </a>
                        </Link>
                        <p>所在位置</p>
                      </div>
                      <div className={styles['link']}>
                        <a href={`https://maps.google.com/?q=${item.Latitude},${item.Longitude}`} target="_blank" className={styles['icon']} rel="noopener noreferrer" title="移至Google地圖(開啟新視窗)">
                          <img src="/images/about/rec-att-icon-route.png" alt="路線導引" />
                        </a>
                        <p>路線導引</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr />

        <div className="text-center">
          <div className={styles['big-title']} style={{ marginBottom: '6rem' }}>其他園區介紹</div>
          <div className={`col-12 d-flex justify-content-center`} style={{ overflowX: 'scroll' }}>
            {otherPark?.map((item, idx) => {
              const {
                FacilityCount,
                Name,
                ThumbImagePath,
                TransportImagePath,
              } = item;
              return (
                <div className={styles['other_area']} key={idx}>
                  <div className={styles['gallery']}>
                    <img src={(process.env.NEXT_PUBLIC_URL ?? '') + ThumbImagePath} alt="" />
                    {/* <div className={styles['btn_area']}>
                      <div
                        className={`${styles['diamond']} ${styles['active']}`}
                      ></div>
                      <div className={styles['diamond']}></div>
                      <div className={styles['diamond']}></div>
                    </div> */}
                  </div>
                  <div className={styles['info']}>
                    <div className={styles['map']}>
                      <img src={`/images/maps/${getMapFileName(Name)}`} alt="" />
                    </div>
                    <div className={styles['text']}>
                      <div className={styles['place']}>
                        <img src="/images/about/icon-map-location.png" className={`${styles['icon-loc']} mr-1`} alt="" />
                        <span>{Name}</span>
                      </div>
                      <small>既有設施 <span>{FacilityCount}</span> 項</small>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  ) : (
    // 外文網站顯示內容
    <div className={styles['content']}>
      <div className="container mb-5">
        <div className="row mt-4">
          <div className="col-md-12 mb-3">
            <div className={styles['big-title']}>{data.Title}</div>
          </div>
        </div>

        {data?.AttachedFiles?.length > 0 && (
          <Slider {...settings} className="slick-detail">
            {data?.AttachedFiles?.map((item, index) => {
              const { FilePath } = item;
              const unThumbImgPath = FilePath.replace('_thumb', '');
              return (
                <div
                  style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                    margin: 'auto',
                  }}
                >
                  <img
                    src={(process.env.NEXT_PUBLIC_URL ?? '') + unThumbImgPath}
                    alt={data.Title + messages[`${router.locale}`].ecological_env + (index + 1)}
                    key={index}
                    className="detial-img" />
                </div>
              );
            })}
          </Slider>
        )}

        <div dangerouslySetInnerHTML={{ __html: data.Description.replace(/\n/g, '<br />'), }} className={`${styles['description']} mt-5`} />
        <hr />

        <div className={styles['title']}>{`【${messages[`${router.locale}`].traffic_map}】`}</div>
        <img
          src={(process.env.NEXT_PUBLIC_URL ?? '') + data.TransportImagePath}
          alt={data.Title + messages[`${router.locale}`].traffic_info}
          height="auto" />
        <hr />
        <div className="text-left">
          <div className={styles['big-title']}>{messages[`${router.locale}`].recommendation}</div>
          <div className={isMobile ? 'col-12 d-flex flex-nowrap' : 'row my-3'} style={isMobile ? { overflowY: 'hidden', overflowX: 'scroll' } : {}}>
            {foreignData.picture?.map((item, idx) => {
              return (
                <div className={isMobile ? 'col-8' : "col-4"} key={idx} style={isMobile ? { padding: '0px 10px' } : {}}>
                  <div className={styles['recommand_area']}>
                    <div className={styles['img_box']}>
                      <img src={`../../images/foreign/${item.fileName}`} alt={item.name} />
                    </div>
                    <div className={styles['title']}>{item.name}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <hr />

        <div className="text-center">
          <div className={styles['big-title']} style={{ marginBottom: `${isMobile ? 2 : 6}rem` }}>{messages[`${router.locale}`].additional_introduction}</div>
          <div className={`col-12 d-flex ${isMobile ? 'flex-nowrap' : 'justify-content-center'}`} style={isMobile ? { overflowY: 'hidden', overflowX: 'scroll' } : {}}>
            {otherPark?.map((item, idx) => {
              const {
                FacilityCount,
                Name,
                ThumbImagePath,
                TransportImagePath,
                ID,
              } = item;
              return (
                <a href="#!" title={messages[`${router.locale}`].move_to_page + getForeignData(router.locale, item.ID).title}>
                  <div className={styles['other_area']} key={idx} onClick={() => router.push(`/foreign/detail?id=${ID}`)} >
                    <div className={styles['gallery']}>
                      <img
                        src={(process.env.NEXT_PUBLIC_URL ?? '') + ThumbImagePath}
                        alt={getForeignData(router.locale, item.ID).title + ' ' + messages[`${router.locale}`].panoramic} />
                    </div>
                    <div className={styles['info']}>
                      <div className={styles['map']}>
                        <img
                          src={`/images/maps/${getMapFileName(Name)}`}
                          alt={getForeignData(router.locale, item.ID).title + ' ' + messages[`${router.locale}`].map} />
                      </div>
                      <div className={styles['text']}>
                        <div className={styles['place']}>
                          <img src="/images/about/icon-map-location.png" className={`${styles['icon-loc']} mr-1`} alt="" />
                          <span>{getForeignData(router.locale, item.ID).title}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  const router = useRouter();
  return (
    <a
      href="#!"
      title={messages[`${router.locale}`].prev_banner_title}
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'scale(1, 1) translate(50px, -20px)',
        width: '50px',
        height: 'auto',
        zIndex: 5,
      }}
      onClick={onClick}
    >
      <img src="/images/home/slider-arrow-prev.png" alt={messages[`${router.locale}`].prev} />
    </a>
  );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  const router = useRouter();
  return (
    <a
      href="#!"
      title={messages[`${router.locale}`].next_banner_title}
      className={className}
      style={{
        ...style,
        display: 'block',
        transform: 'scale(-1, 1) translate(50px, -20px)',
        width: '50px',
        height: 'auto',
      }}
      onClick={onClick}
    >
      <img src="/images/home/slider-arrow-prev.png" alt={messages[`${router.locale}`].next} />
    </a>
  );
}
