import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="zh-Hant-TW">
        <Head />
        <body>
          <noscript>
            <p>
              此網頁需要支援JavaScript
              才能正確運行，請先至你的瀏覽器設定中開啟JavaScript。
            </p>
          </noscript>
          <Main />
          <NextScript />
          <script src="/static/js/gtag.js" />
          <script src="/static/js/jquery-3.6.0.min.js" />
          <script src="/static/js/bootstrap.min.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
