import React from 'react'
import { avatar } from './icons/avatar'
import { format } from 'date-fns'

const formatDate = (date, formatString) => {
  const dateValue = new Date(date)
  return format(dateValue, formatString)
}

const PostCards = props => {
  const { post, index, home } = props

  const {
    feature_image,
    url,
    title,
    primary_tag,
    excerpt,
    authors,
    reading_time,
    created_at
  } = post

  const metadate = formatDate(created_at, 'meta')

  return (
    <>
      <article
        className={`post-card post ${!feature_image ?  'no-image' : (home && index % 6 === 0) && 'post-card-large'}`}>

          {feature_image && (
            <a className="post-card-image-link" href={url}>
                <img className="post-card-image"
                    srcSet={`${feature_image} 300w,
                            ${feature_image} 600w,
                            ${feature_image} 1000w,
                            ${feature_image} 2000w`}
                    sizes="(max-width: 1000px) 400px, 700px"
                    src= {`${feature_image}`}
                    alt={title}
                />
            </a>
          )}
          <div className="post-card-content">
            <a className="post-card-content-link" href={url}>
              <header className="post-card-header">
                {primary_tag && (
                  <div className="post-card-primary-tag">{primary_tag.name}</div>
                )}
                <h2 className="post-card-title">{title}</h2>
              </header>

              <section className="post-card-excerpt">
                {feature_image ? (
                  <p>{excerpt.split(" ").slice(0, 30).join(' ')}</p>
                ) : (
                  <p>{excerpt.split(" ").slice(0, 30).join(' ')}</p>
                )}
              </section>
            </a>
            <footer className="post-card-meta">
                <ul className="author-list">
                    {authors.map((author, index) => {
                      return (
                        <li key={`author-${index}`} className="author-list-item">
                          <div className="author-name-tooltip">
                              {author.name}
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
                    }
                  )}
                </ul>
                <div className="post-card-byline-content">
                  <span>
                    {authors.length === 1 ?
                      <a href={`/author/${authors[0].slug}/`}> {authors[0].name} </a> :
                        authors.length === 2 ? (
                          <>
                            <a href={`/author/${authors[0].slug}/`}> {authors[0].name} </a>
                            {', '}
                            <a href={`/author/${authors[1].slug}/`}> {authors[1].name} </a>
                          </>
                        ) : (
                          'Multiple Authors'
                        )
                    }
                  </span>
                  <span className="post-card-byline-date">
                    <time dateTime={formatDate(created_at, "yyyy-MM-dd")}>
                      {formatDate(created_at, "d MMM yyyy")}
                    </time>
                    <span className="bull">&bull;</span>
                    {reading_time} {' '}MIN READ
                  </span>
                </div>
            </footer>
        </div>
      </article>
    </>
  )
}

export default PostCards
