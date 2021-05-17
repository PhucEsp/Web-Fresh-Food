import React from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { columnsFruit } from '../../../common/ColumnType';
import { Button } from '@material-ui/core';
import TableProducts from '../Table/TableProducts';



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

  function createData( id, name, price, dvt, quanty,des) {
    return { id, name, price, dvt, quanty,des};
  }
  
  const rows = [
    createData(1, 'ahihi', 120000, 24, 4,'dessafhasjkfhasdk jlfhasdha sjfhsadjk fhsadkjlf hasdkjfh sjadkfh asdkjlfh asdjkfh asdkjlfhskjad fhasdjklf hkjasdlfh ksadjfhasdkjfh sakdjfh asdkjfhsdajkfh sdakjfh sda;fupo '),
    createData(2, 'ahihi', 120000, 24, 4,'dessafhasjkfhasdk jlfhasd'),
    createData(3, 'ahihi', 120000, 24, 4,'dessafhasjkfhasdk jlfhasd'),
    createData(4, 'ahihi', 120000, 24, 4,'dessafhasjkfhasdk jlfhasd'),
    ]

    const rowsVegetables = [
        createData(5, 'Vegetable', 40000, 24, 4,'dessafhasjkfhasdk jlfhasdha sjfhsadjk fhsadkjlf hasdkjfh sjadkfh asdkjlfh asdjkfh asdkjlfhskjad fhasdjklf hkjasdlfh ksadjfhasdkjfh sakdjfh asdkjfhsdajkfh sdakjfh sda;fupo '),
        createData(6, 'Vegetable', 100, 24, 4,'dessafhasjkfhasdk jlfhasd'),
        createData(7, 'Vegetable', 423, 24, 4,'dessafhasjkfhasdk jlfhasd'),
        createData(8, 'ahiVegetablehi', 1213, 24, 4,'dessafhasjkfhasdk jlfhasd'),
        ]

    
function Order({listOrders}) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);


    const columnFruit = columnsFruit;
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleEdit = (id) => {
        alert(id)
    }

    return (
        <div className="table-order">
            <div>

            </div>
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
                <Tab label="Trái Cây" {...a11yProps(0)} />
                <Tab label="Rau Củ Quả" {...a11yProps(1)} />
                <Tab label="Nấm Tươi" {...a11yProps(2)} />
                <Tab label="Chăm Sóc Sức Khỏe" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Typography variant="h1" component="h2">
                    <TableProducts columns={columnFruit} rows={rows} handleEdit={handleEdit}></TableProducts>
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableProducts columns={columnFruit} rows={rowsVegetables} handleEdit={handleEdit}></TableProducts>
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
                Item Four
            </TabPanel>
            {/* <TabPanel value={value} index={4}>
                Item Five
            </TabPanel>
            <TabPanel value={value} index={5}>
                Item Six
            </TabPanel>
            <TabPanel value={value} index={6}> */}
                {/* Item Seven
            </TabPanel> */}
          </div>
        </div>
    )
}

export default Order
