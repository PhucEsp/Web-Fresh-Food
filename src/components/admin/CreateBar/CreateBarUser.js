
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
import accountApi from '../../../api/AccountApi';
import axios from 'axios';


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
    right:30,
    top: 118,
    zIndex:10
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

function CreatebarUser({ChangeFlag}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

     // set thong tin san pham -> edit 
     const [flag, setFlag] = useState(false);
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [name, setName] = useState('');
     const [address, setAdress] = useState('');
     const [role, setRole] = useState(1);

     const [isValidate, setIsValidate] = useState(false)
     const [isSuccess, setIsSuccess] = useState(false)
     const [isExistAccount, setIsExistAccount] = useState(false)
     const [errorLength, setErrorLength] = useState(false)

     const [listAccount,setListAccount] = useState([]);


     useEffect(() => {
        const fetchListAccount = async () => {
          try {
            const respone = await accountApi.getAll();
            setListAccount(respone)
          } catch (error) {
            console.log(error.message)
          }
        }
        fetchListAccount()
     }, [flag])
     

     const UserExist = () => {
        for(let i = 0; i < listAccount.length; i++) {
            if(listAccount[i].TAIKHOAN === username)
            return true;
            
        }
        return false;
    }
   
    const checkValidate = () => {
      if(username === '' || password ==='' || role < 1 || name ==='' || address === ''  ) {
        return false
      }
      else return true
    }

    const resetState = () => {
      setUsername('')
      setPassword('')
      setName('')
      setRole(1)
      setAdress('')
    }
    
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false)
      resetState()
    };

    const handleSubmit = async (e) => { 
      console.log(`submit`)
        e.preventDefault();
        if(UserExist() === true) {
            setIsExistAccount(true)
            setTimeout(() => {
                setIsExistAccount(false)
            }, 3000);
            return
        }
        else if(username.length < 6 || password.length < 6)
        {
            setErrorLength(true)
            setTimeout(() => {
                setErrorLength(false)
            }, 3000);
            return
        }
        else if (checkValidate() === false)
        {
            setIsValidate(true)
            setTimeout(() => {
                setIsValidate(false)
            }, 3000);
            return
        }

        else  {
            const Account = {
                TAIKHOAN: username,
                MATKHAU: password,
                MAQUYEN: role
            }
            const User = {
                HOTEN: name,
                DIACHI: address,
                TAIKHOAN: username
            }
            try {
                await axios.post('http://localhost:8081/dangnhap',Account)
                .then( async res => {
                    await axios.post('http://localhost:8081/nhanvien',User)
                    .then(res => {
                        setIsSuccess(true)
                        resetState()
                        setFlag(!flag)
                        // ChangeFlag()
                        setTimeout(() => {
                            setIsSuccess(false)
                        }, 3000);
                    })
                })
                
            } catch (error) {
                console.log(error.message)
            }
        }
    }
     
    return (
      <> 
        <div className={classes.relative}>
          <div className='create-bar'>
            <Button className={classes.absolute}
            variant="contained"
            onClick={handleClickOpen}
            >
            Thêm Mới
            </Button>
          </div>
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
                <h1 className="dialog-title" style={{textAlign:'center', margin:'0px 0px 20px 0px', fontWeight: '600'}}>Thêm Mới Nhân Viên</h1>
                <form className={classes.dialog} Validate  autoComplete="off" >
               
                <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Tài Khoản"
                    variant="outlined"
                    isRequired
                    size='small'
                    value={username}
                    type='text'
                    required 
                    onChange={(e) => {setUsername(e.target.value)}}
                  />
                  <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Mật Khẩu"
                    variant="outlined"
                    isRequired
                    size='small'
                    value={password}
                    type='password'
                    required 
                    onChange={(e) => {setPassword(e.target.value)}}
                  />
                <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Họ Tên"
                    variant="outlined"
                    isRequired
                    size='small'
                    value={name}
                    type='text'
                    required 
                    onChange={(e) => {setName(e.target.value)}}
                  />
                  <TextField
                    className={classes.Input}
                    id="outlined-basic"
                    label="Địa Chỉ"
                    variant="outlined"
                    isRequired
                    size='small'
                    value={address}
                    type='text'
                    required 
                    onChange={(e) => {setAdress(e.target.value)}}
                  />
                  
                  <InputLabel id="demo-simple-select-outlined-label">Quyền</InputLabel>
                    <Select
                      required 
                      variant='outlined'
                      className={classes.Input}
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={role}
                      onChange={(e) => {setRole(e.target.value)}}
                      label="Mật Khẩu"
                      size='small'
                    >
                      <MenuItem value='1'>Admin</MenuItem>
                      <MenuItem value='2'>Nhân Viên</MenuItem>
                      {/* <MenuItem value='3'>Khách Hàng</MenuItem> */}
                  </Select>
                
                
                </form>

                {
                  isValidate && (
                    <Alert classes={classes.absolute} severity="error">
                      <AlertTitle>Vui lòng điền thông tin đầy đủ</AlertTitle>
                    </Alert>
                  )
                }
                {
                  isExistAccount && (
                    <Alert classes={classes.absolute} severity="error">
                      <AlertTitle>Tài Khoản Đã Tổn Tại</AlertTitle>
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
                 {
                   errorLength && (
                    <Alert classes={classes.absolute} severity="error">
                      <AlertTitle>Tài Khoản, mật khẩu nhiều hơn 6 kí tự</AlertTitle>
                    </Alert>
                   )
                }  
                
                </div>
              </div>
      </Dialog>
      </>
    )
}

export default CreatebarUser
