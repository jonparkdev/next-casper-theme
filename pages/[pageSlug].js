import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import Error from 'next/error'
import Head from 'next/head'
import SiteHeader from '../components/partials/SiteHeader'
import { getPageSlugs, getPageBySlug, getSiteSettings } from '../api'
import OpenGraph from '../components/OpenGraph'

const Page = props => {
  const { page, site } = props
  const router = useRouter()

  if (!router.isFallback && isEmpty(page)) {
    return <Error statusCode={404} />
  }

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <OpenGraph
            router={router}
            description={page.meta_description}
            image={page.og_image}
            title={page.meta_title}
          />
          <div className="page-template">
            <header className="site-header">
              <SiteHeader {...{site, post: page }} />
            </header>
            <main id="site-main" className="site-main outer">
              <div className="inner">

                <article className={`post-full post ${!page.feature_image && "no-image"}`}>
                  <header className="post-full-header">
                    <h1 className="post-full-title">{page.title}</h1>
                  </header>
                  {page.feature_image && (
                    <figure className="post-full-image">
                      <img
                        srcSet={`${page.feature_image} 300w,
                                ${page.feature_image} 600w,
                                ${page.feature_image} 1000w,
                                ${page.feature_image} 2000w`}
                        sizes="(max-width: 800px) 400px, (max-width: 1170px) 1170px, 2000px"
                        src={`${page.feature_image}`}
                        alt={page.title}
                      />
                    </figure>
                  )}

                  <section className="post-full-content">
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: page.html }}/>
                  </section>

                </article>

              </div>
            </main>
          </div>
        </>
      )}
    </>
  )
}

export async function getStaticProps({ params }) {
  const page = await getPageBySlug(params.pageSlug)
  const site = await getSiteSettings()

  return {
    props: {
      site,
      page: {
        ...page,
      },
    },
  }
}

export async function getStaticPaths() {
  const slugs = await getPageSlugs()
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          pageSlug: slug,
        },
      }
    }),
    fallback: true,
  }
}

export default Page
