import { Container, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';
import Head from 'next/head';

import { withRouter } from 'next/router';
import React, { useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import Card from '../../components/blog/Card';
import Layout from '../../components/Layout';
import MainFeaturedPost from '../../components/MainFeaturedPost';
import { APP_NAME, DOMAIN, FB_APP_ID } from '../../config';

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {
    const head = () => (
        <Head>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1526259079521468"
     crossorigin="anonymous"></script>
            <title> {APP_NAME}</title>
            <meta
                name="description"
                content="Gloom:Find What You Want"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={` ${APP_NAME}|Place where you can find all the content related to Blogs `} />
            <meta
                property="og:description"
                content="Gloom is a place where you can find all the content related to Blogs,News,Articles"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}|Find What You Want`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/seoblog.jpg`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);


    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if (data.error) {
                // console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <button onClick={loadMore} className="btn btn-outline-primary btn-lg">
                    Load more
                </button>
            )
        );
    };

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            // ()
            console.log(blog)
            return (
                // <article key={i}>
                //     <Card blog={blog} />
                // </article>

                <div key={i} className="col-md-6" style={{ padding: '10px' }}>
                    <div >

                        <Card blog={blog} />

                    </div>


                </div>


            );
        });
    };

    const showAllCategories = () => {
        return categories.map((c, i) => (
            <>

                <Link underline="none"
                    color="inherit"
                    noWrap
                    key={i}
                    variant="body2"
                    href={`/categories/${c.slug}`}
                    sx={{ p: 1, flexShrink: 0, fontSize: '20px' ,fontFamily: 'Monospace'}}
                >
                    {c.name}
                </Link>

            </>

        ));
    };

    const showAllTags = () => {
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ));
    };

    const mainFeaturedPost = {
        title: APP_NAME,
        description:
            "Find What You Want",
        image: 'https://source.unsplash.com/random',
        imageText: APP_NAME,
        //linkText: 'Continue reading…',
    };

    const showLoadedBlogs = () => {

        // console.log(loadedBlogs,"loa")
        return loadedBlogs.map((blog, i) => (
            // <article key={i}>
            //     <Card blog={blog} />
            // </article>

            <div key={i} className="col-md-6" style={{ padding: '10px' }}>
                <div >

                    <Card blog={blog} />

                </div>





            </div>
        ));
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <Container maxWidth="lg">

                                <Toolbar
                                    component="nav"
                                    variant="dense"
                                    sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
                                >

                                    {showAllCategories()}
                                </Toolbar>

                            </Container>




                            <div className="col-md-12 pt-3">
                                <h5 style={{ color: '#0F9D58', paddingBottom: '10px' }} className="display-4 font-weight-bold text-center">
                                    Blogs,News and Articles
                                </h5>
                            </div>

                            <MainFeaturedPost post={mainFeaturedPost} />


                            <section>
                                {/* <div className="pb-5 text-center">
                                    {showAllCategories()}
                                    <br />
                                    {showAllTags()}
                                </div> */}


                            </section>
                        </header>
                    </div>
                    <div className="container-fluid">
                        <div className="row">        {showAllBlogs()}</div>


                    </div>



                    <div className="container-fluid">
                    <div className="row"> 
                        
                        {showLoadedBlogs()}
                        </div></div>
                    <div className="text-center pt-5 pb-5">{loadMoreButton()}</div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 8;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if (data.error) {
            // console.log(data.error);
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
