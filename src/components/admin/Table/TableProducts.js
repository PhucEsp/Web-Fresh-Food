import React, { useEffect, useState } from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { Button } from '@material-ui/core';

// search bar
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    table: {
        minWidth: 700,
        // height: 400
    },
    container: {
      maxHeight: '70vh',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1
    },
    iconButton: {
      padding: 10
    },
    divider: {
      height: 28,
      margin: 4
    },
    searchBar: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: 400,
      marginBottom: 20,
      border: "1px solid #999",
      width: 500
    },
}));

// table 
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(TableCell);
  
  const StyleSelect = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  }))(Select);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover
      }
    }
  }))(TableRow);

function TableProducts({columns,rows,handleEdit, handleDelete}) {
    const classes = useStyles();
    const [listProduct, setListProduct] = useState(rows)
    
    const configProductDescription = (text) => {
      if(text === null) return " "
      else if(text.length > 50) return text.slice(0,50).concat('...')
      else return text
    }

    useEffect(() => {
      setListProduct(rows)
    }, [rows])

    const handleChange = (e) => {
      if(e.target.value.trim() === ""){
        setListProduct(rows)
      }
      const newlistSearch = rows.filter(product => {
        return  product.TENSP.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase());
      })
      setListProduct(newlistSearch)
    }

    return (
        <div>
            <Paper component="form" className={classes.searchBar}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Tìm kiếm theo tên sản phẩm"
                inputProps={{ "aria-label": "Search" }}
                onChange={handleChange}
              />
              <IconButton
                // type="submit"
                className={classes.iconButton}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
            </Paper>
            <TableContainer className={classes.container} component={Paper}>
              <Table className={classes.table} stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}                                       
                    </TableRow>
                  </TableHead>
                  <TableBody>
                  {listProduct.map((row) => (
                      <StyledTableRow key={row.ID}>
                      <StyledTableCell component="th" scope="row">
                          {row.ID}
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.TENSP}</StyledTableCell>
                      <StyledTableCell align="center"><NumberFormat value={row.GIA} displayType={'text'} thousandSeparator={true}/> </StyledTableCell>
                      <StyledTableCell align="center">{row.DONVITINH}</StyledTableCell>
                      <StyledTableCell align="center"><NumberFormat value={row.SOLUONG} displayType={'text'} thousandSeparator={true}/></StyledTableCell>
                      <StyledTableCell align="center">{configProductDescription(row.MOTA)}</StyledTableCell>
                      <StyledTableCell align="center">
                          <Button onClick={(e) => {handleEdit(row)}} >
                            <EditIcon ></EditIcon>
                          </Button>
                      </StyledTableCell>
                      <StyledTableCell align="center">
                          <Button onClick={() => {handleDelete(row.ID)}} >
                            <DeleteIcon></DeleteIcon>
                          </Button>
                      </StyledTableCell>
                      </StyledTableRow>
                  ))}
                  </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
}

export default TableProducts
