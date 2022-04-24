module.exports = {


  
    serverRuntimeConfig: {
      // Will only be available on the server side
      mySecret: 'secret',
      secondSecret:process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
   API_PRODUCTION:process.env.API_PRODUCTION,
  //API_PRODUCTION:'http://localhost:8000/api',
    //API_PRODUCTION:'https://ec1zh3.deta.dev/api',
      PRODUCTION:process.env.PRODUCTION,
      DISQUS_SHORTNAME:process.env.DISQUS_SHORTNAME,
      GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID,
      APP_NAME:process.env.APP_NAME,
      DOMAIN_PRODUCTION:process.env.DOMAIN_PRODUCTION,
      FB_APP_ID:process.env.FB_APP_ID,
     //INDEX_URL:'http://localhost:8000',
     INDEX_URL:process.env.INDEX_URL,
    },

  }