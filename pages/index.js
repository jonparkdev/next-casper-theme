import Head from 'next/head'
import SiteHeader from '../components/partials/SiteHeader'
import SiteNav from '../components/partials/SiteNav'
import PostCards from '../components/partials/PostCards'
import HeaderBackground from '../components/partials/HeaderBackground'
import { getAllPosts, getSiteSettings }  from '../api'

const Home = props => {
  const { posts, site } = props

  /*
    Start Code Block - All code from this point to `End Code Block` indicator
    is for scroll animations as prescribed in the index.hbs of the casper
    template.
  */

  // get scrolling elements
  let nav = React.useRef()
  let feed = React.useRef()

  // variables to track scrolling of page
  let lastScrollY = React.useRef()
  let lastWindowHeight = React.useRef()
  let lastDocumentHeight = React.useRef()
  let ticking = React.useRef(false)

  // set above variables on page mount and add/remove event listeners
  React.useEffect(() => {
    lastScrollY.current = window.scrollY
    lastWindowHeight.current = window.innerHeight
    lastDocumentHeight.current = document.documentElement.scrollHeight

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, false);
    update()

    return () => {
      window.removeEventListener('scroll', onScroll, { passive: true });
      window.removeEventListener('resize', onResize, false);
    }
  }, [])

  // Get access to navigation node in child component by setting a ref
  const setNavRef = (el) => {
    nav.current = el
  }

  // Get access to post-feed node by setting ref
  const setFeedRef = (el) => {
    feed.current = el
  }

  // onScroll callback
  const onScroll = () => {
    lastScrollY.current = window.scrollY;
    requestTick();
  }

  // onResize callback
  const onResize = () => {
    lastWindowHeight.current = window.innerHeight;
    lastDocumentHeight.current = document.documentElement.scrollHeight
    requestTick();
  }

  const requestTick = () => {
      if (!ticking) {
          requestAnimationFrame(update);
      }
      ticking = true;
  }

  const update = () => {
      let trigger = feed.current.getBoundingClientRect().top + window.scrollY;
      // show/hide nav
      if (lastScrollY.current >= trigger - 20) {
          nav.current.classList.add('fixed-nav-active');
      } else {
          nav.current.classList.remove('fixed-nav-active');
      }

      ticking = false;
  }
  /* End Code Block */

  return (
    <div className='home-template'>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className="site-home-header">
          <HeaderBackground background={site.cover_image} >
            <div className="inner">
              <SiteNav {...{site}} />
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
                <div ref={setFeedRef} className="post-feed">
                  {posts.map((post, index)=>{
                    return <PostCards key={`home-page-card-${index}`} {...{post, home: true, index}} />
                  })}
                </div>
            </div>
        </main>

        <SiteHeader {...{site, setRef: setNavRef}} />
      </div>
    </div>
  )
}

Home.getInitialProps = async (context) => {
  const posts = await getAllPosts();
  const site = await getSiteSettings();

  return { posts, site }
}

export default Home
