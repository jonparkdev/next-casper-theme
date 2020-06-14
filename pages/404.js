import React from 'react'
import SiteHeader from '../components/partials/SiteHeader'
import Link from 'next/link'
import { getPosts, getSiteSettings } from '../api'

export default function Custom404({site, posts}) {

  return (
    <>
      <header className="site-header">
        <SiteHeader {...{site}} />
      </header>

      <main id="site-main" className="site-main outer error-content">
          <div className="inner">
              <section className="error-message">
                  <h1 className="error-code">404</h1>
                  <p className="error-description">Page not found</p>
                  <Link href="/">
                    <a className="error-link">Go to the front page →</a>
                  </Link>
              </section>
              {/*
              {{#get "posts" limit="3" include="authors,tags"}}
                  <div className="post-feed">
                      {{#foreach posts}}
                      {{> "post-card"}}
                      {{/foreach}}
                  </div>
              {{/get}}
              */}
          </div>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const posts = await getPosts(1, 3);
  const site = await getSiteSettings()

  return {
    props: {
      site,
      posts: {
        ...posts
      }
    },
  }
}
