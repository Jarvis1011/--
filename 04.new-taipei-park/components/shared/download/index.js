import styles from './styles/download.module.sass';

const DownloadArea = ({ data }) => {
  return (
    <div className="container">
      <div className={styles['download-area']}>
        <div className="row">
          <div className="col-md-5 mx-auto">
            <div className={styles['wrapper']}>
              <div className={styles['dots-right']} />
              <div className={styles['dots-left']} />

              <div className="text-center mb-4">相關附件檔案下載</div>
              <div className="row">
                {data?.map((item, index) => (
                  <div className="col-md-4 mb-2 text-center" key={index}>
                    <a
                      className={styles['file-box']}
                      title={item.FileName + "(開啟新視窗)"}
                      target="_blank"
                      href={(process.env.NEXT_PUBLIC_URL ?? '') + item.FilePath}
                    >
                      <img
                        src={
                          item.FileExtension === '.odt'
                            ? '/images/park/file-icon-doc.png'
                            : item.FileExtension === '.ods'
                            ? '/images/park/file-icon-xls.png'
                            : '/images/park/file-icon-pdf.png'
                        }
                        alt={item.ItemType + '檔案下載'}
                      />
                      <span>{item.Description}</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadArea;
