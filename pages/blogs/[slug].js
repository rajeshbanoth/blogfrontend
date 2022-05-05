import { Paper, Toolbar } from '@mui/material';
import Chip from '@mui/material/Chip';
import dynamic from 'next/dynamic';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import moment from 'moment';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import renderHTML from 'react-render-html';
import ReactRoundedImage from "react-rounded-image";
import { Container } from 'reactstrap';
import { listBlogsWithCategoriesAndTags, listRelated, singleBlog } from '../../actions/blog';
import SmallCard from '../../components/blog/SmallCardMui';
import DisqusThread from '../../components/DisqusThread';
//import Link from 'next/link';
import Layout from '../../components/Layout';
import { API, APP_NAME, DOMAIN, FB_APP_ID } from '../../config';
import EditIcon from '@mui/icons-material/Edit';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Divider from '@mui/material/Divider';
const MediumEditor = dynamic(() => import('../../Editor/Readdata'), { ssr: false });



import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";

import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
} from "react-share";



const SingleBlog = ({ blog, query }) => {

    const [related, setRelated] = useState([]);
    const [cat, setcat] = useState([])

    const loadRelated = () => {
        listRelated({ blog }).then(data => {

            if (data !== undefined) {

                if (data.error) {
                    console.log(data.error);
                } else {
                    setRelated(data);
                }

            }
            else {
                console.log("undefined data")
            }

        });
    };

    useEffect(() => {
        loadRelated();
    }, []);

    useEffect(() => {
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

    }, [])




    const showAllCategories = () => {
        return cat.map((c, i) => (
            <>

                <Link underline="none"
                    color="inherit"
                    noWrap
                    key={i}
                    variant="body2"
                    href={`/categories/${c.slug}`}
                    sx={{ p: 1, flexShrink: 0, fontSize: '20px' ,fontFamily: 'Monospace' }}
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
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta name="description" content={"Gloom||Bogs||" + blog.mdesc} />
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:title" content={`Gloom||${blog.title}| ${APP_NAME}`} />
            <meta property="og:description" content={"Gloom||Blogs||" + blog.mdesc} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
            <meta property="og:site_name" content={`${APP_NAME}:Find What You Want`} />

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:secure_url" ccontent={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg" />
            <meta property="fb:app_id" content={`${FB_APP_ID}`} />
        </Head>
    );

    const showBlogCategories = blog =>
        blog.categories.map((c, i) => (

            <>
                <div key={i} style={{ padding: '5px' }}><Chip color="success" label={c.name} component="a" key={i} href={`/categories/${c.slug}`} clickable /></div>

            </>

        ));

    const showBlogTags = blog =>
        blog.tags.map((t, i) => (


            <div key={i} style={{ padding: '5px' }}>
                <Chip color="primary" label={t.name} component="a" key={i} href={`/tags/${t.slug}`} clickable />


            </div>

        ));

    const showRelatedBlog = () => {
        return related.map((blog, i) => (
            <div className="col-md-4" key={i}>
                <article>
                    <SmallCard blog={blog} />
                </article>
            </div>
        ));
    };



    const showComments = () => {
        return (
            <div>
                <DisqusThread id={blog._id} title={blog.title} path={`/blog/${blog.slug}`} />
            </div>
        );
    };

    return (
        <React.Fragment>
            {head()}
            <Layout>

                <Paper>
                    <main>
                        <article>
                            <div className="container-fluid" >
                                <section>
                                    <Container maxWidth="lg">

                                        <Toolbar
                                            component="nav"
                                            variant="dense"
                                            sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
                                        >

                                            {showAllCategories()}
                                        </Toolbar>

                                    </Container>

                                </section>

                                <section>
                                    <div className="container" style={{ background: '#ffffff' }}>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                //justifyContent: 'center',
                                                backgroundColor: 'tranparent',
                                                flexWrap: 'wrap',
                                                listStyle: 'none',
                                                p: 0.5,
                                                m: 0,
                                            }}
                                            component="ul"
                                        >
                                            <EmailShareButton url={`${DOMAIN}/blogs/${blog.slug}`} >
                                                <EmailIcon size={40} />
                                            </EmailShareButton>
                                            <TwitterShareButton url={`${DOMAIN}/blogs/${blog.slug}`} >
                                                <TwitterIcon size={40} />
                                            </TwitterShareButton>
                                            <FacebookShareButton url={`${DOMAIN}/blogs/${blog.slug}`} >
                                                <FacebookIcon size={40} />
                                            </FacebookShareButton>
                                            <TelegramShareButton url={`${DOMAIN}/blogs/${blog.slug}`} >
                                                <TelegramIcon size={40} />
                                            </TelegramShareButton>
                                            <WhatsappShareButton url={`${DOMAIN}/blogs/${blog.slug}`}>
                                                <WhatsappIcon size={40} />
                                            </WhatsappShareButton>
                                            <LinkedinShareButton url={`${DOMAIN}/blogs/${blog.slug}`}>
                                                <LinkedinIcon size={40} />

                                            </LinkedinShareButton>

                                        </Box>



                                        <div className="display-2 pb-3 pt-3 text-center font-weight-bold" style={{ marginTop: '30px', display: 'center', overflowWrap: 'break-word', justifyContent: 'center', paddingLeft: '5px', paddingRight: '5px' }}>


                                           
                                            <Typography component='div'>
                                                <Box sx={{ fontWeight: 1000, m: 1, fontSize: '30px', color: '#535353',fontFamily: 'Monospace'  }}>{blog.title}</Box>

                                            </Typography>


                                            <div>


                                                <Typography sx={{ color: '#595855', fontSize: '12px' }}     >
                                                    {<EditIcon style={{ color: '#0F9D58' }} fontSize='small' />}{' '}
                                                    <Link href={`/profile/${blog.postedBy.username}`}>
                                                        {blog.postedBy.username}
                                                    </Link>{' '}
                                                    | {<AccessTimeIcon style={{ color: '#DB4437' }} fontSize='small' />} {moment(blog.updatedAt).fromNow()}
                                                </Typography>



                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        backgroundColor: 'tranparent',
                                                        flexWrap: 'wrap',
                                                        listStyle: 'none',
                                                        p: 0.5,
                                                        m: 0,
                                                    }}
                                                    component="ul"
                                                >
                                                    {showBlogCategories(blog)}
                                                    {showBlogTags(blog)}
                                                </Box>


                                            </div>



                                        </div>

                                        <div className="row" style={{ marginTop: '30px', display: 'center', justifyContent: 'center', paddingLeft: '5px', paddingRight: '5px' }}>

                                            <Box
                                                component="img"
                                                sx={{
                                                    //   height: 233,
                                                    //   width: 350,
                                                    minHeight: { xs: 233, md: 450, lg: 200 },
                                                    minWidth: { xs: 350, md: 450, lg: 700 },
                                                    maxHeight: { xs: 233, md: 450, lg: 400 },
                                                    maxWidth: { xs: 350, md: 450, lg: 700 },
                                                }}
                                                alt="image"
                                                src={`${API}/blog/photo/${blog.slug}`}
                                            />

                                        </div>






                                        <br />
                                        <br />

                                    </div>
                                </section>
                            </div>
                           
                       

                            <div className="container">
                                <section>


                                    {blog.body.substring(2, 6) === 'time' ? (<>
                                        <MediumEditor value={JSON.parse(blog.body)} /> </>) : (<>    <div className="col-md-12 lead" >   <Typography style={{ color: '#595855', wordBreak: 'break-word' , }}  >
                                            {/* style={{ color: '#595855' }}  */}

                                            {renderHTML(blog.body)}


                                        </Typography></div>    </>)}
                                </section>
                            </div>

                            <Divider />

                            <div className="container">


                            <div className="display-2 pb-3 pt-3 text-center font-weight-bold" style={{ marginTop: '30px', display: 'center', overflowWrap: 'break-word', justifyContent: 'center', paddingLeft: '5px', paddingRight: '5px' }}>


                                           
<Typography component='div'>
    <Box sx={{ fontWeight: 1000, m: 1, fontSize: '30px', color: '#535353',fontFamily: 'Monospace'  }}>Related Blogs</Box>

</Typography>
</div>

                                <div className="row">{showRelatedBlog()}</div>
                            </div>

                            <div className="container pt-5 pb-5">{showComments()}</div>
                        </article>
                    </main>

                </Paper>

            </Layout>
        </React.Fragment>
    );
};

SingleBlog.getInitialProps = ({ query }) => {
    return singleBlog(query.slug).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
            // console.log('GET INITIAL PROPS IN SINGLE BLOG', data);
            return { blog: data, query };
        }
    });
};

export default SingleBlog;
