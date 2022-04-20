import { withRouter } from 'next/router';
import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import { Button } from 'reactstrap';
import { listBlogsWithCategoriesAndTags } from '../../actions/blog';
import { DOMAIN } from '../../config';

import CSVReader from "react-csv-reader";
import { TableBar } from '@mui/icons-material';
import Tablecomponent from '../../components/Tablecomponent';


const BASE_URL = DOMAIN; 

const Blogs = ({ blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router }) => {

    const [csv,setcsv]=useState([])
    let array=[]
    let categoryurl=[]
    let tagurl=[]
    let  blogsurl=[]
    let searchresults=[]




        blogs.map((blog, i) => {
            // ()
            let  obj={

                "URL":`"${BASE_URL}/blogs/${blog.slug}"`,
            
                "Date":`"${new Date().toISOString()}"`
              }

              let  obj1={

                "URL":`"${BASE_URL}/search?${blog.slug}"`,
            
                "Date":`"${new Date().toISOString()}"`
              }


              blogsurl.push(obj)
              searchresults.push(obj1)

              array.push(obj1) 
             array.push(obj)               
        });

         categories.map((c, i) => {

            let  obj={               
                "URL":`"${BASE_URL}/categories/${c.slug}"`,           
                "Date":`"${new Date().toISOString()}"`

              }

              let  obj1={
                "URL":`"${BASE_URL}/search?${c.slug}"`,            
                "Date":`"${new Date().toISOString()}"`
              }

              array.push(obj1) 
        
              array.push(obj)  
              
              categoryurl.push(obj)
              searchresults.push(obj1)

            });
    

        tags.map((t, i) => {
            let  obj={

                "URL":`"${BASE_URL}/tags/${t.slug}"`,
                "Date":`"${new Date().toISOString()}"`
              }

              let  obj1={

                "URL":`"${BASE_URL}/search?${t.slug}"`,
            
                "Date":`"${new Date().toISOString()}"`
              }

              array.push(obj1) 
              array.push(obj)   
              
              tagurl.push(obj)
              searchresults.push(obj1)

            });
    
      console.log(array)

   let headers = [
        { label: "URL", key: "URL" },
        { label: "Date", key: "Date" },
   
      ];



     const  convertToCSV=(arr)=> {
        const array = [Object.keys(arr[0])].concat(arr)
      
       const csv= array.map(it => {
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
     

      const handledownload =()=>{

        convertToCSV(array);

      }

      const handlecategoryurl=()=>{
        convertToCSV(categoryurl)
      }

      const handlesearchurl =()=>{
        convertToCSV(searchresults)
      }

      const handletagurl =()=>{
        convertToCSV(tagurl)       
      }

      const handleblogsurl =()=>{
        convertToCSV(blogsurl)
      }


      const handleForce = (data, fileInfo) =>{
        console.log(data)
        setcsv(data)
      };


      const removecommonurl=(urllist)=>{

        const myArray=urllist;

        console.log(myArray,"ra")
       
        for( var i=myArray.length - 1; i>=0; i--){
            for( var j=0; j<csv.length; j++){
                if(myArray[i] && (myArray[i].URL=== csv[j].url)){
                    myArray.splice(i, 1);
                }
            }
        }
       convertToCSV(myArray);

      }

      const handledownloaddata =()=>{
       // reove  common url from all the url (compare all  list of all urls)
        removecommonurl(array)

      }

      const  comparecategory =()=>{
        removecommonurl(categoryurl)

      }

      const comparesearch=()=>{
        removecommonurl(searchresults)

      }

      const comparetag=()=>{
        removecommonurl(tagurl)

      }
      const compareblog=()=>{

        removecommonurl(blogsurl)

      }

const papaparseOptions = {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true,
  transformHeader: header => header.toLowerCase().replace(/\W/g, "_")
};




      

    return (
<>
<Button onClick={handledownload}> Download All URl</Button>

<Button onClick={handlecategoryurl}> Download only categoryurl</Button>

<Button onClick={handletagurl}> Download  only tag url</Button>
<Button onClick={handlesearchurl}> Download only search url</Button>
<Button onClick={handleblogsurl}> Download only blogs</Button>


{/* <div className="container">
    <CSVReader
      cssClass="react-csv-input"
      label="Select csv to remove duplicate"
      onFileLoaded={handleForce}
      parserOptions={papaparseOptions}
    />
    <Button onClick={handledownloaddata}>Remove Common from All urls list</Button>
    <Button onClick={comparecategory}>Remove Common from categoryurl list</Button>
    <Button onClick={comparetag}>Remove Common from  all tags list</Button>
    <Button onClick={comparesearch}>Remove Common from  all search list</Button>
    <Button onClick={compareblog}>Remove Common from All blogs list</Button>
   
  </div> */}


<div style={{padding:'20px'}}>
<Tablecomponent urllist={array} heading={"List Of All Urls"}/>

</div>

<div style={{padding:'20px'}}>
<Tablecomponent urllist={categoryurl} heading={"List Of All Category Url"}/>

</div>

<div style={{padding:'20px'}}>
<Tablecomponent urllist={tagurl} heading={"List Of All Tag Urls"}/>

</div>

<div style={{padding:'20px'}}>
<Tablecomponent urllist={searchresults} heading={"List Of All Search Urls"}/>

</div>






</>
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
