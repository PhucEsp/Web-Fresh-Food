import React, { useState, useEffect } from 'react'
import TableOrder from '../../admin/Table/TableOrder'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import { columnAdmin, columnOrder, columnsOrder } from '../../../common/ColumnType';
import { Button, DialogContentText, Slide } from '@material-ui/core';
import cartApi from '../../../api/CartApi';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
}

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  table: {
      minWidth: 700
  },
  dialog: {
    "& > *": {
      margin: theme.spacing(1),
      width: "100%"
    },
  },
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
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


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



function OrderManagement() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [flag, setFlag] = useState(false);
    const [listOrder, setListOrder] = useState([]);

    const columnOrder = columnsOrder

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        const fecthListOrder = async () => {
            try {
                 const responds = await cartApi.getAllOrder()
                 setListOrder(responds);
                
            } catch (error) {
                console.log(error.message)
            }
        }
        fecthListOrder();
     },[flag])
     
     const handleDetail = (id) => {
         setFlag(!flag)
         alert(id)
     }
    return (
        <div className='management-order'>
            <div className={classes.root}>
                <AppBar position="relative" color="default">
                    <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                    >
                    <Tab label="Khách Hàng" {...a11yProps(0)} />
                    {/* <Tab label="Quản Lí" {...a11yProps(1)} />
                    <Tab label="Admin" {...a11yProps(2)} /> */}
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Typography variant="h1" component="h2">
                    <TableOrder columns={columnsOrder} rows={listOrder} handleDetail={handleDetail}  ></TableOrder>
                    </Typography>
                </TabPanel>
                {/* <TabPanel value={value} index={1}>
                    <TableUser columns={columnsAdmin} rows={listStaff} handleEdit={handleEdit} handleDelete={handleDelete} ></TableUser>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <TableUser columns={columnsAdmin} rows={listAdmin} handleEdit={handleEdit} handleDelete={handleDelete} ></TableUser>
                </TabPanel> */}
            </div>
        </div>
    )
}

export default OrderManagement
