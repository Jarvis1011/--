import React from 'react';
import styles from './styles/popup.module.sass';

export default function Popup({ popup, setPopup }) {
  return (
    popup && (
      <div className={styles['popup_bg']}>
        <iframe
          src={`https://www.youtube.com/embed/${popup.LinkUrl.slice(17)}`}
          title={popup.Title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <button className={styles['close']} onClick={() => setPopup('')}>
          <img src="/images/video/video-popup-btn-close.png" alt="關閉" />
        </button>
      </div>
    )
  );
}
