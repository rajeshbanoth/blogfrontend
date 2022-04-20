// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();


// export const API = "https://nextblogserver.herokuapp.com/api"
// //export const API = "http://localhost:8000/api"


// export const APP_NAME = "NextBlog";

// export const DOMAIN = "https://nextblogg.netlify.app";

// export const FB_APP_ID = "";
// export const DISQUS_SHORTNAME = "globalmedia-3";
// export const GOOGLE_CLIENT_ID = "679957419018-v2akkuef35nocfo6karou98tr0cbphct.apps.googleusercontent.com";


import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export const API = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.API_PRODUCTION
    : publicRuntimeConfig.API_DEVELOPMENT;
export const APP_NAME = publicRuntimeConfig.APP_NAME;

export const DOMAIN = publicRuntimeConfig.PRODUCTION
    ? publicRuntimeConfig.DOMAIN_PRODUCTION
    : publicRuntimeConfig.DOMAIN_DEVELOPMENT;

    
export const INDEX_URL = publicRuntimeConfig.INDEX_URL
? publicRuntimeConfig.INDEX_URL
: publicRuntimeConfig.INDEX_URL;


export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;
export const GOOGLE_CLIENT_ID = publicRuntimeConfig.GOOGLE_CLIENT_ID;
export const FB_APP_ID = publicRuntimeConfig.FB_APP_ID;;