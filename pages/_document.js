import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {

    return (
      <Html>
        <Head >

          {/* Document Settings */}
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          {/* Base Meta */}
          <meta name="HandheldFriendly" content="True" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        </Head >
        <body>
          <Main />
          <NextScript />

          {/**
             * Ghost outputs important scripts and data with this tag - it should
             * always be the very last thing before the closing body tag
            **/}

        </body>
      </Html>
    )
  }
}

export default MyDocument
