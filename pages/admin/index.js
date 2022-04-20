import CategoryIcon from '@mui/icons-material/Category';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TagIcon from '@mui/icons-material/Tag';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Admin from '../../components/auth/Admin';
import Layout from '../../components/Layout';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';



const AdminIndex = () => {
    const features = [
        {
            heading: "Create Category",
            link: '/admin/crud/category-tag',
            icons: <CategoryIcon  color={'primary'} style={{ fontSize: '60px' }} fontSize='large' />,

        },

        {
            heading: "Create Tag",
            link: '/admin/crud/category-tag',
            icons: <TagIcon  style={{ color: '#DAFF33', fontSize: '60px' }} fontSize='large' />,

        },
        {
            heading: "Create Blog",
            link: '/admin/crud/blog',
            icons: <PostAddIcon style={{ color: '#0F9D58', fontSize: '60px' }} fontSize='large' />,

        },
        {
            heading: "Update/Delete Blog",
            link: '/admin/crud/blogs',
            icons: <ModeEditIcon  style={{ color: '#DB4437', fontSize: '60px' }} fontSize='large' />,

        },
        {
            heading: "Update Profile",

            link: '/user/update',
            icons: <ManageAccountsIcon style={{ color: '#F4B400', fontSize: '80px' }} fontSize='large' />,

        },

        {
            heading: "Site Indexing Tools",
            link: '/tool',
            icons: <HomeRepairServiceIcon style={{ color: '#7c26ab', fontSize: '80px' }} fontSize='large' />,

        },

    ]


    return (


        <Layout >
            <Admin>
                <div style={{backgroundColor:'#fafafa'}}>

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'80px'}}>
            <Typography variant='h3' fontWeight={500}>Admin Dashboard</Typography>
          

            </div>

    

            <div className="container-fluid">
                <div className="row">

                    {features.map((item,i) => (
                        <div key={i} className="col-md-4">
                            <div  style={{padding:'10px'}}>

                                <Card sx={{ maxWidth: 345,display: 'flex',  justifyContent:'center', alignItems:'center'}} >
                                    <div >
                                    <CardActionArea href={item.link} >
                                        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',}}>
                                        <CardMedia
                                        >                                       
                                            {item.icons}
                                        </CardMedia>
                                        </div>
 
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {item.heading}
                                            </Typography>

                                        </CardContent>
                                    </CardActionArea>

</div>
                                </Card>

                            </div>
                        </div>
                    ))}



                </div>
            </div>

            </div>

        

</Admin>
        </Layout>
    );
};

export default AdminIndex;
