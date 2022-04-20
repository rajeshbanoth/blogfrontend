import { Container, Toolbar } from '@mui/material';
import Link from '@mui/material/Link';
//import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import { getCategories } from '../actions/category';
import Layout from '../components/Layout';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { APP_NAME, DOMAIN, FB_APP_ID } from '../config';


const Index = ({ router }) => {
    const [category, setCategories] = useState([])

    const mainFeaturedPost = {
        title: APP_NAME,
        description:
          "Find What You Want",
        image: 'https://source.unsplash.com/random/?library',
        imageText: 'Welcome to the World of Blogs,News and Article',
        //linkText: 'Continue reading…',
      };

      const [cat,setcat]=useState([])

    useEffect(() => {

        getCategories().then(data => {
            if (data.error) {
                console.log(data.error)
                //setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
                console.log(data)
            }
        });

    }, [])


    useEffect(()=>{
        let skip = 0;
        let limit = 0;
        return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
    
                console.log(data.categories)
                  setcat(data.categories)
    
            }
        });
    
    },[])


    const showAllCategories = () => {
        return cat.map((c, i) => (
            <>

 <Link   underline="none"   
color="inherit"
            noWrap
            key={i}
            variant="body2"
            href={`/categories/${c.slug}`}
            sx={{ p: 1, flexShrink: 0, fontSize:'20px'}}
          >
            {c.name}
          </Link>

   
                 </>

        ));
    };

    const head = () => (
        <Head>
                        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1526259079521468"
     crossorigin="anonymous"></script>
            <title> {APP_NAME}|Find What You Want|Latest Blogs,Latest News,Latest Articles</title>
            <meta
                name="description"
                content="Welcome to the World of Blogs,News and Article"
            />
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`} />
            <meta property="og:title" content={` ${APP_NAME}|Find What You Want`} />
            <meta
                property="og:description"
                content="Welcome to the World of Blogs,News and Article"
            />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`} />
            <meta property="og:site_name" content={`${APP_NAME}|Find What You Want`} />

            <meta property="og:image" content={`${DOMAIN}/static/images/favicon.png`} />
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/favicon.png`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );
    return (
        <React.Fragment>
            {head()}
            <Layout>
                <article className="overflow-hidden">
                <Container maxWidth="lg">

<Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >

{showAllCategories()}
          </Toolbar>

       </Container>


                    <div className="container" style={{paddingTop:'20px'}}>

                    <MainFeaturedPost post={mainFeaturedPost} />
                        <div className="row">
                            <div className="col-md-12 text-center pt-4 pb-5">
                                <p className="lead">
                                   Welcome to the World of Blogs,News and Article
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="container-fluid">
                        <div className="row">

                            {category.map((item,i) => (
                                <div key={i} className="col-md-4">
                                    <div className="flip flip-horizontal">
                                        <div
                                            className="front"
                                            style={{
                                                backgroundImage: `url(https://source.unsplash.com/random/?${item.name} )`
                                        }}
                                        >
                                            <h2 className="text-shadow text-center h1">{item.name}</h2>
                                        </div>
                                        <div className="back text-center">
                                            <Link href={`/categories/${item.name}`}>
                                               
                                                    <h3 className="h1">{item.name}</h3>
                                                
                                            </Link>
                                            <p className="lead">
                                               click here to view all the content related to {item.name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}


                            {/* <div className="col-md-4">
                                <div className="flip flip-horizontal">
                                    <div
                                        className="front"
                                        style={{
                                            backgroundImage: 'url(' + '/static/images/mountain.jpg' + ')'
                                        }}
                                    >
                                        <h2 className="text-shadow text-center h1">Node</h2>
                                    </div>
                                    <div className="back text-center">
                                        <Link href="/categories/node">
                                            <a>
                                                <h3 className="h1">Node Js</h3>
                                            </a>
                                        </Link>
                                        <p className="lead">
                                            The worlds most popular backend development tool for JavaScript Ninjas
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="flip flip-horizontal">
                                    <div
                                        className="front"
                                        style={{
                                            backgroundImage: 'url(' + '/static/images/mountain.jpg' + ')'
                                        }}
                                    >
                                        <h2 className="text-shadow text-center h1">Next</h2>
                                    </div>
                                    <div className="back text-center">
                                        <Link href="/categories/nextjs">
                                            <a>
                                                <h3 className="h1">Next Js</h3>
                                            </a>
                                        </Link>
                                        <p className="lead">
                                            A Production ready web framework for building SEO React apps
                                        </p>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </article>

{/* 
                <Footer /> */}
            </Layout>
        </React.Fragment>
    );
};

export default withRouter(Index);
