import { Divider, Link, Typography } from '@mui/material'
import React from 'react'

import Box from '@mui/material/Box';

import Homepagecard from '../components/blog/HomepageBlogCard'
import { API } from '../config';

export default function Bloglisthome(props) {

    console.log(props.blogs)
    console.log(props.categories)



    let array = []

    props.blogs.map((item, i) => {
        array.push(item.categories[0].name)
    })



    let uniqueval = [...new Set(array)];
    console.log(uniqueval)



    const showAllBlogs = () => {
        return uniqueval.map((cat, i) => {

            return (
                <>


                    <div>

                        <div>
                            <Typography component="div">

                                <Box sx={{  fontSize: 'h6.fontSize', m: 1,fontWeight:800,color:'#0F9D58' }}>
                                    {cat}
                                </Box>
                            </Typography>
                            <Divider style={{ minWidth: '100%' }} />

                        </div>




                        {props.blogs.map((blog, i) => (
                            < >

                                {blog.categories[0].name === cat && (

                                    <div key={i} style={{ padding: '10px' }}>

                                        <div>
                                            <Homepagecard blog={blog} />
                                        </div>





                                    </div>
                                )}



                            </>))}


                            <div className="display-2 pb-3 pt-3 text-center font-weight-bold" style={{ marginTop: '30px', display: 'center', overflowWrap: 'break-word', justifyContent: 'center', paddingLeft: '5px', paddingRight: '5px' }}>


                            <Typography component="div">



<Link href={`/categories/${cat.toLowerCase()}`}underline="none">
View All {cat} Blogs
</Link>
</Typography>



</div>

                           






                    </div>














                </>
            )


        })

    };


    return (
        <>

            {showAllBlogs()}

        </>
    )
}
