import GhostContentAPI from "@tryghost/content-api"

// Create API instance with site credentials
const api = new GhostContentAPI({
  url: 'http://localhost:2368',
  key: '2b33f7d26bb801b0d98fcb4fe5',
  version: "v3"
});

// Retrieve posts for homepage context
export const getHomePagePosts = async () => {
  return await api.posts
    .browse({
      limit: 7, include: 'tags,authors'
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
