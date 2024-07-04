import Header from './header';
import PageTitle from './pageTitle';
import Footer from './footer';

const Layout = (props) => {
  return (
    <div className="app" id="app" style={{ background: props.bgColor }}>
      <Header setFontSizeString={props.setFontSizeString} />
      <div style={{padding: '0px 0%'}}>
        {props.pageTitle && <PageTitle data={props} />}
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
