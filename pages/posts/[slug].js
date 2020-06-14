import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'
import ErrorPage from 'next/error'
import Head from 'next/head'
import SiteHeader from '../../components/partials/SiteHeader'
import PostCards from '../../components/partials/PostCards'
import { avatar } from '../../components/icons'
import { getPostSlugs, getPostBySlug, getSiteSettings, getPostsByFilter } from '../../api'
import { formatDate } from '../../components/utils'
import OpenGraph from '../../components/OpenGraph'

const Post = ({
  site,
  post,
  relatedPosts,
  relatedPostsMeta,
  morePosts,
  preview,
  next,
  prev
}) => {
  const router = useRouter()

  /**
    * Start Code Block - All code from this point to `End Code Block` indicator
    * is for scroll animations as prescribed in the assets/sticky-nav-title.js
    * Used on invividual post pages, displays the post title in place of the nav
    * bar when scrolling past the title
  */

  // get scrolling elements
  let nav = React.useRef()
  let title = React.useRef()

  // variables to track scrolling of page
  let lastScrollY = React.useRef()
  let ticking = React.useRef(false)

  // set above variables on page mount and add/remove event listeners
  React.useEffect(() => {
    if(!router.isFallback && post?.slug){
      lastScrollY.current = window.scrollY

      window.addEventListener('scroll', onScroll, { passive: true });
      update()

      return () => {
        window.removeEventListener('scroll', onScroll, { passive: true });
      }
    }
  }, [])

  // Get access to navigation node in child component by setting a ref
  const setNavRef = (el) => {
    nav.current = el
  }

  // Get access to post-Title node by setting ref
  const setTitleRef = (el) => {
    title.current = el
  }

  // onScroll callback
  const onScroll = () => {
    lastScrollY.current = window.scrollY;
    requestTick();
  }

  const requestTick = () => {
      if (!ticking) {
          requestAnimationFrame(update);
      }
      ticking = true;
  }

  const update = () => {
      let trigger = title.current.getBoundingClientRect().top + window.scrollY;
      let triggerOffset = title.current.offsetHeight + 35;

      // show/hide post title
      if (lastScrollY.current >= trigger + triggerOffset) {
          nav.current.classList.add('nav-post-title-active');
      } else {
          nav.current.classList.remove('nav-post-title-active');
      }

      ticking = false;
  }
  /* End Code Block */

  if (!router.isFallback && isEmpty(page)) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <>
      {router.isFallback ? (
        <div>Loading…</div>
      ) : (
        <>
          <OpenGraph
            router={router}
            description={post.meta_description}
            image={post.og_image}
            title={post.meta_title}
          />
          <div className="post-template">
            <header className="site-header">
              <SiteHeader {...{site, post, setRef: setNavRef}} />
            </header>
            <main id="site-main" className="site-main outer">
              <div className="inner">

                <article className={`post-full post ${!post.feature_image && "no-image"}`}>
                  <header className="post-full-header">
                    {post.primary_tag && (
                      <section className="post-full-tags">
                        <a href={post.primary_tag.url}>{post.primary_tag.name}</a>
                      </section>
                    )}

                    <h1 ref={setTitleRef} className="post-full-title">{post.title}</h1>

                    {post.custom_excerpt && (
                      <p className="post-full-custom-excerpt">{post.custom_excerpt}</p>
                    )}

                    <div className="post-full-byline">

                      <section className="post-full-byline-content">

                        <ul className="author-list">
                          {post.authors.map((author, index) => {
                            return (
                              <li key={`${index}-${author.name}`} className="author-list-item">

                                <div className="author-card">
                                  {author.profile_image ? (
                                    <img className="author-profile-image" src={author.profile_image} alt={author.name} />
                                  ) : (
                                    <div className="author-profile-image">{avatar}</div>
                                  )}

                                  <div className="author-info">
                                    {author.bio ? (
                                      <div className="bio">
                                        <h2>{author.name}</h2>
                                        <p>{author.bio}</p>
                                        <p><a href={author.url}>More posts</a> by {author.name}.</p>
                                      </div>
                                    ) : (
                                      <>
                                        <h2>{author.name}</h2>
                                        <p>Read <a href={author.url}>more posts</a> by this author.</p>
                                      </>
                                    )}
                                  </div>
                                </div>

                                {author.profile_image ? (
                                  <a href={author.url} className="static-avatar">
                                    <img className="author-profile-image" src={author.profile_image} alt={author.name} />
                                  </a>
                                ):(
                                  <a href={author.url} className="static-avatar author-profile-image">
                                    {avatar}
                                  </a>
                                )}
                              </li>
                            )
                          })}

                        </ul>

                        <section className="post-full-byline-meta">
                          <h4 className="author-name">
                            {post.authors.map((author, index) => {
                              let name = author.name
                              if(index !== post.authors.length - 1){
                                name = `${author.name},`
                              }
                              return (
                                <a key={`${index}-${name}`} href={`/author/${author.slug}/`}> {name} </a>
                              )
                            })}
                          </h4>
                          <div className="byline-meta-content">
                            <time
                              className="byline-meta-date"
                              dateTime={formatDate(post.published_at, "yyyy-MM-dd")}
                            >
                              {formatDate(post.published_at, "d MMM yyyy")}
                            </time>
                            <span className="byline-reading-time">
                              <span className="bull">&bull;</span>
                              {post.reading_time}
                              {' '}MIN READ
                            </span>
                          </div>
                        </section>
                      </section>
                    </div>
                  </header>

                  {post.feature_image && (
                    <figure className="post-full-image">
                      <img
                        srcSet={`${post.feature_image} 300w,
                                ${post.feature_image} 600w,
                                ${post.feature_image} 1000w,
                                ${post.feature_image} 2000w`}
                        sizes="(max-width: 800px) 400px, (max-width: 1170px) 1170px, 2000px"
                        src={`${post.feature_image}`}
                        alt={post.title}
                      />
                    </figure>
                  )}


                  <section className="post-full-content">
                    <div className="post-content" dangerouslySetInnerHTML={{ __html: post.html }}/>
                  </section>
                  {/*
                  {{!-- Email subscribe form at the bottom of the page --}}
                  {{#if @labs.members}}
                  {{> subscribe-form}}
                  {{/if}}

                  {{!--
                  <section className="post-full-comments">
                  If you want to embed comments, this is a good place to do it!
                  </section>
                  --}}
                  */}
                </article>

              </div>
            </main>

            <aside className="read-next outer">
                <div className="inner">
                    <div className="read-next-feed">
                      {post.primary_tag && relatedPosts && (
                          <article className="read-next-card">
                              <header className="read-next-card-header">

                                <h3><span>More in</span> <a href={post.primary_tag.url}>{post.primary_tag.name}</a></h3>

                              </header>
                              <div className="read-next-card-content">
                                  <ul>
                                    {relatedPosts.map((post, index) => {
                                      return (
                                        <li key={`${post.name}-${index}`}>
                                            <h4><a href={post.url}>{post.title}</a></h4>
                                            <div className="read-next-card-meta">
                                                <p>
                                                  <time dateTime={formatDate(post.published_at, "yyyy-MM-dd")}>
                                                    {formatDate(post.published_at, "d MMM yyyy")}
                                                  </time> – {' '}
                                                  {post.reading_time}
                                                </p>
                                            </div>
                                        </li>
                                      )
                                    })}
                                  </ul>
                              </div>
                              <footer className="read-next-card-footer">
                                  <a href={post.primary_tag.url}>
                                    {relatedPostsMeta.pagination.total === 0 ?
                                      "No Posts" :
                                        relatedPostsMeta.pagination.total === 1 ?
                                          "1 post" :
                                            `See all ${relatedPostsMeta.pagination.total} posts`}

                                  →</a>
                              </footer>
                          </article>
                        )}
                        {prev.length !== 0 && (
                          <PostCards {...{post: prev[0]}} />
                        )}
                        {next.length !== 0 && (
                          <PostCards {...{post: next[0]}} />
                        )}
                        </div>
                    </div>
              </aside>
          </div>
        </>
      )}
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug)
  const relatedPosts = await getPostsByFilter(`tags:${post.primary_tag.slug}+id:-${post.id}`, 1, 3)
  const nextPost = await getPostsByFilter(`published_at:>'${post.published_at}'+id:-${post.id}`, 1, 1)
  const prevPost = await getPostsByFilter(`published_at:<'${post.published_at}'+id:-${post.id}`, 1, 1)
  const site = await getSiteSettings()

  return {
    props: {
      relatedPostsMeta: relatedPosts.meta,
      prev: prevPost,
      next: nextPost,
      relatedPosts,
      site,
      post: {
        ...post,
      },
    },
  }
}

export async function getStaticPaths() {
  const slugs = await getPostSlugs()
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug,
        },
      }
    }),
    fallback: true,
  }
}

export default Post
