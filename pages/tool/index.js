import { withRouter } from 'next/router';
import React, { useState } from 'react';

import { Button } from 'reactstrap';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { DOMAIN } from '../../config';

import Tablecomponent from '../../components/Tablecomponent';
import Admin from '../../components/auth/Admin';
import Layout from '../../components/Layout';

import Header from '../../components/Header';

const BASE_URL = DOMAIN;

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

  let array = []
  let categoryurl = []
  let tagurl = []
  let blogsurl = []
  let searchresults = []

  blogs.map((blog, i) => {
    let obj = {

      "URL": `"${BASE_URL}/blogs/${blog.slug}"`,

      "Date": `"${new Date().toISOString()}"`
    }

    let obj1 = {

      "URL": `"${BASE_URL}/search?${blog.slug}"`,

      "Date": `"${new Date().toISOString()}"`
    }


    blogsurl.push(obj)
    searchresults.push(obj1)

    array.push(obj1)
    array.push(obj)
  });

  categories.map((c, i) => {

    let obj = {
      "URL": `"${BASE_URL}/categories/${c.slug}"`,
      "Date": `"${new Date().toISOString()}"`

    }

    let obj1 = {
      "URL": `"${BASE_URL}/search?${c.slug}"`,
      "Date": `"${new Date().toISOString()}"`
    }

    array.push(obj1)

    array.push(obj)

    categoryurl.push(obj)
    searchresults.push(obj1)

  });


  tags.map((t, i) => {
    let obj = {

      "URL": `"${BASE_URL}/tags/${t.slug}"`,
      "Date": `"${new Date().toISOString()}"`
    }

    let obj1 = {

      "URL": `"${BASE_URL}/search?${t.slug}"`,

      "Date": `"${new Date().toISOString()}"`
    }

    array.push(obj1)
    array.push(obj)

    tagurl.push(obj)
    searchresults.push(obj1)

  });

  

  const convertToCSV = (arr) => {
    const array = [Object.keys(arr[0])].concat(arr)

    const csv = array.map(it => {
      return Object.values(it).toString()
    }).join('\n')

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "data.csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

  }


  const handledownload = () => {

    convertToCSV(array);

  }

  const handlecategoryurl = () => {
    convertToCSV(categoryurl)
  }

  const handlesearchurl = () => {
    convertToCSV(searchresults)
  }

  const handletagurl = () => {
    convertToCSV(tagurl)
  }

  const handleblogsurl = () => {
    convertToCSV(blogsurl)
  }


  return (


    
    <Layout >
    <Admin>
    <>
    <Header />
      <Button onClick={handledownload}> Download All URl</Button>

      <Button onClick={handlecategoryurl}> Download only categoryurl</Button>

      <Button onClick={handletagurl}> Download  only tag url</Button>
      <Button onClick={handlesearchurl}> Download only search url</Button>
      <Button onClick={handleblogsurl}> Download only blogs</Button>


      <div style={{ padding: '20px' }}>
        <Tablecomponent urllist={array} heading={"List Of All Urls"} />

      </div>

      <div style={{ padding: '20px' }}>
        <Tablecomponent urllist={categoryurl} heading={"List Of All Category Url"} />

      </div>

      <div style={{ padding: '20px' }}>
        <Tablecomponent urllist={tagurl} heading={"List Of All Tag Urls"} />

      </div>

      <div style={{ padding: '20px' }}>
        <Tablecomponent urllist={searchresults} heading={"List Of All Search Urls"} />

      </div>






    </>

    </Admin>
    </Layout>
  );
};

Blogs.getInitialProps = () => {
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
};

export default withRouter(Blogs);
