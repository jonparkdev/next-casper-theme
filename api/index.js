import GhostContentAPI from "@tryghost/content-api"

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'http://localhost:2368',
  key: `2b33f7d26bb801b0d98fcb4fe5`,
  version: "v3"
});

// Retrieve all post, defaults set in parameters
export const getPosts = async (page=1, limit=7, order="published_at desc", include=['tags,authors']) => {

  return await api.posts
    .browse({
      page, limit, include, order
    })
    .catch(err => {
      console.error(err);
    });
}

export const getPostsByFilter = async (filter, page=1, limit=7, order="published_at desc", include=['tags,authors']) => {
  return await api.posts
    .browse({
      page, limit, include, filter, order
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

// Retrieve slugs of all pages
export const getPageSlugs = async () => {
  const pages = await api.pages
    .browse({
      fields: ['slug']
    }).
    catch(err => {
      console.error(err);
    })

  return pages.map(page => {
    return page.slug
  })
}

// Retrieve Post by slug
export const getPostBySlug = async (slug, include=['tags,authors']) => {
  const post = await api.posts
    .read({slug}, {include})
    .catch(err => {
      console.error(err);
    })

  return post
}

// Retrieve Page by slug
export const getPageBySlug = async (slug, include=['tags,authors']) => {
  const post = await api.pages
    .read({slug}, {include})
    .catch(err => {

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

// Get tag by slug
const defaultTagFields = [
  "name",
  "feature_image",
  "description",
  "meta_title",
  "meta_description"
]
export const getTagBySlug = async (slug, fields=[...defaultTagFields], include=['count.posts',"posts"]) => {
  const author = await api.tags
    .read({slug}, {fields, include})
    .catch(err => {
      console.error(err);
    })
  return author
}
