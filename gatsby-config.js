
const siteConfig = require('./config.js');

module.exports = {
  siteMetadata: {
    title: siteConfig.title,
    author: siteConfig.author,
    description: siteConfig.description,
    siteUrl: siteConfig.url,
    social: siteConfig.author.social,
    disqusShortname: siteConfig.disqusShortname,
  },
  pathPrefix: siteConfig.pathPrefix, // TODO: Add path prefix as github repository name to deploy to github pages.
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-plugin-posthog`,
            options: {
              // Specify the API key for your Posthog Project (required)
              apiKey: "phc_jpjjpxaygzoLYGDDL3BAYOSbgGIdJ1w9DU5ed42VrQ6",
              // Specify the app host if self-hosting (optional, default: https://app.posthog.com)
              apiHost: "https://app.posthog.com",
              // Puts tracking script in the head instead of the body (optional, default: true)
              head: true,
              // Enable posthog analytics tracking during development (optional, default: false)
              isEnabledDevMode: true,
              // Pass custom variables to posthog.init() (optional)
              initOptions: {
                // ...
              }
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sitemap`,
    // {
    //   resolve: `gatsby-plugin-google-analytics`,
    //   options: {
    //     trackingId: siteConfig.googleAnalyticsId,
    //   },
    // },
    `gatsby-plugin-feed`,
    `gatsby-plugin-sass`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Gatsby Starter Blog`,
    //     short_name: `GatsbyJS`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `content/assets/gatsby-icon.png`,
    //   },
    // },
    `gatsby-plugin-react-helmet`,
    'gatsby-plugin-dark-mode',
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
