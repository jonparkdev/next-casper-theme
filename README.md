# Nextjs Port of Ghost.orgs Default Theme Casper

I am building a blog for someone using ghost as a headless CMS.  I work with Nextjs at my job so I thought I would play around with the the Ghost Content Api.  I went ahead and ported the default handlebar theme Casper to nextjs to get myself familiar with the api. 

### Notes

Things I did not do:
- Members feature is not included in the admin api so not included in the nextjs theme
- Assuming that this will be used by a developer, I did not include the head and foot codeinjection feature
- I added only a few of the meta tags to what I call the Opengraph component, but others can be easily added 
- In the handlebar theme there is google structured-data which I did not add but again assuming this is being used by developers, it can be easily added
- Responsive images only added to feature_images.  This means that images included in posts/pages are non-responsive and loaded full size since they are embedded in the html you get from the endpoint. I am sure you could could somehow use an image_proxy if you play with the dangerouslysethtml.
