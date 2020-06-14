import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { facebook, twitter } from '../../components/icons'

const SiteNav = ({ site, post, setRef }) => {
  const router = useRouter()

  return (
    <>
      <nav ref={setRef} className="site-nav">
          <div className="site-nav-left-wrapper">
              <div className="site-nav-left">
                  {site.logo ? (
                      <Link href='/'>
                        <a className="site-nav-logo"><img src={site.logo} alt={site.title} /></a>
                      </Link>
                  ) : (
                      <Link href='/'>
                        <a className="site-nav-logo" href={site.url}>{site.title}</a>
                      </Link>
                  )}
                  <div className="site-nav-content">
                      {site.navigation.length !== 0 && (
                        <ul className="nav">
                          {site.navigation.map((nav, index) => {
                            let lowerCaseLabel = nav.label.toLowerCase()
                            return (
                              <li
                                key={`${nav.label}-${index}`}
                                className={`nav-${lowerCaseLabel}${router.asPath === nav.url ? " nav-current" : ""}`}
                                role="menuitem"
                              >
                                <a href={nav.url}>{nav.label}</a>
                              </li>
                            )
                          })}
                        </ul>
                      )}
                      {post && (
                          <span className={`nav-post-title ${!site.logo && 'dash'}`}>{post.title}</span>
                      )}
                  </div>
              </div>
          </div>
          <div className="site-nav-right">
              {site.secondary_navigation.length !== 0 ? (
                <ul className="nav" role="menu">
                  {site.secondary_navigation.map((nav, index) => {
                    let lowerCaseLabel = nav.label.toLowerCase()
                    return (
                      <li
                        key={`${nav.label}-${index}`}
                        className={`nav-${lowerCaseLabel}${router.asPath === nav.url ? " nav-current" : ""}`}
                        role="menuitem"
                      >
                        <Link href='/'>
                          <a>{nav.label}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              ) : (
                <div className="social-links">
                  {site.facebook && (
                    <a className="social-link social-link-fb"
                      href={site.facebook}
                      title="Facebook"
                      target="_blank"
                      rel="noopener"
                    >
                      {facebook}
                    </a>
                  )}
                  {site.twitter && (
                    <a
                      className="social-link social-link-tw"
                      href={site.twitter}
                      title="Twitter"
                      target="_blank"
                      rel="noopener"
                    >
                        {twitter}
                    </a>
                  )}
                </div>
                  /*
                    {{#unless @labs.members}}  There is no api endpoint at the moment for labs features
                        <a className="rss-button" href="https://feedly.com/i/subscription/feed/{{@site.url}}/rss/" title="RSS" target="_blank" rel="noopener">{{> "icons/rss"}}</a>
                    {{/unless}}
                  */
              )}
              {/* There is no api endpoint at the moment for labs features
                {{#if @labs.members}}
                    <a className="subscribe-button" href="#subscribe">Subscribe</a>
                {{/if}}
              */}
          </div>
        </nav>
    </>
  )
}

SiteNav.propTypes = {
  site: PropTypes.object.isRequired,
  post: PropTypes.object,
  setRef: PropTypes.func
}

SiteNav.defaultProp = {
  setRef: null,
  post: false
}

export default SiteNav
