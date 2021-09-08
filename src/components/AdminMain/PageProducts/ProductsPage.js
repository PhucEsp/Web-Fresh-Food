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


import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { columnsFruit } from '../../../common/ColumnType';
import { Button, DialogContentText, Slide } from '@material-ui/core';
import TableProducts from '../../admin/Table/TableProducts';
import productsApi from '../../../api/ProductsApi';
import { useHistory } from 'react-router';
import { storage } from '../../../firebase';

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
    images: {
      display: 'flex',
      justifyContent: "space-between"
    },
    img: {
      width: "100%",
      height: "100%"
    },
    wrapImg: {
      width: 150,
      height: 150,
      overflow: "hidden"
    },
    wrapInput: {
      display: 'flex',
      justifyContent: "space-between",
    },
    inputBase: {
      marginLeft: theme.spacing(1),
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

    const [hinhanh2,SetHinhAnh2] = useState('');
    const [hinhanh1,SetHinhAnh1] = useState('');
  
    const [url_image1,SetUrlImage1] = useState('');
    const [url_image2,SetUrlImage2] = useState('');

    const [test,setTest] = useState(null)

    const history = useHistory()
    // state hỗ trợ
    const [open, setOpen] = React.useState(false);

    useEffect(() => {
      const fetchListFruit = async () => {
          try {
              const responds = await productsApi.getAll();
              setListFruit(responds.filter(val => val.MADM == 1));
              setListVegetable(responds.filter(val => val.MADM == 2));
              setListMushRoom(responds.filter(val => val.MADM == 3));
              setListHealthy(responds.filter(val => val.MADM == 4));
          } catch (error) {
              console.log(error.message)
          }
      }
      fetchListFruit();
    },[flag])

  const checkValidateEdit = () => {
    if(tensp === '' || loaisp ==='' || gia <= 0 || donvitinh ==='' || soluong <= 0 || mota ==='' || url_image1 ==='' || url_image2 ==='' || mota ==='' ) {
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
        SetHinhAnh1(product.HINHANH1);
        SetHinhAnh2(product.HINHANH);
        SetUrlImage1(product.HINHANH1)
        SetUrlImage2(product.HINHANH)
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
          HINHANH1: url_image1,
          HINHANH: url_image2,
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

    const handleChangeImage1 = (e) => {
      const file = e.target.files[0]
      if(file !== ''){
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          error => {
            console.log(error);
            alert(error)
          },
          () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                SetUrlImage1(url) 
              });
          }
        );
      }
    }

    const handleChangeImage2 = (e) => {
      const file= e.target.files[0]
      console.log(`value`, value)
      if(file !== ''){
        const uploadTask = storage.ref(`images/${file.name}`).put(file);
        uploadTask.on(
          "state_changed",
          snapshot => {
            const progress = Math.round(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
          },
          error => {
            console.log(error);
            alert(error)
          },
          () => {
            storage
              .ref("images")
              .child(file.name)
              .getDownloadURL()
              .then(url => {
                SetUrlImage2(url) 
                console.log(`url_image2`, url_image2)
              });
          }
        );
      }
    }

    // check authentication
    if(localStorage.getItem("token") == null) {
      history.push("/admin/dangnhap")
    }

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
                  <div className={classes.wrapInput}>
                    <TextField
                      className={classes.Input}
                      required 
                      variant='outlined'
                      label="Giá"
                      value={gia}
                      onChange={(e) => {setGia(e.target.value)
                        console.log(`gia`, gia)
                      }}
                      name="numberformat"
                      id="formatted-numberformat-input"
                      InputProps={{
                        inputComponent: NumberFormatCustom,
                      }}
                    />
                    {/* <TextField
                      required 
                      className={classes.inputBase}
                      id="outlined-basic"
                      label="Đơn vị sản phẩm"
                      variant="outlined"
                      value={donvitinh} name="loaidonvi" 
                      onChange={(e) => {setDonViTinh(e.target.value)}}
                    /> */}
                    
                    <TextField
                      className={classes.inputBase}
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
                  </div>
                  <InputLabel id="demo-controlled-open-select-label">Đơn vị sản phẩm</InputLabel>
                  <Select
                    required 
                    variant='outlined'
                    className={classes.inputBase}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={donvitinh}
                    onChange={(e) => {setDonViTinh(e.target.value)
                    }}
                    label="Đơn vị sản phẩm"
                    size='small'
                  >
                    <MenuItem value="">
                      <em>none</em>
                    </MenuItem>
                    <MenuItem value="1Kg">
                      <em>1Kg</em>
                    </MenuItem>
                    <MenuItem value="Chai">
                      <em>Chai</em>
                    </MenuItem>
                  </Select>
                  
                  <TextField
                    required 
                    className={classes.inputBase}
                    id="outlined-basic"
                    label="Mô Tả"
                    variant="outlined"
                    multiline
                    rows={7}
                    value={mota}
                    onChange={(e) => {setMoTa(e.target.value)}}
                  />

                  <div className={classes.images}>
                    <div>
                      <div className={classes.wrapImg}>
                        <img className={classes.img} src={url_image1}></img>
                      </div>
                      <input
                        className={classes.Input}
                        id="outlined-basic"
                        type="file"
                        onChange={handleChangeImage1}
                      />
                    </div>
                    
                    <div>
                      <div className={classes.wrapImg}>
                        <img className={classes.img} src={url_image2}></img>
                      </div>
                      <input
                        className={classes.Input}
                        id="outlined-basic"
                        type="file"
                        onChange={handleChangeImage2}
                      />
                    </div>
                    
                  </div>
                  {/* <TextField
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
                    value={hinhanh2} name="hinhanh" 
                    onChange={(e) => {SetHinhAnh2(e.target.value)}}
                  /> */}
                </form>
                </div>
              </div>
            </Dialog>
        </div>
    )
}

export default ProductsPage
