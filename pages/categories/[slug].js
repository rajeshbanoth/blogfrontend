import { Container, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { singleCategory } from '../../actions/category';
import Card from '../../components/blog/Card';
//import Link from 'next/link';
import Layout from '../../components/Layout';
import MainFeaturedPost from '../../components/MainFeaturedPost';
import { APP_NAME, DOMAIN, FB_APP_ID } from '../../config';

const Category = ({ category, blogs, query }) => {

    const [cat,setcat]=useState([])

    const mainFeaturedPost = {
        title: category.name,

        image: 'https://source.unsplash.com/random',
       // imageText: 'Welcome to the World of Blogs,News and Article',
        //linkText: 'Continue reading…',
      };



    const showAllCategories = () => {
        return cat.map((c, i) => (
            <>

 <Link   underline="none"   
color="inherit"
            noWrap
            key={i}
            variant="body2"
            href={`/categories/${c.slug}`}
            sx={{ p: 1, flexShrink: 0, fontSize:'20px',fontFamily:'monospace'}}
          >
            {c.name}
          </Link>

   
                 </>

        ));
    };


useEffect(()=>{
    let skip = 0;
    let limit = 0;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {

           // console.log(data.categories)
              setcat(data.categories)

        }
    });

},[])


    const head = () => (
        <Head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1526259079521468"
     crossorigin="anonymous"></script>
            <div class="card">
                <div class="card-body">
                    <title>
                        {category.name} | {APP_NAME}
                    </title>
                    <meta name="description" content={`Gloom|Find What you want| Latest Blogs,Latest Articles,Latest News on  ${category.name} `} />
                    <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
                    <meta property="og:title" content={`Gloom|Find What you want| Latest Blogs,Latest Articles,Latest News on ${category.name}| ${APP_NAME}`} />
                    <meta property="og:description" content={`Gloom|Find What you want| Latest Blogs,Latest Articles,Latest News on  ${category.name}`} />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${DOMAIN}/categories/${query.slug}`} />
                    <meta property="og:site_name" content={`${APP_NAME}`} />

                    <meta property="og:image" content={`${DOMAIN}/static/images/favicon.png`} />
                    <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/favicon.png`} />
                    <meta property="og:image:type" content="image/jpg" />
                    <meta property="fb:app_id" content={`${FB_APP_ID}`} />

                </div>
            </div>

        </Head>
    );

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid text-center" style={{marginTop:'-50px'}}>
                    <Container maxWidth="lg">

<Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >

{showAllCategories()}
          </Toolbar>

       </Container>
                        <header>

                      
                        <MainFeaturedPost post={mainFeaturedPost} />
                        </header>

                    </div>

                    <div className="container-fluid">
                        <div className="row">

                            {blogs.map((b, i) => (

                                <div key={i} className="col-md-6" style={{ padding: '10px' }}>
                                    <div >

                                        <Card blog={b} />

                                    </div>


                                </div>
                            ))}

                        </div>
                    </div>

                </main>
            </Layout>
        </React.Fragment>
    );
};

Category.getInitialProps = ({ query }) => {
    return singleCategory(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            return { category: data.category, blogs: data.blogs, query };
        }
    });
};

export default Category;



