import ReactPaginate from 'react-paginate';
import styles from './styles/pagination.module.sass';

export default function Pagination(props) {
  const { selectedPage, setSelectedPage, pageCount } = props;

  return (
    <div className={styles['container']}>
      <ReactPaginate
        previousLabel={<span>{`上一頁`}</span>}
        nextLabel={<span>{'下一頁'}</span>}
        previousClassName="btn-pre"
        nextClassName="btn-next"
        breakLabel="..."
        breakClassName={'break-me'}
        breakLinkClassName={'break-link'}
        pageLinkClassName={'page-links'}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={2}
        onPageChange={(p) => {
          setSelectedPage(p.selected);
          localStorage.setItem("newsPage", p.selected);
        }}
        containerClassName={'react-pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
        forcePage={selectedPage}
      />
    </div>
  );
}
