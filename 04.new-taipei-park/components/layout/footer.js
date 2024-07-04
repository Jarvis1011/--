import styles from './styles/footer.module.sass';
import Link from 'next/link';
// import AnchorLink from 'react-anchor-link-smooth-scroll';
import massage from '../../data/i18n/messages'
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();
  const { locale } = router;
  return (
    <footer className={styles['footer']}>
      {/* <AnchorLink href="#app">
        <img
          src="/images/mobile/btn-back-to-top.png"
          alt={massage[`${locale}`].back_to_top}
          className={styles['back-top-mobile']}
        />
      </AnchorLink> */}

      <img src="/images/footer/footer-obj-02.png" alt="" className={styles['deco01']} />
      <img src="/images/footer/footer-obj-01.png" alt="" className={styles['deco02']} />
      <img src="/images/footer/footer-obj-03.png" alt="" className={styles['deco03']} />
      <img src="/images/footer/footer-obj-04.png" alt="" className={styles['deco04']} />

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className={styles['footer-top']}>
              <a
                id="Z"
                className={`${styles['tile']} desktop-only`}
                accessKey="Z"
                href="#Z"
                title={massage[`${locale}`].footer_area}
                style={{
                  height: '30px',
                }}
              >
                :::
              </a>
              <img src="/images/footer/logo-footer.png" alt="" className={styles['logo-footer']} />
              <div className={styles['copyrights']}>HRCM, NTPC © 2022. All rights reserved.</div>
              <div className={styles['social-media']}>
                <a href="https://www.facebook.com/waternewtaipei/" target="_blank" rel="noopener noreferrer" title={massage[`${locale}`].move_watemew}>
                  <img src="/images/footer/icon-fb.png" alt="" />
                  {massage[`${locale}`].fb}
                </a>

                {locale === 'tw' && (
                  <>
                    <span>|</span>
                    <Link href="/faq">
                      <a rel="noopener noreferrer" title="移至常見問題">
                        <img src="/images/footer/icon-qa-title.png" alt="" />常見問題
                      </a>
                    </Link>
                    <span>|</span>
                    <a href="https://www.hrcm.ntpc.gov.tw/Home/DirectorMailbox" target="_blank" rel="noopener noreferrer" title="移至意見信箱(開啟新視窗)" >
                      <img src="/images/footer/icon-mail.png" alt="" />意見信箱
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="col-md-6 text-right">
            {locale === 'tw' &&
              (
                <div className={styles['other-mobile']}>
                  <Link href="/web-security">
                    <a title="移至網站安全政策">網站安全政策</a>
                  </Link>
                  <span>|</span>
                  <Link href="/privacy-policy">
                    <a title="移至隱私權及資訊安全宣告">隱私權及資訊安全宣告</a>
                  </Link>
                  <span>|</span>
                  <Link href="/open-declaration">
                    <a title="移至政府網站資料開放宣告">政府網站資料開放宣告</a>
                  </Link>
                </div>
              )}

            <div className={styles['contact']}>
              <div>
                <a href="https://www.hrcm.ntpc.gov.tw/Home" target="_blank" rel="noopener noreferrer" title={massage[`${locale}`].move_hrcm}>
                  {massage[`${locale}`].address_1}
                  <img src="/images/footer/mdi-link-box.png" alt="" />
                </a>
              </div>
              <div>
                <a title={massage[`${locale}`].click_call_me} href="tel:+886-2-89699596">(02)8969-9596<img src="/images/footer/mdi-phone.png" alt="" />
                </a>
              </div>
              <div>
                <a
                  href="https://www.google.com.tw/maps/place/220%E6%96%B0%E5%8C%97%E5%B8%82%E6%9D%BF%E6%A9%8B%E5%8D%80%E7%92%B0%E6%B2%B3%E8%A5%BF%E8%B7%AF%E4%BA%94%E6%AE%B5502%E8%99%9F"
                  target="_blank"
                  rel="noopener noreferrer"
                  title={massage[`${locale}`].move_google_map}
                >
                  {massage[`${locale}`].address_2}
                  <img src="/images/footer/mdi-map-marker.png" alt="" />
                </a>
              </div>
            </div>

            {locale === 'tw' && (
              <div className={styles['other']}>
                <Link href="/web-security">
                  <a title="移至網站安全政策">網站安全政策</a>
                </Link>
                <span>|</span>
                <Link href="/privacy-policy">
                  <a title="移至隱私權及資訊安全宣告">隱私權及資訊安全宣告</a>
                </Link>
                <span>|</span>
                <Link href="/open-declaration">
                  <a title="移至政府網站資料開放宣告">政府網站資料開放宣告</a>
                </Link>
              </div>
            )}

            <div className={styles[`${locale === 'tw' ? 'accessibility' : 'accessibility-foreign'}`]}>
              <a href="https://accessibility.moda.gov.tw/Applications/Detail?category=20221209091058" target="blank" title={massage[`${locale}`].accessibility_info}>
                <img src="/images/footer/icon-aa.png" alt={massage[`${locale}`].accessibility_pass} />
              </a>
              <a href="https://www.gov.tw/" target="_blank" rel="noopener noreferrer" title={massage[`${locale}`].move_my_gov}>
                <img src="/images/footer/icon-gov.png" alt={massage[`${locale}`].my_gov} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Link href="#app">
        <a title={massage[`${locale}`].back_to_top} className={styles['back-top']}>
          <img id="back-top" src="/images/footer/btn-back-to-top.png" alt={massage[`${locale}`].back_to_top} />
        </a>
      </Link>
    </footer>
  );
};

export default Footer;
