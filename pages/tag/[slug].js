import React from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import SiteHeader from '../../components/partials/SiteHeader'
import InfiniteScroll from 'react-infinite-scroller'
import HeaderBackground from '../../components/partials/HeaderBackground'
import PostCards from '../../components/partials/PostCards'
import { getTagBySlug, getSiteSettings, getPostsByFilter }  from '../../api'
import { avatar } from '../../components/icons'
import OpenGraph from '../../components/OpenGraph'

const Tag = ({ site, tag, posts, paginationInfo }) => {
  const router = useRouter()
  /* setState to track pagination and InfiniteScroll component */
  const [pagination, setPagination] = React.useState({
    postsState: posts,
    page: paginationInfo.page,
    pageLimit: paginationInfo.pages
  })

  const getMorePosts = async () => {
    const {postsState, page, pageLimit } = pagination
    const morePosts = await getPostsByFilter(`tag:${tag.slug}`, page + 1, 7)

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
        description={tag.meta_description}
        image={tag.og_image}
        title={tag.meta_title}
      />
      <div className="tag-template">
        <header className="site-archive-header">
            <SiteHeader {...{site}}/>
            <HeaderBackground background={tag.feature_image}>
              <div className="inner site-header-content">
                  <h1 className="site-title">{tag.name}</h1>
                  <h2 className="site-description">
                   {tag.description || (
                     `A collection of
                      ${tag.count.posts === 0 ? 'No posts' :
                        tag.count.posts === 0 ? '1 post' :
                          `${tag.count.posts} posts`}`
                    )}
                  </h2>
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
                    return <PostCards key={`tag-post-${index}`} {...{post, index}}/>
                  })}
                </div>
              </InfiniteScroll>
            </div>
        </main>
      </div>
    </>
  )
}

Tag.propTypes = {
  posts: PropTypes.array.isRequired,
  site: PropTypes.object.isRequired,
  tag: PropTypes.object.isRequired,
  paginationInfo: PropTypes.object.isRequired
}

Tag.getInitialProps = async context => {
  const tag = await getTagBySlug(context.query.slug)
  const site = await getSiteSettings()
  const posts = await getPostsByFilter(`tag:${context.query.slug}`)

  const { meta: { pagination } } = posts;

  return { site, tag, posts, paginationInfo: pagination }
}

export default Tag
