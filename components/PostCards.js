import React from 'react'

const PostCards = props => {
  const { post, index, home } = props

  const {
    feature_image,
    url,
    title,
    primary_tag,
    excerpt
  } = post

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
          <div class="post-card-content">
            <a class="post-card-content-link" href={url}>
              <header class="post-card-header">
                {primary_tag && (
                  <div class="post-card-primary-tag">{primary_tag.name}</div>
                )}
                <h2 class="post-card-title">{title}</h2>
              </header>

              <section class="post-card-excerpt">
                {feature_image ? (
                  <p>{excerpt.substring(30)}</p>
                ) : (
                  <p>{excerpt.substring(40)}</p>
                )}
              </section>
            </a>
          </div>
        </article>


{/*
            <footer class="post-card-meta">
                <ul class="author-list">
                    {{#foreach authors}}
                    <li class="author-list-item">

                        <div class="author-name-tooltip">
                            {{name}}
                        </div>

                        {{#if profile_image}}
                        <a href="{{url}}" class="static-avatar">
                            <img class="author-profile-image" src="{{img_url profile_image size="xs"}}" alt="{{name}}" />
                        </a>
                        {{else}}
                        <a href="{{url}}" class="static-avatar author-profile-image">{{> "icons/avatar"}}</a>
                        {{/if}}
                    </li>
                    {{/foreach}}
                </ul>
                <div class="post-card-byline-content">
                    <span>{{#has author="count:>2"}}Multiple authors{{else}}{{authors}}{{/has}}</span>
                    <span class="post-card-byline-date"><time datetime="{{date format="YYYY-MM-DD"}}">{{date format="D MMM YYYY"}}</time> <span class="bull">&bull;</span> {{reading_time}}</span>
                </div>
            </footer>

        </div>{{!--/.post-card-content--}}

    </article>
*/}
</>
  )
}

export default PostCards
