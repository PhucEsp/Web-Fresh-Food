import React, { useState, useEffect } from 'react'
import './Productpage.scss'

import { withStyles, makeStyles } from "@material-ui/core/styles";
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

// dialog UI
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Select from "@material-ui/core/Select";
import { columnsFruit } from '../../../common/ColumnType';
import { Button, DialogContentText, Slide } from '@material-ui/core';
import TableProducts from '../../admin/Table/TableProducts';
import productsApi from '../../../api/ProductsApi';

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

  function createData( id, name, price, dvt, quanty,des) {
    return { id, name, price, dvt, quanty,des};
  }

  function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        thousandSeparator
        isNumericString
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


function ProductsPage() {
  const classes = useStyles();
  // define column table
  const columnFruit = columnsFruit;


  // define state
    const [value, setValue] = React.useState(0);
    const [flag, setFlag] = useState(false);
    const [listFruit, setListFruit] = useState([]);
    const [listVegetable, setListVegetable] = useState([])
    const [listMushRoom, setListMushRoom] = useState([])
    const [listHealthy, setListHealthy] = useState([])
  
     // set thong tin san pham -> edit 
     const [id, setID] = useState('');
     const [tensp, setTenSp] = useState('');
     const [loaisp, setLoaiSp] = useState('');
     const [gia, setGia] = useState(0);
     const [donvitinh, setDonViTinh] = useState('');
     const [soluong, setSoLuong] = useState(0);
     const [mota, setMoTa] = useState('');
     const [hinhanh,SetHinhAnh] = useState('');
     const [hinhanh1,SetHinhAnh1] = useState('');

    // state hỗ trợ
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    useEffect(() => {
      const fetchListFruit = async () => {
          try {
               const responds = await productsApi.getAll();
               const newList = responds.filter(val => val.MADM == 1)
               setListFruit(newList);
              
          } catch (error) {
              console.log(error.message)
          }
      }
      fetchListFruit();
   },[flag])

   useEffect(() => {
    const fetchListVetegable = async () => {
        try {
             const responds = await productsApi.getAll();
             const newList = responds.filter(val => val.MADM == 2)
             setListVegetable(newList);
            
        } catch (error) {
            console.log(error.message)
        }
    }
    fetchListVetegable();
  },[flag])

  useEffect(() => {
    const fetchListMushRoom = async () => {
        try {
            const responds = await productsApi.getAll();
            const newList = responds.filter(val => val.MADM == 3)
            setListMushRoom(newList);
            
        } catch (error) {
            console.log(error.message)
        }
    }
    fetchListMushRoom();
  },[flag])

  useEffect(() => {
    const fetchListHealthy = async () => {
        try {
            const responds = await productsApi.getAll();
            const newList = responds.filter(val => val.MADM == 4)
            setListHealthy(newList);
            
        } catch (error) {
            console.log(error.message)
        }
    }
    fetchListHealthy();
  },[flag])

  const checkValidateEdit = () => {
    if(tensp === '' || loaisp ==='' || gia <= 0 || donvitinh ==='' || soluong <= 0 || mota ==='' || hinhanh ==='' || hinhanh1 ==='' || mota ==='' ) {
      return false
    }
    else return true
  }

  //  console.log(listFruit)
    const handleChange = (event, newValue) => {
        setValue(newValue);
        setFlag(!flag)
    };
    const handleEdit = (product) => {
        setOpen(true);
        setID(product.ID)
        setTenSp(product.TENSP)
        setLoaiSp(product.MADM)
        setGia(product.GIA)
        setDonViTinh(product.DONVITINH)
        setSoLuong(product.SOLUONG)
        setMoTa(product.MOTA)
        SetHinhAnh(product.HINHANH);
        SetHinhAnh1(product.HINHANH1);
    }

    const handleDelete = (id) => {
      let agree = window.confirm(` Bạn có chắc chắn muốn xóa sản phẩm này?` );
      if(!agree) return;
      else {
          setFlag(!flag)
          try {
              productsApi.delete(id);
              setFlag(!flag)
          } catch (error) {
              console.log(error.message);
          }
      }
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      const product = {
          ID: id,
          TENSP: tensp,
          MADM: loaisp,
          GIA: gia,
          DONVITINH: donvitinh,
          SOLUONG: soluong,
          MOTA: mota,
          HINHANH: hinhanh,
          HINHANH1: hinhanh1,
      }
      if(checkValidateEdit() === true) {
        try {
          await productsApi.update(id,product)
          setFlag(!flag);
          setOpen(false)
        } catch (error) {
          alert('Lỗi Hệ Thống. Vui lòng thử lại')
        }
      }
      else {
        alert('Thông tin không hợp lệ ')
        return
      }
    };
  
    const handleClose = () => {
      setOpen(false)
    };

    
    return (
        <div className="productPage">
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
                        <TableProducts columns={columnFruit} rows={listFruit} handleEdit={handleEdit} handleDelete={handleDelete} ></TableProducts>
                    </Typography>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableProducts columns={columnFruit} rows={listVegetable} handleEdit={handleEdit} handleDelete={handleDelete} ></TableProducts>
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <TableProducts columns={columnFruit} rows={listMushRoom} handleEdit={handleEdit} handleDelete={handleDelete} ></TableProducts>
                </TabPanel>
                <TabPanel value={value} index={3}>
                <TableProducts columns={columnFruit} rows={listHealthy} handleEdit={handleEdit} handleDelete={handleDelete} ></TableProducts>
                </TabPanel>
            </div>

            {/* modal edit product */}
            <Dialog
              fullScreen
              open={open}
              onClose={handleClose}
              TransitionComponent={Transition}
            >
              <AppBar className={classes.appBar}>
                <Toolbar>
                  <IconButton
                    edge="start"
                    color="inherit"
                    onClick={handleClose}
                    aria-label="close"
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Thoát
                  </Typography>
                  <Button autoFocus color="inherit" onClick={handleSubmit}>
                    Lưu
                  </Button>
                </Toolbar>
              </AppBar>
              <div className="wrap-form--dialog">
                <div style={{ width: "600px"}}>
                <h1 className="dialog-title" style={{textAlign:'center', margin:'0px 0px 20px 0px', fontWeight: '600'}}>Chỉnh Sửa</h1>
                <form className={classes.dialog} Validate  autoComplete="off" onSubmit={handleClose}>
                  <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Tên Sản Phẩm"
                    variant="outlined"
                    required
                    value={tensp}
                    onChange={(e) => {setTenSp(e.target.value)}}
                  />
                  <TextField
                    required 
                    variant='outlined'
                    label="Giá"
                    value={gia}
                    onChange={(e) => {setGia(e.target.value)}}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    label="Đơn Vị Tính"
                    variant="outlined"
                    value={donvitinh} name="donvitinh" 
                    onChange={(e) => {setDonViTinh(e.target.value)}}
                  />
                  <TextField
                    required 
                    variant='outlined'
                    label="Số Lượng"
                    value={soluong}
                    onChange={(e) => {setSoLuong(e.target.value)}} 
                    name="numberformat"
                    id="formatted-numberformat-input"
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    label="Hình Ảnh 1"
                    variant="outlined"
                    value={hinhanh1} name="hinhanh1" 
                    onChange={(e) => {SetHinhAnh1(e.target.value)}}
                  />
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    label="Hình Ảnh 2"
                    variant="outlined"
                    value={hinhanh} name="hinhanh" 
                    onChange={(e) => {SetHinhAnh(e.target.value)}}
                  />
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    label="Mô Tả"
                    variant="outlined"
                    multiline
                    rows={5}
                    value={mota}
                    onChange={(e) => {setMoTa(e.target.value)}}
                  />
                
                </form>
                </div>
              </div>
            </Dialog>
        </div>
    )
}

export default ProductsPage
