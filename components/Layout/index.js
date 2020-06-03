import React from 'react'
import { getSiteSettings } from '../../api'

/*
  Since this layout component is used in the _app.js, we don't want to use
  getInitialProps and request site data as this will disable static rendering
  options for some of our other pages. And since the Footer is at the bottom of
  any page, we can render it on the client side.
*/
const Layout = ({children}) => {
  const [site, setSite] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    async function getSiteData() {
      let response = await getSiteSettings()
      setSite(response)
    }
    getSiteData()
    setLoading(false)
  }, [])

  return (
    <>
      <div className="site-wrapper">
        {children}

        {!loading && (
          <footer className="site-footer outer">
              <div className="site-footer-content inner">
                  <section className="copyright"><a href={site.url}>{site.title}</a> &copy; {new Date().getFullYear()}</section>
                  <nav className="site-footer-nav">
                      <a style={{cursor: "pointer"}} href={site.url}>Latest Posts</a>
                      {site.facebook && <a href={ site.facebook } target="_blank" rel="noopener">Facebook</a>}
                      {site.twitter && <a href={site.twitter} target="_blank" rel="noopener">Twitter</a>}
                      <a href="https://ghost.org" target="_blank" rel="noopener">Ghost</a>
                  </nav>
              </div>
          </footer>
        )}
      </div>
    </>
  )
}

export default Layout
