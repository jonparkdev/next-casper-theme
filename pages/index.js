import Head from 'next/head'
import { getPosts }  from '../api'

const Home = props => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="site-home-header">
        {/* Header image */}
        <div className="inner">
          {/* navigation */}
          <div className="site-header-content">
            <h1 className="site-title">
            {/*<img className="site-logo" src="{{img_url @site.logo size="l"}}" alt="{{@site.title}}" /> */}
            this is stuff
            </h1>
            <h2 className="site-description">This is a site discription</h2>
          </div>
        </div>
      </header>
    </div>
  )
}

Home.getInitialProps = async (context) => {
  const posts = await getPosts();

  return { posts }
}

export default Home
