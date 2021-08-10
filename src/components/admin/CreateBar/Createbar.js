
import './createbar.scss'
import React, { useState, useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import productsApi from '../../../api/ProductsApi';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    background: 'primary'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: 'white'
  },
  Input: {
    width: '100%',
    // marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  relative: {
    position: 'relative',
  },
  absolute: {
    position: 'absolute',
    right: 0 ,
    top: 0 ,
  },
  
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

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

///////////////////////////////////////////////////////

function Createbar() {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

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

     const [isValidate, setIsValidate] = useState(false)
     const [isSuccess, setIsSuccess] = useState(false)

     const [listCategories,setListCategories] = useState([]);


     useEffect(() => {
        const fetchCategories = async () => {
          try {
            const respone = await productsApi.getCategories();
            setListCategories(respone)
          } catch (error) {
            console.log(error.message)
          }
        }
        fetchCategories()
     }, [])
   
     const checkValidateEdit = () => {
      if(tensp === '' || loaisp ==='' || gia <= 0 || donvitinh ==='' || soluong <= 0 || mota ==='' || hinhanh ==='' || hinhanh1 ==='' || mota ==='' ) {
        return false
      }
      else return true
    }

    const resetState = () => {
      setTenSp('')
      setLoaiSp('')
      setGia(0)
      setDonViTinh('')
      setSoLuong(0)
      setLoaiSp('')
      setMoTa('')
      SetHinhAnh('')
      SetHinhAnh1('')
    }
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false)
      resetState()
    };

    const handleSubmit = async (e) => {
      const product = {
        MADM: loaisp,
        TENSP: tensp,
        GIA: gia,
        DONVITINH: donvitinh,
        SOLUONG: soluong,
        MOTA: mota,
        HINHANH: hinhanh,
        HINHANH1: hinhanh1,
      }
      if(checkValidateEdit() === true)
      {
        try {
          await productsApi.add(product);
          resetState()
          setIsSuccess(true)
          setTimeout(() => {
            setIsSuccess(false)
          }, 3000);
        } catch (error) {
          console.log(error.message);
        }
      }
      else  {
        setIsValidate(true)
        setTimeout(() => {
          setIsValidate(false)
        }, 3000);
      }
    }
     
    return (
      <> 
        <div className='create-bar'>
                <Button variant="contained"
                onClick={handleClickOpen}
                >
                Thêm Mới
                </Button>
        </div>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
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
                <div className={classes.relative} style={{ width: "600px"}}>
                <h1 className="dialog-title" style={{textAlign:'center', margin:'0px 0px 20px 0px', fontWeight: '600'}}>Thêm Mới Sản Phẩm</h1>
                <form className={classes.dialog} Validate  autoComplete="off" >
                  <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Tên Sản Phẩm"
                    variant="outlined"
                    isRequired
                    size='small'
                    value={tensp}
                    type='select'
                    required 
                    onChange={(e) => {setTenSp(e.target.value)}}
                  />
                  <InputLabel id="demo-simple-select-outlined-label">Loại</InputLabel>
                    <Select
                      required 
                      variant='outlined'
                      className={classes.Input}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={loaisp}
                      onChange={(e) => {setLoaiSp(e.target.value)}}
                      label="Loại"
                      size='small'
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {
                        listCategories.map(val => (
                          <MenuItem value={val.ID}>{val.TENDM}</MenuItem>
                        ))
                      }
                  </Select>
                  <TextField
                    required 
                    variant='outlined'
                    type='number'
                    className={classes.Input}
                    label="Giá"
                    size='small'
                    value={gia}
                    onChange={(e) => {setGia(e.target.value)}}
                    name="numberformat"
                    id="formatted-numberformat-input"
                    // InputProps={{
                    //   inputComponent: NumberFormatCustom,
                    // }}
                  />
                  
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    label="Đơn Vị Tính"
                    size='small'
                    variant="outlined"
                    value={donvitinh} name="donvitinh" 
                    onChange={(e) => {setDonViTinh(e.target.value)}}
                  />
                  <TextField
                    required 
                    variant='outlined'
                    type='number'
                    className={classes.Input}
                    label="Số Lượng"
                    size='small'
                    value={soluong}
                    onChange={(e) => {setSoLuong(e.target.value)}} 
                    name="numberformat"
                    id="formatted-numberformat-input"
                    // InputProps={{
                    //   inputComponent: NumberFormatCustom,
                    // }}
                  />
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    size='small'
                    label="Hình Ảnh 1"
                    variant="outlined"
                    value={hinhanh1} name="hinhanh1" 
                    onChange={(e) => {SetHinhAnh1(e.target.value)}}
                  />
                  <TextField
                    required 
                    className={classes.Input}
                    id="outlined-basic"
                    size='small'
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
                    size='small'
                    variant="outlined"
                    multiline
                    rows={5}
                    value={mota}
                    onChange={(e) => {setMoTa(e.target.value)}}
                  />
                
                </form>

                {
                  isValidate && (
                    <Alert id='error-createBar' classes={classes.absolute} severity="error">
                      <AlertTitle>Vui lòng điền thông tin đầy đủ</AlertTitle>
                    </Alert>
                  )
                }
                {
                   isSuccess && (
                    <Alert id='notifi' classes={classes.absolute} severity="success">
                      <AlertTitle>Thêm Mới Thành Công</AlertTitle>
                    </Alert>
                   )
                }     
                
                </div>
              </div>
      </Dialog>
      </>
    )
}

export default Createbar
