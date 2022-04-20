import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Private from '../../components/auth/Private';
import Layout from '../../components/Layout';




const UserIndex = () => {
    const features = [
 

        {
            heading: "Create Blog",
            link: '/user/crud/blog',
            icons: <PostAddIcon style={{ color: '#0F9D58', fontSize: '60px' }} fontSize='large' />,

        },
        {
            heading: "Update/Delete Blog",
            link: '/user/crud/blogs',
            icons: <ModeEditIcon  style={{ color: '#DB4437', fontSize: '60px' }} fontSize='large' />,

        },
        {
            heading: "Update Profile",

            link: '/user/update',
            icons: <ManageAccountsIcon style={{ color: '#F4B400', fontSize: '80px' }} fontSize='large' />,

        },

    ]


    return (
        <Layout>
            <Private>
                <div style={{backgroundColor:'#fafafa'}}>
                
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingTop:'70px'}}>
            <Typography variant='h3' fontWeight={500}> Dashboard</Typography>
          
            </div>

    

            <div className="container-fluid">
                <div className="row">

                    {features.map((item,i) => (
                        <div key={i} className="col-md-4">
                            <div  style={{padding:'10px'}}>

                                <Card sx={{ maxWidth: 345,display: 'flex',  justifyContent:'center', alignItems:'center',}} >
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

    
            </Private>
        </Layout>
    );
};

export default UserIndex;
