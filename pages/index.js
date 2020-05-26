import Head from 'next/head'
import PostCards from '../components/PostCards'
import { getHomePagePosts }  from '../api'

const Home = props => {
  const { posts } = props
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

      <main id="site-main" className="site-main outer">
          <div className="inner posts">
              <div className="post-feed">
                {posts.map((post, index)=>{
                  console.log(post)
                  return <PostCards key={`home-page-card-${index}`} {...{post, home: true, index}} />
                })}
              </div>
          </div>
      </main>
    </div>
  )
}

Home.getInitialProps = async (context) => {
  const posts = await getHomePagePosts();
  return { posts }
}

export default Home
