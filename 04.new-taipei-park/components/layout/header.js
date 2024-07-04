import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import massage from '../../data/i18n/messages'
import styles from './styles/header.module.sass';

export default function Header(props) {
  const [menu, setMenu] = useState(false);
  const router = useRouter();
  const [fontSize, setFontSize] = useState('medium');
  const [searchValur, setSearchValur] = useState('');
  const { locale } = router;
  const [reWidth, setReWidth] = useState('M');
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handlerResize = () => {
      // const innerWidth = window.innerWidth
      // if (innerWidth > 1350) {
      //   setReWidth('L');
      // } else if (innerWidth <= 1350 && innerWidth > 980) {
      //   setReWidth('M')
      // } else {
      //   setReWidth('S')
      // }
      // if (window.innerWidth <= 500 && reWidth.width === 460) {
      //   setReWidth({ width: 338, height: 400 });
      // } else if (window.innerWidth >= 550) {
      //   setReWidth({ width: 460, height: 450 });
      // }

      // if (window.innerWidth < 768) {
      //   setIsMobile(true);
      // } else if (window.innerWidth > 767) {
      //   setIsMobile(false);
      // }
    };
    handlerResize();
    window.addEventListener('resize', handlerResize);
    return () => {
      window.removeEventListener('resize', handlerResize);
      document.body.style.overflow = 'auto';
    };
  }, []);

  function openMobileMenu(status) {
    if (status === true) {
      setMenu(true);
      document.body.style.overflow = 'hidden';
    }
    else {
      setMenu(false);
      document.body.style.overflow = 'auto';
    }
  }

  useEffect(() => {
    const point = fontSize === 'large' ? '1.25'
      : fontSize === 'medium' ? '1' : '0.875';
    const fontSizeEl = document.getElementsByTagName('html')[0];
    fontSizeEl.style.fontSize = `${point}rem`;
    if (props.setFontSizeString !== undefined) {
      props.setFontSizeString(fontSize);
    }
  }, [fontSize]);

  const show = locale === 'tw'

  return (
    <>
      <header>
        <div className={styles['subheader']}>
          <div className={styles['desktop-sub']}>
            <img src="/images/header/header-deco-01.png" alt="" className={styles['deco01']} />
            <img src="/images/header/header-deco-02.png" alt="" className={styles['deco02']} />
            <div className="container d-flex">
              <a href="#C" className={styles['to-main-content']}>
                {massage[`${locale}`].to_main_content}
              </a>
              <a
                id="U"
                className={styles['guide-brick']}
                accessKey="U"
                href="#U"
                title={massage[`${locale}`].top_area}
                aria-hidden="true"
              >
                :::
              </a>
              <div className={styles['left-part']}>
                {show && (
                  <>
                    <Link href="/sitemap">
                      <a title="移至網站導覽">
                        <img src="/images/header/icon-app.png" alt="" className="mr-2" />網站導覽
                      </a>
                    </Link>
                    <span className={styles['divider']}>|</span>
                    <label className="d-none" htmlFor="search">請輸入關鍵字搜尋</label>
                    <input
                      type="text"
                      id="search"
                      placeholder="請輸入關鍵字搜尋"
                      title="請輸入關鍵字搜尋"
                      onChange={(e) => setSearchValur(e.target.value)}
                    />
                    <a href={`/search?q=${searchValur}`} className={styles['search']} title={massage[`${locale}`].keyword_search}>
                      <img src="/images/header/search-icon.svg" alt={massage[`${locale}`].search} />
                    </a>
                  </>
                )}
              </div>

              <div className={styles['right-part']}>
                <a href="https://www.facebook.com/waternewtaipei/" target="_blank" rel="noopener noreferrer" title={massage[`${locale}`].move_watemew}>
                  <img src="/images/header/icon-fb.png" alt="" className="mr-2" />
                  <span>{massage[`${locale}`].fb}</span>
                </a>
                <span className={styles['divider']}>|</span>

                <a className={`${styles['language']} ${locale === 'tw' && styles['active']}`} href="#" title="切換至中文語系"
                  onClick={() => router.push('/', '', { locale: 'tw', })}
                >中文</a>

                <a className={`${styles['language']} ${locale === 'en' && styles['active']}`} href="#" title="Switch to English language"
                  onClick={() => router.push('/', '', { locale: 'en', })}
                >ENGLISH</a>

                <a className={`${styles['language']} ${locale === 'jp' && styles['active']}`} href="#" title="日本語に切り替える"
                  onClick={() => router.push('/', '', { locale: 'jp', })}
                >日本語</a>

                <a className={`${styles['language']} ${locale === 'kr' && styles['active']}`} href="#" title="한국어로 전환"
                  onClick={() => router.push('/', router.pathname, { locale: 'kr', })}
                >한국어</a>
                <span className={styles['divider']}>|</span>

                <button
                  className={`${styles['font-changer']} ${fontSize === 'small' ? styles['active'] : ''}`}
                  onClick={() => setFontSize('small')}
                  title={massage[`${locale}`].font_size_to_S}
                >{massage[`${locale}`].t_s}</button>

                <button
                  className={`${styles['font-changer']} ${fontSize === 'medium' ? styles['active'] : ''}`}
                  onClick={() => setFontSize('medium')}
                  title={massage[`${locale}`].font_size_to_M}
                >{massage[`${locale}`].t_m}</button>

                <button
                  className={`${styles['font-changer']} ${fontSize === 'large' ? styles['active'] : ''}`}
                  onClick={() => setFontSize('large')}
                  title={massage[`${locale}`].font_size_to_L}
                >{massage[`${locale}`].t_l}</button>
              </div>
            </div>
          </div>

          <div className={styles['mobile-sub']}>
            <div className={styles['mobile-logo']}>
              <h1>
                <Link href="/">
                  <a title={massage[`${locale}`].logo_title}>
                    <img src="/images/mobile/mobile-logo-header.png" alt={massage[`${locale}`].logo_title} />
                  </a>
                </Link>
              </h1>
            </div>

            <img src="/images/header/header-deco-05.png" alt="" className={styles['mobile-deco']} />

            <a href="#!" className={styles['mobile-menu']} onClick={() => openMobileMenu(!menu)} title={massage[`${locale}`].open_menu}>
              <img src="/images/mobile/mobile-menu-btn.png" alt={massage[`${locale}`].burger_menu} />
            </a>
          </div>
        </div>

        <div className={styles['header']}>
          <img src="/images/header/header-deco-03.png" alt="" className={styles['deco03']} />
          <img src="/images/header/header-deco-04.png" alt="" className={styles['deco04']} />
          <img src="/images/header/header-deco-05.png" alt="" className={styles['deco05']} />
          <div className="container">
            <div className="row col-xl-12 col-lg-12 mx-auto">
              <div className="col-md-2 ml-auto">
                {show && (<Link href={'/about'}>
                  <a className={styles['nav-link-right']} title="移至新北大都會公園介紹">
                    <img src="/images/header/nav-icon-01.png" alt="" className={styles['nav-icon']} />
                    <span>{reWidth === 'L' || reWidth === 'M' ? '新北' : ''}大都會公園介紹</span>
                  </a>
                </Link>)}
              </div>
              <div className="col-md-2">
                {show && (<Link href={'/maps'}>
                  <a className={styles['nav-link']} title="移至園區設施地圖">
                    <img src="/images/header/nav-icon-02.png" alt="" className={styles['nav-icon']} />
                    <span>園區設施地圖</span>
                  </a>
                </Link>)}
              </div>
              <div className="col-md-3 text-center">
                <h1>
                  <Link href={'/'}>
                    <a title={massage[`${locale}`].logo_title}>
                      <img src="/images/logo.png" alt={massage[`${locale}`].logo_title} className={styles['main-logo']} />
                    </a>
                  </Link>
                </h1>
              </div>
              <div className="col-md-2">
                {show && (<Link href={'/park-rental'}>
                  <a className={styles['nav-link-right']} title="移至園區場地租借">
                    <img src="/images/header/nav-icon-03.png" alt="" className={styles['nav-icon']} />
                    <span>園區場地租借</span>
                  </a>
                </Link>)}
              </div>
              <div className="col-md-2 mr-auto">
                {show && (<Link href={'/news'}>
                  <a className={styles['nav-link']} title="移至最新消息">
                    <img src="/images/header/nav-icon-04.png" alt="" className={styles['nav-icon']} />
                    <span>最新消息</span>
                  </a>
                </Link>)}
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={`${styles['mobile-nav']} ${menu && styles['active']}`}>
        {locale === 'tw' && (
          <div className="d-flex px-3">
            <div className={styles['bar-left']}>
              <Link href="/sitemap">
                <a title="移至網站導覽">
                  <img src="/images/header/grid-small.png" alt="" className="mr-2" />{' '}網站導覽
                </a>
              </Link>
              <span className="mx-3">|</span>
            </div>
            <div className={styles['bar-right']}>
              <label htmlFor="search" className="d-none">站內搜尋</label>
              <input id="search" type="text" className="form-control" placeholder="站內搜尋" />
              <button>
                <img src="/images/header/icon-search.png" alt="" />
                <span className='d-none'>搜尋</span>
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className={`${styles['language']} ${locale === 'tw' && styles['active']}`}
            title="切換至中文語系"
            onClick={() => { router.push('/', router.pathname, { locale: 'tw', }); openMobileMenu(false); }}
          >中文</button>

          <button
            className={`${styles['language']} ${locale === 'en' && styles['active']}`}
            title="Switch to English language"
            onClick={() => { router.push('/', router.pathname, { locale: 'en', }); openMobileMenu(false); }}
          >ENGLISH</button>

          <button
            className={`${styles['language']} ${locale === 'jp' && styles['active']}`}
            title="日本語に切り替える"
            onClick={() => { router.push('/', router.pathname, { locale: 'jp', }); openMobileMenu(false); }}
          >日本語</button>

          <button
            className={`${styles['language']} ${locale === 'kr' && styles['active']}`}
            title="한국어로 전환"
            onClick={() => { router.push('/', router.pathname, { locale: 'kr', }); openMobileMenu(false); }}
          >한국어</button>
        </div>

        <hr className="my-4" />

        <div className="text-center mb-5">
          <button
            className={styles['font-changer']}
            title={massage[`${locale}`].font_size_to_S}
            onClick={() => { setFontSize('small'); setFont }}
          >{massage[`${locale}`].t_s}</button>
          <button
            className={styles['font-changer']}
            title={massage[`${locale}`].font_size_to_M}
            onClick={() => setFontSize('medium')}
          >{massage[`${locale}`].t_m}</button>
          <button
            className={styles['font-changer']}
            title={massage[`${locale}`].font_size_to_L}
            onClick={() => setFontSize('large')}
          >{massage[`${locale}`].t_l}</button>
        </div>

        {locale === 'tw' && (
          <div className="row mb-5 text-center">
            <div className="col-6">
              <Link href="/about">
                <a className={styles['navlink']} title="移至新北大都會公園介紹">
                  <img src="/images/sitemap/nav-icon-01.png" alt="" /><div>新北大都會公園介紹</div>
                </a>
              </Link>
            </div>
            <div className="col-6">
              <Link href="/park-rental">
                <a className={styles['navlink']} title="移至園區場地租借">
                  <img src="/images/sitemap/nav-icon-03.png" alt="" /><div>園區場地租借</div>
                </a>
              </Link>
            </div>

            <div className="col-6">
              <Link href="/maps">
                <a className={styles['navlink-normal']} title="移至園區設施地圖">
                  <img src="/images/sitemap/nav-icon-02.png" alt="" /><div>園區設施地圖</div>
                </a>
              </Link>
            </div>
            <div className="col-6">
              <Link href="/news">
                <a className={styles['navlink-normal']} title="移至最新消息">
                  <img src="/images/sitemap/nav-icon-04.png" alt="" /><div>最新消息</div>
                </a>
              </Link>
            </div>
          </div>
        )}

        <div className="text-center mb-5">
          <a href="https://www.facebook.com/waternewtaipei/" target="_blank" rel="noopener noreferrer" title={massage[`${locale}`].move_watemew}>
            <img src="/images/header/icon-fb-blue.png" alt="" className="mr-2" />{` `}{massage[`${locale}`].fb}
          </a>
        </div>

        <div className="text-center mb-5">
          <a href="#!" className={styles['close-btn']} onClick={() => openMobileMenu(false)}>
            <img src="/images/header/sharp-close.png" alt="" />
          </a>
        </div>
      </div>
    </>
  );
}
