import Layout from '../../components/layout';
import AboutPark from './about';
import { sendPostRequest } from '../../api/helper';
import massage from '../../data/i18n/messages';
import { useRouter } from 'next/router';

const About = ({ parkData, facilityData, setPageTitle }) => {
  const router = useRouter();
  const { locale } = router;
  const breadcrumbs = [{ title: massage[`${locale}`].map_introduc_00 }];

  return (
    <Layout
      pageTitle={massage[`${locale}`].map_introduc_00}
      setPageTitle={setPageTitle}
      pageSub={``}
      img={{ img_sub: `/images/about/title-obj-park-intro-01.png` }}
      breadcrumbs={breadcrumbs}
      bgColor={'#f5f0e0'}
    >
      <AboutPark parkData={parkData} facilityData={facilityData} />
    </Layout>
  );
};

export async function getServerSideProps() {
  const payload1 = { Limit: 10000, Offset: 0, Culture: 1 };
  const payload2 = {
    ParkID: null,
    FacilityType: null,
    Search: '',
    Sort: 'SequenceNo',
    Order: 'desc',
    Limit: 10000,
    Offset: 0,
    Culture: 1,
  };

  const [parkData, facilityData] = await Promise.all([
    sendPostRequest('/api/park/Paging', payload1),
    sendPostRequest('/api/facility/Paging', payload2),
  ]);

  return { props: { parkData, facilityData } };
}

export default About;
