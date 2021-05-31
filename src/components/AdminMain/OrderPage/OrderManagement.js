import React, { useState, useEffect } from 'react'
import TableOrder from '../../admin/Table/TableOrder'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import NumberFormat from 'react-number-format';
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import {  Grid, Paper, Slide } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import {  columnsOrder } from '../../../common/ColumnType';
import cartApi from '../../../api/CartApi';

import './orderManagement.scss'

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
      // width: "100%"
      minWidth: 1000
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
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  text: {
    fontWeight: 600,
    fontSize: 16,
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
    const [listDetailOrder, setListDetailOrder] = useState([])
    const [madh, setMADH] = useState('');
    const columnOrder = columnsOrder

    const [open,setOpen] = useState(false)

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
     
     const handleDetail = async (id) => {
        setFlag(!flag)
        setMADH(id)
        try {
          const respone = await cartApi.getDetailOrder(id) 
          await setListDetailOrder(respone)
          await setOpen(true)
        } catch (error) {
          console.log(error.message)
        }
     }
    

    const handleClose = () => {
      setOpen(false);
    };

    const handleUpdate = async (e,id) => {
      const TRANGTHAI = e.target.value; 
      if(TRANGTHAI  === 5) {
        const data = {
          MADH: id,
          TRANGTHAI: TRANGTHAI,
          MANV: null
        }
        await cartApi.cancelOrder(data);
        await setFlag(!flag)
      }
      else {
        const data = {
          TRANGTHAI: TRANGTHAI,
          MANV: null
        }
        await cartApi.updateDetailOrder(id,data)
        await setFlag(!flag)
      }
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
                  <TableOrder columns={columnsOrder} rows={listOrder} handleDetail={handleDetail} handleUpdate={handleUpdate}  ></TableOrder>
                    </Typography>
                </TabPanel>
                {/* Dialog detail order */}
                
                <div >
                  <Dialog
                    className={classes.dialog}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">Mã Đơn Hàng: {madh}</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                      <Grid
                        className={classes.grid}
                        container
                        direction="row"
                        justify="space-around"
                        alignItems="center"
                      >
                        {
                          listDetailOrder.length !== 0 ? (
                            listDetailOrder.map(val => (
                                <Card className={classes.card}>
                                  <CardActionArea>
                                    <CardMedia
                                      component="img"
                                      alt="Contemplative Reptile"
                                      height="140"
                                      image={val.HINHANH}
                                      title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                      <Typography  gutterBottom variant="h5" component="h2">
                                        {val.TENSP}
                                      </Typography>
                                      <Typography className={classes.text} variant="body2" color="textSecondary" component="h6">
                                        Giá: <NumberFormat value={val.GIA} displayType={'text'} thousandSeparator={true}  /> đ
                                      </Typography>
                                      <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                                        Số Lượng: {val.SOLUONG}
                                      </Typography>
                                    </CardContent>
                                  </CardActionArea>
                                </Card>
                            ))
                          ) : (
                            <h2>ahihi</h2>
                          )
                        }
                      </Grid>
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose} color="primary" autoFocus>
                        Đóng
                      </Button>
                    </DialogActions>
                  </Dialog>
                </div>

            </div>
        </div>
    )
}

export default OrderManagement
