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
import { Button, ListItemIcon, MenuItem } from '@material-ui/core';
import ListIcon from '@material-ui/icons/List';
import Moment from 'react-moment';

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

function TableOrder({columns,rows,handleDetail,handleUpdate}) {
    const classes = useStyles();
    const [listOrder, setListOrdet] = useState(rows)

    useEffect(() => {
      setListOrdet(rows)
    }, [rows])

    const handleChange = (e) => {
      if(e.target.value.trim() === ""){
        setListOrdet(rows)
      }
      const newlistSearch = rows.filter(order => {
          return  order.ID.toString().includes(e.target.value.toLocaleLowerCase().trim());
      })
      setListOrdet(newlistSearch)
    }
    console.log(`listOrder`, listOrder)
    return (
        <div>
            <Paper component="form" className={classes.searchBar}>
              <IconButton className={classes.iconButton} aria-label="menu">
                <MenuIcon />
              </IconButton>
              <InputBase
                className={classes.input}
                placeholder="Tìm kiếm theo ID đơn hàng"
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
                            {listOrder.map((row) => (
                                <StyledTableRow key={row.ID}>
                                
                                <StyledTableCell component="th" scope="row">
                                    {row.ID}
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">{row.MANV}</StyledTableCell> */}
                                <StyledTableCell align="center">
                                <Moment format="DD/MM/YYYY">
                                {row.THOIGIAN}
                                </Moment>
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.HOTEN}</StyledTableCell>
                                <StyledTableCell align="center">{row.DIACHI}</StyledTableCell>
                                <StyledTableCell align="center">{row.SDT}</StyledTableCell>
                                <StyledTableCell align="center">{row.MAIL}</StyledTableCell>
                                <StyledTableCell align="center">{row.TONGTIEN}</StyledTableCell>
                                {
                                  row.TRANGTHAI === 5 ? (
                                    <StyledTableCell align="center">
                                      <StyleSelect disabled={true} defaultValue={row.TRANGTHAI}>
                                      <MenuItem value={5}>Hủy</MenuItem>
                                      </StyleSelect>
                                    </StyledTableCell>
                                  ) : 
                                  (
                                    <StyledTableCell align="center">
                                      <StyleSelect defaultValue={row.TRANGTHAI}  onChange={(e) => {handleUpdate(e,row.ID)}}>
                                        <MenuItem value={1}>Chờ Xác Nhận</MenuItem>
                                        <MenuItem value={2}>Đã Xác Nhận</MenuItem>
                                        <MenuItem value={3}>Đang Giao Hàng</MenuItem>
                                        <MenuItem value={4}>Hoàn Thành</MenuItem>
                                        <MenuItem value={5}>Hủy</MenuItem>
                                      </StyleSelect>
                                    </StyledTableCell>
                                  )
                                }
                                <StyledTableCell align="center">
                                   {
                                       row.TRANGTHAI == 5 ? (
                                        <Button disabled={true} onClick={() => {handleDetail(row.ID)}}>
                                            <ListIcon ></ListIcon>
                                        </Button>
                                       ) : (
                                        <Button  onClick={() => {handleDetail(row.ID)}}>
                                        <ListIcon ></ListIcon>
                                    </Button>
                                       )
                                   }
                                </StyledTableCell>
                                {/* <StyledTableCell align="center">
                                    <Button onClick={() => {handleDelete(row.ID)}} >
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

export default TableOrder
