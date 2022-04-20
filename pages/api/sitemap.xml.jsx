import React from "react";

import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import { DOMAIN } from "../../config";
import axios from 'axios'

const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
var XMLHttpRequest = require('xhr2');



export default async (req, res) => {

  const BASE_URL = DOMAIN; //This is where you will define your base url. You can also use the default dev url http://localhost:3000

  const  getAllBlogPosts =()=>{
    let skip = 0;
    let limit = 0;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs,
                categories: data.categories,
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
}

  const {blogs,categories,tags} = await getAllBlogPosts() // your custom API call


let arraydata=[]
let contactarray = []
let url=[]

let  obj1={

  url:`${BASE_URL}`,
  changefreq: "daily", priority: 0.3 ,
  lastmod:new Date().toISOString()
}

let  obj2={
  url:`${BASE_URL}/contact`,
  changefreq: "daily", priority: 0.3 ,
  lastmod:new Date().toISOString()
}

let  obj3={

  url:`${BASE_URL}/blogs`,
  changefreq: "daily", priority: 0.3 ,
  lastmod:new Date().toISOString()
}

arraydata.push(obj1)
arraydata.push(obj2)
arraydata.push(obj3)

  const dynamicBlog = blogs.map( singlecat=> {

   // return `${BASE_URL}/blogs/${singlecat.slug}`

    let  obj={
 
      url:`${BASE_URL}/blogs/${singlecat.slug}`,
      changefreq: "daily", priority: 0.3 ,
      lastmod:new Date().toISOString()
    }
    let  contactobj ={
 
      url:`${BASE_URL}/search?${singlecat.slug}`,
      changefreq: "daily", priority: 0.3 ,
      lastmod:new Date().toISOString()
    }
    
    url.push(`"${BASE_URL}/blogs/${singlecat.slug}"`)

    arraydata.push(obj)
    arraydata.push(contactobj)
  })
  
  const dynamicTags = tags.map( singlecat=> {

   // return `${BASE_URL}/tags/${singlecat.slug}`
   
   let  obj={

    url:`${BASE_URL}/tags/${singlecat.slug}`,
    changefreq: "daily", priority: 0.3 ,
    lastmod:new Date().toISOString()
  }
  let  obj2={

    url:`${BASE_URL}/search?${singlecat.slug}`,
    changefreq: "daily", priority: 0.3 ,
    lastmod:new Date().toISOString()
  }
  url.push(`"${BASE_URL}/tags/${singlecat.slug}"`)
  arraydata.push(obj)
  arraydata.push(obj2)


  })


  const dynamicPaths = categories.map( singlecat=> {

   // return `${BASE_URL}/categories/${singlecat.slug}`

   let  obj={

    url:`${BASE_URL}/categories/${singlecat.slug}`,
    changefreq: "daily", priority: 0.3 ,
    lastmod:new Date().toISOString()
  }
  let  obj3={

    url:`${BASE_URL}/search?${singlecat.slug}`,
    changefreq: "daily", priority: 0.3 ,
    lastmod:new Date().toISOString()
  }

  arraydata.push(obj)
  arraydata.push(obj3)
  url.push(`"${BASE_URL}/categories/${singlecat.slug}"`)

  })

  const allPaths = [...dynamicPaths,...dynamicBlog,...dynamicTags];

  console.log(url)


  //let url1 = "http://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=5f85bd77d4704b379769238f9f9d0f52";

  let url1 = "http://www.bing.com/indexnow";

let xhr = new XMLHttpRequest();
xhr.open("POST", url1);

xhr.setRequestHeader("Accept", "application/json");
xhr.setRequestHeader("Content-Type", "application/json");

xhr.onreadystatechange = function () {
   if (xhr.readyState === 4) {
      console.log(xhr.responseText);
   }};



let data=`{
  host: "gloom.co.in",
  key: "2d67b2a737ff4649841b18ade7e9ed6b",
  keyLocation: "https://gloom.co.in/2d67b2a737ff4649841b18ade7e9ed6b.txt",
  urlList:[${url}]

}`


xhr.send(data);
  
  // Create a stream to write to
  const stream = new SitemapStream({ hostname: DOMAIN });

  res.writeHead(200, {
    "Content-Type": "application/xml",
  });

  const xmlString = await streamToPromise(
    Readable.from(arraydata).pipe(stream)
  ).then((data) => data.toString());

  res.end(xmlString);



};