# gatsby-source-github-api
Source plugin for pulling data into Gatsby from the official gitlab wiki api
## Install
todo

## How to use
Create a `gatsby-config.js` file or open the one you already have.

In there, you want to add this plugin and at least add the token in the options object:
```javascript
// In your gatsby-config.js
plugins: [
  {
    resolve: `gatsby-source-gitlab-wiki-api`,
    options: {
      // token: required by the Gitlab API
      token: someString,
      
      // include slugs to exclude
      slugsToExclude: [],
      // the project id
      id: someString,
    }
  }
]
```

