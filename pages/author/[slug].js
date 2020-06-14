import React from 'react'
import { useRouter } from 'next/router'
import SiteHeader from '../../components/partials/SiteHeader'
import InfiniteScroll from 'react-infinite-scroller'
import HeaderBackground from '../../components/partials/HeaderBackground'
import PostCards from '../../components/partials/PostCards'
import { getAuthorBySlug, getSiteSettings, getPostsByFilter }  from '../../api'
import { avatar } from '../../components/icons'
import OpenGraph from '../../components/OpenGraph'

const Author = ({ site, author, posts, paginationInfo }) => {
  const router = useRouter()

  /* setState to track pagination and InfiniteScroll component */
  const [pagination, setPagination] = React.useState({
    postsState: posts,
    page: paginationInfo.page,
    pageLimit: paginationInfo.pages
  })

  const getMorePosts = async () => {
    const {postsState, page, pageLimit } = pagination
    const morePosts = await getPostsByFilter(`authors:${author.slug}`, page + 1, 7)

    setPagination({
      ...pagination,
      postsState: [...postsState, ...morePosts],
      page: page + 1,
    })
  }


  return (
    <>
      <OpenGraph
        router={router}
        description={author.meta_description}
        image={author.og_image}
        title={author.meta_title}
      />
      <div className="author-template">
        <header className="site-archive-header">
            <SiteHeader {...{site}}/>
            <HeaderBackground background={author.cover_image}>
              <div className="inner">
                <div className="site-header-content author-header">
                  {author.profile_image ?
                    <img className="author-profile-image" src={author.profile_image} alt={author.name} />
                  :
                    <div className="author-profile-image">
                      {avatar}
                    </div>
                  }
                  <div className="author-header-content">
                      <h1 className="site-title">{author.name}</h1>
                      {author.bio &&
                        <h2 className="author-bio">{author.bio}</h2>
                      }
                      <div className="author-meta">
                          {author.location &&
                            <div className="author-location">{author.location}</div>
                          }
                          <div className="author-stats">
                            {author.count.posts === 0 ? 'No posts' :
                              author.count.posts === 0 ? '1 post' :
                                `${author.count.posts} posts`}
                          </div>
                          {author.website &&
                            <span className="author-social-link"><a href={author.website} target="_blank" rel="noopener">Website</a></span>
                          }
                          {author.twitter &&
                            <span className="author-social-link"><a href={author.twitter} target="_blank" rel="noopener">Twitter</a></span>
                          }
                          {author.facebook &&
                            <span className="author-social-link"><a href={author.facebook} target="_blank" rel="noopener">Facebook</a></span>
                          }
                      </div>
                  </div>
                </div>
              </div>
          </HeaderBackground>
       </header>

        <main id="site-main" className="site-main outer">
            <div className="inner posts">
              <InfiniteScroll
                pageStart={0}
                loadMore={getMorePosts}
                threshold = {300}
                hasMore={pagination.pageLimit !== pagination.page}
                loader={<div className="loader" key={0}>Loading ...</div>}
              >
                <div className="post-feed">
                  {pagination.postsState.map((post, index)=>{
                    return <PostCards key={`author-post-${index}`} {...{post, index}}/>
                  })}
                </div>
              </InfiniteScroll>
            </div>
        </main>
      </div>
    </>
  )
}

Author.getInitialProps = async context => {
  const author = await getAuthorBySlug(context.query.slug)
  const site = await getSiteSettings()
  const posts = await getPostsByFilter(`authors:${context.query.slug}`)

  const { meta: { pagination } } = posts;

  return { site, author, posts, paginationInfo: pagination }
}

export default Author
