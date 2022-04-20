import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField, Typography } from '@mui/material';
import { DOMAIN, INDEX_URL } from '../config';
import TablePagination from '@mui/material/TablePagination';
import axios from 'axios'
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));




export default function Tablecomponent(props) {

  const [status,setstatus]=React.useState('')
  const [urllist,seturllist]=React.useState(props.urllist)


  const [duplicate, setduplicate] = React.useState(props.urllist)

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handlechangefilter = (e) => {
    if (e.target.value != '' || e.target.value.length === 0 || e.target.value === " ") {

      let updatedblogs = duplicate

      updatedblogs = updatedblogs.filter(item => {
        return item.URL.toLowerCase().indexOf(
          e.target.value.toLowerCase()
        ) !== -1;
      });

      seturllist(updatedblogs)
      //setfilter(e.target.value)

    }
    else {
      //console.log(duplicateblog)
      seturllist(duplicate)

    }
  }





  const viewstatus=(urlval)=>{

    let url= urlval.replace(/^["'](.+(?=["']$))["']$/, '$1');


    axios.post(INDEX_URL+"/viewindex",{url}).then(res=>{
    
    
      if(res.data.error!=undefined)
      {
        setstatus(res.data.error.message)
      }
      else{
        setstatus(JSON.stringify(res.data))
      }
  


    
      
    })

 

  }
  const addindex=(urlval)=>{

    let url= urlval.replace(/^["'](.+(?=["']$))["']$/, '$1');


    const type='URL_UPDATED'

axios.post(INDEX_URL+"/addindex",{url,type}).then(res=>{

console.log( JSON.stringify(res.data.urlNotificationMetadata) )
 setstatus(JSON.stringify(JSON.stringify(res.data.urlNotificationMetadata)))

  
})


  }
  const removeindex=(urlval)=>{



    let url= urlval.replace(/^["'](.+(?=["']$))["']$/, '$1');

    const type='URL_DELETED'
    axios.post(INDEX_URL+"/deleteindex",{url,type}).then(res=>{
      setstatus(JSON.stringify(JSON.stringify(res.data.urlNotificationMetadata)))
    })
  }


  return (
    <>


    <Typography variant='h4'>{props.heading}</Typography>
    <Typography color='primary' variant='body2'>{status}</Typography>
    <Search>
            <SearchIconWrapper>
              <FilterListIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handlechangefilter}
            />
          </Search>

   

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    
    <TableContainer  sx={{ maxHeight: 440 }} >
      <Table  stickyHeader aria-label="sticky table" sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell>URL</StyledTableCell>
            <StyledTableCell align="right">DATE</StyledTableCell>
            <StyledTableCell align="right">Get Status</StyledTableCell>
            <StyledTableCell align="right">send for indexind </StyledTableCell>
            <StyledTableCell align="right">remove indexing</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {urllist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
.map((row,key) => (
            <StyledTableRow key={key}>
                            <StyledTableCell component="th" scope="row">
                {row.URL}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.Date}
              </StyledTableCell>
              <StyledTableCell align="right">
                <Button onClick={()=>viewstatus(row.URL)}>Get status</Button>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Button onClick={()=>addindex(row.URL)}>Add to indexind</Button>
                </StyledTableCell>
              <StyledTableCell align="right">
              <Button onClick={()=>removeindex(row.URL)}>Delete from indexind</Button>
              </StyledTableCell>
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.urllist.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}