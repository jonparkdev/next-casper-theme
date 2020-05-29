import Head from 'next/head'
import PostCards from '../components/PostCards'
import HeaderBackground from '../components/HeaderBackground'
import { getHomePagePosts, getSiteSettings }  from '../api'

const Home = props => {
  const { posts, site } = props
  console.log(site)
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.icon" />
      </Head>

      <header className="site-home-header">
        <HeaderBackground background={site.cover_image} >
          <div className="inner">
            {/* navigation */}
            <div className="site-header-content">
              <h1 className="site-title">
                {site.logo ? (
                  <img className="site-logo" src={site.logo} alt={site.title} />
                ) : (
                  site.title
                )}
              </h1>
              <h2 className="site-description">{site.description}</h2>
            </div>
          </div>
        </HeaderBackground>
      </header>

      <main id="site-main" className="site-main outer">
          <div className="inner posts">
              <div className="post-feed">
                {posts.map((post, index)=>{
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
  const site = await getSiteSettings();
  return { posts, site }
}

export default Home
