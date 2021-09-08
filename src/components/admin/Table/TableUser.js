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
        minWidth: 700
    },
    container: {
        maxHeight: "70vh",
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

function TableUser({columns,rows,handleEdit, handleDelete}) {
    const classes = useStyles();
    const [listUser, setListUser] = useState(rows)

    useEffect(() => {
        setListUser(rows)
    }, [rows])

    const handleChange = (e) => {
        if(e.target.value.trim() === ""){
            setListUser(rows)
        }
        const newlistSearch = rows.filter(user => {
            return  user.TAIKHOAN.toLocaleLowerCase().trim().includes(e.target.value.toLocaleLowerCase().trim());
        })
        setListUser(newlistSearch)
    }

    return (
        <div>
            <Paper component="form" className={classes.searchBar}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Tìm kiếm theo tài khoản"
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
                        <Table className={classes.table} aria-label="customized table">
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
                            {listUser.map((row) => (
                                <StyledTableRow key={row.MAKH}>
                                   {
                                       row.MAKH && (
                                        <StyledTableCell component="th" scope="row">
                                            {row.MAKH}
                                        </StyledTableCell>
                                       )
                                   }
                                   {
                                       row.MANV && (
                                        <StyledTableCell component="th" scope="row">
                                            {row.MANV}
                                        </StyledTableCell>
                                       )
                                   }
                                    <StyledTableCell align="center">{row.HOTEN}</StyledTableCell>
                                    <StyledTableCell align="center"> {row.TAIKHOAN} </StyledTableCell>
                                    <StyledTableCell align="center">{row.DIACHI}</StyledTableCell>
                                    
                                    {
                                        row.SDT && (
                                            <StyledTableCell align="center"><NumberFormat value={row.SDT} displayType={'text'}/></StyledTableCell>
                                        )
                                    }
                                    {
                                        row.MAIL && (
                                            <StyledTableCell align="center">{row.MAIL}</StyledTableCell>
                                        )
                                    }

                                    
                                    {
                                        row.MANV && (
                                            <StyledTableCell align="center">
                                                <Button onClick={(e) => {handleEdit(row)}} >
                                                <EditIcon ></EditIcon>
                                                </Button>
                                            </StyledTableCell>
                                        )
                                    }

                                    {
                                        row.MANV && (
                                            <StyledTableCell align="center">
                                            <Button onClick={() => {handleDelete(row.MANV)}}
                                            >
                                                <DeleteIcon></DeleteIcon>
                                            </Button>   
                                            </StyledTableCell>
                                        )
                                    }
                                    {
                                        row.MAKH && (
                                            <StyledTableCell align="center">
                                            <Button onClick={() => {handleDelete(row.TAIKHOAN)}}
                                            >
                                                <DeleteIcon></DeleteIcon>
                                            </Button>   
                                            </StyledTableCell>
                                        )
                                    }
                                    {/* <StyledTableCell align="center">
                                    <Button onClick={() => {handleDelete(row.MANV)}}
                                    >
                                        <DeleteIcon></DeleteIcon>
                                    </Button>   
                                    </StyledTableCell> */}
                                </StyledTableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
        </div>
    )
}

export default TableUser
