import Layout from '../../components/layout';
import SearchPage from '../../components/search'

const Search = ({setPageTitle}) => {
  const breadcrumbs = [{ title: '搜尋結果' }];

  return (
    <Layout
      pageTitle={'搜尋結果'}
      setPageTitle={setPageTitle}
      pageSub={`目前總共有 <span>${'0'}</span> 則搜尋結果。`}
      img={{
        img_main: `/images/news/title-obj-news-01.png`,
        img_sub: `/images/news/title-obj-news-02.png`,
      }}
      breadcrumbs={breadcrumbs}
    >
      <SearchPage/>
    </Layout>
  );
};

export default Search;