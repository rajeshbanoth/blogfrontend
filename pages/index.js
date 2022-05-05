import { Box, Container, Divider, Grid, Toolbar, Typography } from '@mui/material';
import Link from '@mui/material/Link';
//import Link from 'next/link';
import Head from 'next/head';
import { withRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { listBlogsWithCategoriesAndTags } from '../actions/blog';
import { getCategories,singleCategoryForHome } from '../actions/category';
import Bloglisthome from '../components/BlogListHome';
import Layout from '../components/Layout';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { APP_NAME, DOMAIN, FB_APP_ID } from '../config';
import Homepagecard from '../components/blog/LatestBlogCards'
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";


const Index = ({ router }) => {
    const [category, setCategories] = useState([])
    const [blogs,setblogs]=useState([])
    const [latestblog,setlatestblogs]=useState([])

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
  
            } else {
                setCategories(data);
                setcat(data)
                console.log(data.length,"len")
                let len=data.length-1

                let array=[]
              

             data.map((item,key)=>{
                 console.log(key,"key")
                singleCategoryForHome(item.name).then(data => {
                    if (data.error) {
                        console.log(data.error);
                    } else {

                        if(data.blogs.length>0)
                        {
                            array.push(...data.blogs)
                        }

                        if(len==key)
                        {
                            setblogs(array)
                        }
                    }
                });

             })

       

            }
        });



        let skip = 0;
        let limit = 4;
        listBlogsWithCategoriesAndTags(skip, limit).then(data => {
            if (data.error) {
                // console.log(data.error);
            } else {
              {
                    // blogs: data.blogs,
                    // categories: data.categories,
                    // tags: data.tags,
                    // totalBlogs: data.size,
                    // blogsLimit: limit,
                    // blogSkip: skip
                    setlatestblogs(data.blogs)
                };
            }
        });

    }, [])


    // useEffect(()=>{
    //     let skip = 0;
    //     let limit = 0;
    //     return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
    //         if (data.error) {
    //             console.log(data.error);
    //         } else {
    
    //             console.log(data.categories)
    //               setcat(data.categories)
    
    //         }
    //     });
    
    // },[])


    const showAllCategories = () => {
        return cat.map((c, i) => (
            <>

 <Link   underline="none"   
color="inherit"
            noWrap
            key={i}
            variant="body2"
            href={`/categories/${c.slug}`}
            sx={{ p: 1, flexShrink: 0, fontSize:'20px',fontFamily: 'Monospace'}}
          >
            {c.name}
          </Link>

   
                 </>

        ));
    };


    const showlatestblogs =()=>{
        return latestblog.map((blog,i)=>{
            return(
                <div key={i}  style={{ padding: '10px' }}>
                                 
                <div>
                <Homepagecard blog={blog} />
                </div>

                </div>
            )
        })
    }

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

                    <MDBContainer>
      <MDBRow>

      <MDBCol md="6"><Typography component="div">

<Box sx={{ fontFamily: 'Monospace', fontSize: 'h6.fontSize', m: 1 }}>
Latest Articles
</Box>
</Typography>
<Divider style={{ minWidth: '100%' }} />


    {showlatestblogs()}</MDBCol>
        <MDBCol md="6"><Bloglisthome  blogs={blogs} categories={category}/></MDBCol>

      
      </MDBRow>
    </MDBContainer>

                </article>

{/* 
                <Footer /> */}
            </Layout>
        </React.Fragment>
    );
};

export default withRouter(Index);
