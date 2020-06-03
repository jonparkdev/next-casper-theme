import GhostContentAPI from "@tryghost/content-api"

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'http://localhost:2368',
  key: '2b33f7d26bb801b0d98fcb4fe5',
  version: "v3"
});

/*
  Some of the below getter functions, there is a a fields array parameter.
  This fields parameter is used to request specific information from the api,
  as most of the time we do not need every piece of info in the response
*/


// Retrieve all post, defaults set in parameters
export const getAllPosts = async (limit=7, include=['tags,authors']) => {
  return await api.posts
    .browse({
      limit, include
    })
    .catch(err => {
      console.error(err);
    });
}

export const getPostsByFilter = async (filter, limit='all', include=['tags,authors']) => {
  return await api.posts
    .browse({
      limit, include, filter
    })
    .catch(err => {
      console.error(err);
    });
}

// Retrieve site settings, equivalent to @site in handlebar
export const getSiteSettings = async () => {
  return await api.settings
    .browse()
    .catch(err => {
      console.error(err);
    })
}

// Retrieve slugs of all posts
export const getPostSlugs = async () => {
  const posts = await api.posts
    .browse({
      fields: ['slug']
    }).
    catch(err => {
      console.error(err);
    })

  return posts.map(post => {
    return post.slug
  })
}

// Get post by slug
const defaultPostFields = [
  "feature_image",
  "title",
  "custom_excerpt",
  "published_at",
  "reading_time",
  "html"
]
export const getPostBySlug = async (slug, include=['tags,authors']) => {
  const post = await api.posts
    .read({slug}, {include})
    .catch(err => {
      console.error(err);
    })
  return post
}

// Get author by slug
const defaultAuthorFields = [
  "name",
  "profile_image",
  "bio",
  "cover_image",
  "website",
  "location",
  "facebook",
  "twitter",
]
export const getAuthorBySlug = async (slug, fields=[...defaultAuthorFields], include=['count.posts',"posts"]) => {
  const author = await api.authors
    .read({slug}, {fields, include})
    .catch(err => {
      console.error(err);
    })
  return author
}
