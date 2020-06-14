import React from 'react'
import { getSiteSettings } from '../../api'
import fitvids from 'fitvids'
/*
  Since this layout component is used in the _app.js, we don't want to use
  getInitialProps and request site data as this will disable static rendering
  options for some of our other pages. And since the Footer is at the bottom of
  any page, we can render it on the client side.
*/
const Layout = (props) => {
  const { children } = props
  const [site, setSite] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  /**
   * Gallery card support
   * Used on any individual post/page
   *
   * Detects when a gallery card has been used and applies sizing to make sure
   * the display matches what is seen in the editor.
   */
  let resizeImagesInGalleries = function resizeImagesInGalleries() {
      let images = document.querySelectorAll('.kg-gallery-image img');
      images.forEach(function (image) {
          let container = image.closest('.kg-gallery-image');
          let width = image.attributes.width.value;
          let height = image.attributes.height.value;
          let ratio = width / height;
          container.style.flex = ratio + ' 1 0%';
      });
  };

  React.useEffect(() => {
    async function getSiteData() {
      let response = await getSiteSettings()
      setSite(response)
    }
    
    getSiteData()
    setLoading(false)

    // for responsive sizing of video's
    fitvids(".post-full-content")
    // Gallery cards support
    resizeImagesInGalleries();
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
