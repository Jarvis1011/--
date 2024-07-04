import Layout from '../../components/layout';
import Content from '../../components/news/detail';
import DownloadArea from '../../components/download';
import { sendGetRequest } from '../../api/helper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const News = ({setPageTitle}) => {
  const [detail, setDetail] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    async function getData() {
      if (id) {
        const detail = await sendGetRequest(
          '/api/articleArea/Details?id=' + id
        );
        setDetail(detail);
      }
    }
    getData();
  }, [id]);

  const breadcrumbs = [
    {
      title: '最新消息',
      link: '/news',
    },
    {
      title: detail?.Title,
    },
  ];

  return (
    <Layout
      pageTitle={'最新消息'}
      setPageTitle={setPageTitle}
      pageSub={'最新消息內容'}
      img={{
        img_main: `/images/news/title-obj-news-01.png`,
        img_sub: `/images/news/title-obj-news-02.png`,
      }}
      breadcrumbs={breadcrumbs}>
      <Content data={detail} />
      {detail?.AttachedFiles?.length > 0 && (
        <DownloadArea data={detail?.AttachedFiles} />
      )}
    </Layout>
  );
};

export default News;
