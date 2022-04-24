import Document, { Html, Head, Main, NextScript } from 'next/document';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import React from 'react';

class MyDocument extends Document {
  setGoogleTags() {
    if (publicRuntimeConfig.PRODUCTION) {
      return {
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-147955896-1');
        `
      };
    }
  }


  render() {
    return (
      <Html lang="en">
        <Head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1526259079521468"
     crossorigin="anonymous"></script>
          <link rel='shortcut icon'  href='/static/images/favicon.png' ></link>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css"
          />
          <link href="https://fonts.googleapis.com/css2?family=Chilanka&display=swap" rel="stylesheet"></link>
          <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css"></link>
          <link rel="stylesheet" type="text/css" href="https://unpkg.com/medium-draft/dist/medium-draft.css"></link>

          
          <link rel="stylesheet" href="/static/css/styles.css" />

          <link href="https://cdnjs.cloudflare.com/ajax/libs/quill/2.0.0-dev.3/quill.snow.min.css" rel="stylesheet" />
<link href="https://unpkg.com/quill-table-ui@1.0.5/dist/index.css" rel="stylesheet"></link>
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-147955896-1"></script>

          
          
          <script dangerouslySetInnerHTML={this.setGoogleTags()} />
          
        </Head>
        <body  >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
