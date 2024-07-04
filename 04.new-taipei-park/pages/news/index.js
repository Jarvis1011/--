import { useEffect, useState } from 'react';
import { sendGetRequest, sendPostRequest } from '../../api/helper';
import Layout from '../../components/layout';
import LatestNews from '../../components/news';
import Pagination from '../../components/layout/pagination';

function News({ params, limit, data, locale, setPageTitle }) {
  const [lists, setLists] = useState();
  const [selectedPage, setSelectedPage] = useState(null);
  const [searching, setSearching] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [stopDate, setStopDate] = useState(null);
  const [category, setCategory] = useState('');

  // useEffect(() => {
  //   // setLists(data?.Data);
  // }, [data]);
  useEffect(() => {
    console.log(localStorage.newsPage)
    if (localStorage.newsPage !== undefined) {
      setSelectedPage(parseInt(localStorage.newsPage));
      setTimeout(() => {
        localStorage.removeItem("newsPage");
      }, 120 * 1000);
    }
    if (selectedPage === null) return;
    setSearching(true);
  }, [selectedPage]);

  useEffect(() => {
    (async () => {
      const payload = {
        Limit: limit,
        Offset: selectedPage * limit,
        Culture: 1,
        Search: searchString ?? null,
        StartTime: startDate ?? null,
        EndTime: stopDate ?? null,
        Category: category,
      };
      const res = await sendPostRequest('/api/articleArea/Paging', payload);
      setLists(res.Data);
      setSearching(false);
    })();
  }, [searching, searchString, selectedPage, category]);

  const breadcrumbs = [{ title: '最新消息' }];
  return (
    <Layout
      pageTitle={'最新消息'}
      setPageTitle={setPageTitle}
      pageSub={`目前總共有 <span>${lists?.total}</span> 則最新消息。`}
      img={{
        img_main: `/images/news/title-obj-news-01.png`,
        img_sub: `/images/news/title-obj-news-02.png`,
      }}
      breadcrumbs={breadcrumbs}>
      <LatestNews
        data={lists}
        params={params}
        setSearchString={setSearchString}
        setSearching={setSearching}
        setStartDateString={setStartDate}
        setStopDateString={setStopDate}
        categoryString={category}
        setCategoryString={setCategory}
        setSelectedPageString={setSelectedPage}
      />
      {lists?.total > 0 && (
        <Pagination
          pageCount={Math.ceil(lists?.total / limit)}
          selectedPage={selectedPage}
          setSelectedPage={setSelectedPage}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { locale } = context;
  const limit = 15;
  const payload = {
    Limit: limit,
    Offset: 0,
    Culture: 1,
  };
  const data = {};
  const params = await sendGetRequest('/api/articleArea/Index?culture=1');

  return {
    props: {
      data,
      params,
      limit,
      locale,
    },
  };
}

export default News;
