import React from 'react'
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


  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: "100%",
      backgroundColor: theme.palette.background.paper
    },
    table: {
        minWidth: 700
      }
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

    const configProductDescription = (text) => {
     if(text.length > 50) return text.slice(0,50).concat('...')
     return text
    }
    return (
        <div>
            <TableContainer component={Paper}>
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
                            {rows.map((row) => (
                                <StyledTableRow key={row.ID}>
                                {/* <StyledTableCell align="right">
                                    <StyleSelect>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                    </StyleSelect>
                                </StyledTableCell> */}
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
