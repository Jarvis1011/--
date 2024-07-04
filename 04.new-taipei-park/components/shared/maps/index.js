import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './styles/maps.module.sass';
import Slider from 'react-slick';
import { sendGetRequest, sendPostRequest } from '../../../api/helper';
import { loadTgos } from '../../../utils/tgos';
import SearchBar from '../../shared/search/index';

export default function Maps() {
  const router = useRouter();
  const [parks, setParks] = useState();
  const [facilities, setFacilities] = useState();
  const [parkDetail, setParkDetail] = useState();
  const [selectedParkId, setSelectedParkId] = useState();
  const [enlargedImage, setEnlargedImage] = useState();
  const [selectedTab, setSelectedTab] = useState(1);
  const [selectedFacility, setSelectedFacility] = useState();
  const tgosLoaded = useRef(false);
  const pMap = useRef();
  const disableParkCenter = useRef(false);

  useEffect(() => {
    getParkData();
    getFacilityData();
    initTgos();
  }, []);

  useEffect(() => {
    if (!router.query.park) return;
    setSelectedParkId(router.query.park);
  }, [router.query.park]);

  useEffect(() => {
    if (!router.query.facility || !facilities) return;
    const selected = facilities.find(f => f.ID === router.query.facility);
    setSelectedFacility(selected);
  }, [router.query.facility, facilities]);

  useEffect(() => {
    if (!facilities || !tgosLoaded.current) return;
    addMarkers(facilities);
    setAllMarkerCursor();
  }, [facilities, tgosLoaded.current]);

  useEffect(() => {
    if (!facilities) return;
    removePopup();
    setAllMarkerZIndex(1);

    if (!selectedFacility) {
      setAllMarkerOpacity(1);
      return;
    }

    setAllMarkerOpacity(0.4);

    const markerDiv = document.querySelector(
      `[title="${selectedFacility.Name}"]`
    );
    markerDiv.style.zIndex = '2';
    markerDiv.style.opacity = '1';

    const desc = document.createElement('div');
    desc.id = 'map-popup';
    desc.innerHTML = getDescHtml(selectedFacility);
    desc.title = '';
    markerDiv.appendChild(desc);

    desc.querySelector('.close-btn').addEventListener('pointerup', () => {
      disableParkCenter.current = true;
      setSelectedFacility(null);
    });

    desc.querySelector('.info').addEventListener('pointerup', e => {
      e.preventDefault();
      for (const elem of e.path) {
        if (elem.localName === 'a') {
          router.push(elem.href);
          break;
        }
      }
    });

    focusOnFacility(selectedFacility);
  }, [selectedFacility, facilities]);

  useEffect(() => {
    if (!selectedFacility)
      setTimeout(() => {
        disableParkCenter.current = false;
      }, 0);
    if (!selectedFacility || !parks) return;
    const targetPark = parks.find(p => p.Name === selectedFacility.ParkName);
    if (selectedParkId !== targetPark.ID) {
      setSelectedParkId(targetPark.ID);
      setSelectedTab(1);
    }
  }, [selectedFacility, parks]);

  useEffect(() => {
    if (!selectedParkId) return;
    toTop();
    (async () => {
      const detail = await sendGetRequest(
        '/api/park/Details?id=' + selectedParkId
      );
      setParkDetail(detail);
      setEnlargedImage(detail?.AttachedFiles[0]?.FilePath);
    })();
  }, [selectedParkId]);

  useEffect(() => {
    if (!parkDetail || selectedFacility || disableParkCenter.current) return;
    const [x, y] = projectCoordinate(parkDetail.Longitude, parkDetail.Latitude);
    // console.log('set park center');
    pMap.current.setCenter(new TGOS.TGPoint(x, y));
    if (pMap.current.getZoom() < 10) {
      pMap.current.setZoom(9);
    }
  }, [parkDetail, selectedFacility, disableParkCenter.current]);

  async function getParkData() {
    const payload = {
      Limit: 10000,
      Offset: 0,
      Culture: 1,
    };
    const res = await sendPostRequest('/api/park/Paging', payload);
    setParks(res?.Data?.rows);
  }

  async function getFacilityData() {
    const payload = {
      ParkID: null,
      FacilityType: null,
      Search: '',
      Sort: 'SequenceNo',
      Order: 'desc',
      Limit: 10000,
      Offset: 0,
      Culture: 1,
    };
    const res = await sendPostRequest('/api/facility/Paging', payload);
    setFacilities(res?.Data?.rows);
  }

  function projectCoordinate(longitude, latitude) {
    const TT = new TGOS.TGTransformation();
    TT.wgs84totwd97(longitude, latitude);
    return [TT.transResult.x, TT.transResult.y];
  }

  function focusOnFacility(facility) {
    const [x, y] = projectCoordinate(facility.Longitude, facility.Latitude);
    // console.log('set facility center');
    pMap.current.setCenter(new TGOS.TGPoint(x, y));
    if (pMap.current.getZoom() < 10) {
      pMap.current.setZoom(10);
    }
  }

  async function initTgos() {
    if (!document.getElementById('tgos-script')) {
      await loadTgos();
    }
    const pOMap = document.getElementById('tgos-map');
    pOMap.innerHTML = '';
    pMap.current = new TGOS.TGOnlineMap(pOMap, TGOS.TGCoordSys.EPSG3826);
    const [x, y] = projectCoordinate(121.47613, 25.075);
    // console.log('set default center');
    pMap.current.setCenter(new TGOS.TGPoint(x, y));
    pMap.current.setZoom(9);
    tgosLoaded.current = true;
  }

  function addMarkers(facilities) {
    const iconFactor = 0.25;
    facilities.forEach(facility => {
      const [x, y] = projectCoordinate(facility.Longitude, facility.Latitude);
      const markerPoint = new TGOS.TGPoint(x, y);

      const markerImg = new TGOS.TGImage(
        (process.env.NEXT_PUBLIC_URL ?? '') +
          (!facility.IsMaintenance
            ? facility.Icon.IconPath
            : facility.Icon.MaintenanceIconPath),
        new TGOS.TGSize(138 * iconFactor, 180 * iconFactor), // 圖片的原始大小
        new TGOS.TGPoint(0, 0), // 圖片的原點位置
        new TGOS.TGPoint(30, 70) // 圖片錨點的位移距離
      );

      const pTGMarker = new TGOS.TGMarker(
        pMap.current,
        markerPoint,
        facility.Name,
        markerImg
      );

      TGOS.TGEvent.addListener(pTGMarker, 'pointerup', () => {
        setSelectedFacility(facility);
      });
    });
  }

  function removePopup() {
    const prevPopups = document.querySelectorAll('#map-popup');
    if (prevPopups.length > 0) {
      prevPopups.forEach(node => {
        node.parentElement.removeChild(node);
      });
    }
  }

  function setAllMarkerOpacity(opacity) {
    setAllMarkerStyle('opacity', opacity);
  }

  function setAllMarkerZIndex(zIndex) {
    setAllMarkerStyle('zIndex', zIndex);
  }

  function setAllMarkerCursor() {
    setAllMarkerStyle('cursor', 'pointer', true);
  }

  function setAllMarkerStyle(type, value, setChildren) {
    const firstMarkerDiv = document.querySelector(
      `[title="${facilities[0]?.Name}"]`
    );

    if (firstMarkerDiv) {
      [...firstMarkerDiv.parentElement.children].forEach((child, idx) => {
        if (idx > 0) {
          if (!setChildren) {
            child.style[type] = value.toString();
          } else {
            child.querySelector('div').style[type] = value.toString();
          }
        }
      });
    }
  }

  function getDescHtml(facility) {
    return `
      <div class="wrapper">
        <button class="close-btn"><span class="d-none">關閉</span></button>
        <div class="title">${facility.Name}</div>
        <hr></hr>
        <div class="opt-container">
          <a class="opt-button info" href="/facility-detail?id=${facility.ID}">
            <img src="/images/maps/popup-info-icon-intro.png" alt="" />
            <span>相關介紹</span>
          </a>
          <a href="https://maps.google.com/?q=${facility.Latitude},${facility.Longitude}" target="_blank" class="opt-button" rel="noopener noreferrer" title="移至Google地圖(開啟新視窗)">
            <img src="/images/maps/popup-info-icon-route.png" alt="" />
            <span>路線導引</span>
          </a>
        </div>
      </div>
    `;
  }

  function getSelectedParkData(field) {
    const selected = parks?.find(p => p.ID === selectedParkId);
    if (!selected) return;
    return selected[field];
  }

  function toTop() {
    document.querySelector('#back-top').click();
  }

  function getMapFileName(title) {
    switch (title) {
      case '五股濕地區':
        return 'maps04.png';
      case '都會運動區':
        return 'maps02.png';
      case '親子休閒區':
        return 'maps01.png';
      case '微風運河區':
        return 'maps03.png';
      default:
        return '';
    }
  }

  return (
    <div className={styles['global-map']}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 d-none d-md-block">
            <div className="d-flex" style={{ width: '200%' }}>
              <div
                className={
                  selectedParkId
                    ? `${styles['detail-map']} ${styles['active']}`
                    : styles['detail-map']
                }
              >
                <div className={styles['detail-wrapper']}>
                  {enlargedImage && (
                    <img
                      src={(process.env.NEXT_PUBLIC_URL ?? '') + enlargedImage}
                      alt=""
                      width="100%"
                      className={styles['main-img']}
                    />
                  )}

                  <div className={styles['thumbnail']}>
                    {parkDetail?.AttachedFiles?.length > 0 &&
                      parkDetail?.AttachedFiles?.map((data, index) => (
                        <img
                          key={index}
                          src={
                            (process.env.NEXT_PUBLIC_URL ?? '') + data.FilePath
                          }
                          alt=""
                          role="button"
                          tabIndex="0"
                          onClick={() => setEnlargedImage(data.FilePath)}
                        />
                      ))}
                  </div>

                  <div className={styles['title']}>
                    <img
                      src="/images/maps/icon-loc.png"
                      className={`${styles['icon-loc']} mr-1`}
                      alt=""
                    />
                    {parkDetail?.Title}
                    <small>
                      既有設施 <span>{parkDetail?.FacilityCount}</span> 項
                    </small>
                  </div>

                  <hr />

                  <div className="d-flex mb-2">
                    <button
                      className={styles['tab-wrapper']}
                      onClick={() => setSelectedTab(1)}
                    >
                      <div
                        className={`${styles['tab']} ${
                          selectedTab === 1 && styles['active']
                        }`}
                      >
                        <img
                          src="/images/maps/park-info-icon-intro.png"
                          alt=""
                        />
                      </div>
                      園區介紹
                      {selectedTab === 1 && (
                        <img src="/images/maps/tab-active-arrow.png" alt="" />
                      )}
                    </button>

                    {/* {20220324 移除交通資訊按鈕} */}
                    {/* <button className={styles['tab-wrapper']} onClick={() => setSelectedTab(2)}>
                      <div className={`${styles['tab']} ${selectedTab === 2 && styles['active']}`}>
                        <img src="/images/maps/park-info-icon-traffic.png" alt=""/>
                      </div>
                      交通資訊
                      {selectedTab === 2 && (<img src="/images/maps/tab-active-arrow.png" alt="" />)}
                    </button> */}

                    <button
                      className={styles['tab-wrapper']}
                      onClick={() => setSelectedTab(3)}
                    >
                      <div
                        className={`${styles['tab']} ${
                          selectedTab === 3 && styles['active']
                        }`}
                      >
                        <img
                          src="/images/maps/park-info-icon-facility.png"
                          alt=""
                        />
                      </div>
                      使用設施
                      {selectedTab === 3 && (
                        <img src="/images/maps/tab-active-arrow.png" alt="" />
                      )}
                    </button>

                    <div className={styles['tab-wrapper']}>
                      <a
                        href={`https://maps.google.com/?q=${getSelectedParkData(
                          'Latitude'
                        )},${getSelectedParkData('Longitude')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={"移至Google地圖(開啟新視窗)"}
                      >
                        <div
                          className={`${styles['tab']} ${
                            selectedTab === 4 && styles['active']
                          }`}
                        >
                          <img src="/images/maps/park-info-icon-route.png" alt="" />
                        </div>
                        路線導引
                      </a>
                    </div>
                  </div>

                  {selectedTab === 1 ? (
                    <div className={styles['detail-desc']}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parkDetail?.Description,
                        }}
                      />
                    </div>
                  ) : selectedTab === 2 ? (
                    <div className={styles['detail-desc']}>
                      <div className={styles['detail-title']}>【大眾運輸】</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parkDetail?.PublicTransport.replace(
                            /\n/g,
                            '<br />'
                          ),
                        }}
                        className={`mb-4`}
                      />

                      <div className={styles['detail-title']}>【自行開車】</div>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parkDetail?.SelfDrive.replace(
                            /\n/g,
                            '<br />'
                          ),
                        }}
                      />
                    </div>
                  ) : selectedTab === 3 ? (
                    <>
                      {facilities
                        ?.filter(
                          f =>
                            f.ParkName ===
                            parks.find(p => p.ID === selectedParkId)?.Name
                        )
                        .map(f => (
                          <button
                            key={f.ID}
                            className={styles['detail-desc']}
                            onClick={() => {
                              setSelectedFacility(f);
                              toTop();
                            }}
                          >
                            {f.Name}
                          </button>
                        ))}
                    </>
                  ) : null}
                </div>

                <a
                  className={styles['close-map']}
                  onClick={() => setSelectedParkId()}
                >
                  <img src="/images/maps/map-sidebar-btn-close.png" alt="" />
                </a>

                <div className={styles['map-submenu']}>
                  {parks?.map((data, index) => (
                    <a
                      key={index}
                      className={`${
                        data.ID === parkDetail?.ID && styles['active']
                      }`}
                      onClick={() => setSelectedParkId(data.ID)}
                    >
                      {data.Title}
                      {data.ID === parkDetail?.ID && (
                        <img
                          src="/images/maps/page-location-arrow.png"
                          alt=""
                          className={styles['arrow']}
                        />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              <div
                className={`${styles['lists-map']} ${
                  parkDetail ? styles['active'] : ''
                }`}
              >
                {parks?.map((data, index) => (
                  <div
                    key={index}
                    className={`${styles['wrapper']} ${
                      selectedParkId ? styles['hidden'] : ''
                    }`}
                    onClick={() => setSelectedParkId(data.ID)}
                  >
                    {data?.AttachedFiles?.length > 0 && (
                      <div
                        className={styles['main']}
                        style={{
                          background: `url('${
                            (process.env.NEXT_PUBLIC_URL ?? '') +
                            data?.ThumbImagePath
                          }') no-repeat center center`,
                        }}
                      />
                    )}

                    <div className="row">
                      <div
                        g
                        src={
                          (process.env.NEXT_PUBLIC_URL ?? '') +
                          data?.TransportImagePath
                        }
                        className="col-md-6"
                      >
                        <img
                          src={`/images/maps/${getMapFileName(data.Title)}`}
                          className={styles['location']}
                          alt=""
                        />
                      </div>
                      <div className="col-md-6">
                        <div className={styles['title']}>
                          <img
                            src="/images/maps/icon-map-location.png"
                            className={styles['marker']}
                            alt=""
                          />
                          {data.Title}
                        </div>
                        <div className={styles['desc']}>
                          既有設施 <span>{data.FacilityCount}</span> 項
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="col-lg-9 col-md-8 pt-4 pt-md-0 px-0 px-md-3">
            <div className={styles['map-pos']}>
              <div id="tgos-map" className={styles['tgmap']}></div>
              <div
                className={`${styles['scroller-menu']} ${
                  selectedParkId && styles['active']
                }`}
              >
                {selectedParkId ? (
                  <div>
                    <a
                      className={styles['close-btn']}
                      onClick={() => setSelectedParkId('')}
                    >
                      <img src="/images/maps/map-popup-btn-close.png" alt="" />
                    </a>

                    <div className={styles['title']}>
                      <img
                        src="/images/maps/icon-map-location.png"
                        alt=""
                        className="mr-2"
                        height="22"
                      />
                      {parkDetail?.Title}
                    </div>
                    <div className={`${styles['subtitle']} mb-4`}>
                      既有設施 <span>{parkDetail?.FacilityCount}</span> 項
                    </div>

                    <Slider {...imageSettings}>
                      {parkDetail?.AttachedFiles?.map((data, index) => (
                        <div key={index} className="px-5">
                          <img
                            src={
                              (process.env.NEXT_PUBLIC_URL ?? '') +
                              data.FilePath
                            }
                            width="100%"
                            style={{ objectFit: 'cover', height: '250px' }}
                          />
                        </div>
                      ))}
                    </Slider>

                    <div className="d-flex mt-4 mb-2 px-5">
                      <div className={styles['tab-wrapper']}>
                        <div
                          onClick={() => setSelectedTab(1)}
                          className={`${styles['tab']} ${
                            selectedTab === 1 && styles['active']
                          }`}
                        >
                          <img
                            src="/images/maps/park-info-icon-intro.png"
                            alt=""
                          />
                        </div>
                        <span>園區介紹</span>
                      </div>

                      <div className={styles['tab-wrapper']}>
                        <div
                          onClick={() => setSelectedTab(2)}
                          className={`${styles['tab']} ${
                            selectedTab === 2 && styles['active']
                          }`}
                        >
                          <img
                            src="/images/maps/park-info-icon-traffic.png"
                            alt=""
                          />
                        </div>
                        <span>交通資訊</span>
                      </div>

                      <div className={styles['tab-wrapper']}>
                        <div
                          onClick={() => setSelectedTab(3)}
                          className={`${styles['tab']} ${
                            selectedTab === 3 && styles['active']
                          }`}
                        >
                          <img
                            src="/images/maps/park-info-icon-facility.png"
                            alt=""
                          />
                        </div>
                        <span>使用設施</span>
                      </div>

                      <div className={styles['tab-wrapper']}>
                        <div
                          className={`${styles['tab']} ${
                            selectedTab === 4 && styles['active']
                          }`}
                        >
                          <img src="/images/maps/park-info-icon-route.png" alt="" />
                        </div>
                        <span>路線導引</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Slider {...settings}>
                    {parks?.map((data, index) => (
                      <div
                        className={styles['loc-wrapper']}
                        onClick={() => setSelectedParkId(data.ID)}
                        key={index}
                      >
                        <div
                          style={{
                            background: `url(${
                              (process.env.NEXT_PUBLIC_URL ?? '') +
                              data.ThumbImagePath
                            }) no-repeat center center`,
                          }}
                          className={styles['location']}
                        />
                        <img
                          src="/images/maps/icon-map-location.png"
                          alt=""
                          className="mr-1"
                        />
                        {data?.Title}
                      </div>
                    ))}
                  </Slider>
                )}
              </div>
            </div>
            {/* <SearchBar/> */}
          </div>
        </div>
      </div>
    </div>
  );
}

const settings = {
  arrows: false,
  dots: false,
  lazyLoad: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const imageSettings = {
  arrows: false,
  dots: false,
  lazyLoad: true,
  infinite: false,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
