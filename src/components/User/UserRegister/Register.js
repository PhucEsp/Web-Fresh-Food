import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import SendGmail from '../SendGmail/SendGmail'
import { Link, Redirect } from 'react-router-dom'
import './Register.scss'

// meterial UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert } from '@material-ui/lab';

import { ValidatorForm} from 'react-material-ui-form-validator';
import accountApi from '../../../api/AccountApi'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%"
      }
    },
  }));

function Register() {
    const classes = useStyles();

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAdress] = useState('')
    const [Success,setSuccess] = useState('');
    const [listAccount, setListAccount] = useState(null);
    const [flag,setFlag] = useState(false);

    useEffect(() => {
        const fetchListAccount = async () => {
            try {
                const respone = await accountApi.getAll();
                setListAccount(respone);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchListAccount();
    },[flag])

    function ValidationUsername(e) {
        e.preventDefault();
        let txt = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        if (username.trim() === '' || username.trim("").length < 6 || txt.test(username)) {
            return false;
        }
        return true;
    }

    function ValidationPass(e){
        e.preventDefault();
        let check = false;
        let txt = /[ ]/;
        if (password.trim() === '' || txt.test(password) || password.trim("").length < 6) {
            return false;
        }
       
        return true;
    }

    const UserExist = () => {
        for(let i = 0; i < listAccount.length; i++) {
            if(listAccount[i].TAIKHOAN === username)
            return true;
        }
        return false;
    }

    const setDefaultInput = () => {
        setUsername('');
        setPassword('');
        setName('');
        setEmail('');
        setPhoneNumber('');
        setAdress('');
        setSuccess('')
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFlag(!flag)
        if(UserExist() === true) {
            alert('Tài khoản đã tồn tại !!!')
            return;
        }
        else if(ValidationUsername(e) == false) {
            alert("Tài khoản không hợp lệ")
            return;
        }
        else if(ValidationPass(e) == false) {
            alert("Mật Khẩu không hợp lệ")
            return;
        }
        else if(name.length <= 5){
            alert('Họ Tên phải có ít nhất 6 kí tự')
            return;
        }
        else if(phoneNumber.length > 11 || phoneNumber.length < 9){
            alert('Số điện thoại chưa hợp lệ !!! ( 9-11 số )')
            return;
        }

        else {
            const UserAccount = {
                HOTEN: name,
                SDT: phoneNumber,
                MAIL: email,
                DIACHI: address,
                TAIKHOAN: username,
                MATKHAU : password
            }
           try {
                const url = 'http://localhost:8081/taikhoan/khachhang';
                axios.post(url,UserAccount)
                .then(res => {
                    // setSuccess("Tạo Tài Khoảng Thành Công")
                    alert("Tạo Tài Khoảng Thành Công")
                })
           } catch (error) {
            // setSuccess("Hệ thống gặp vấn đề. Tạo Tài Khoản thất bại. Vui lòng thử lại")
            alert("Hệ thống gặp vấn đề. Tạo Tài Khoản thất bại. Vui lòng thử lại")
           }   
           setDefaultInput();
        }
    }

    if(localStorage.getItem('account') != null){
        return  <Redirect to="/home"></Redirect>
    }

    return (
       <div className="register">
           <Header></Header>
           <h1 id="title container">Tạo Tài Khoản</h1>
           <div className="form-register container">
           <ValidatorForm className={classes.root}
           onSubmit={handleSubmit}
           >
                    <TextField
                        id="outlined-basic"
                        label="Tài Khoản"
                        variant="outlined"
                        type="text"
                        required
                        onChange={(e) => {setUsername(e.target.value)}}
                        value={username}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Mật Khẩu"
                        variant="outlined"
                        type="password"
                        required
                        onChange={(e) => {setPassword(e.target.value)}}
                        value={password}
                    /> 

                    <TextField
                        id="outlined-basic"
                        label="Họ Tên"
                        variant="outlined"
                        type="text"
                        required
                        onChange={(e) => {setName(e.target.value)}}
                        value={name}
                    />

                   <TextField
                        id="outlined-basic"
                        label="Số điện thoại"
                        variant="outlined"
                        type="number"
                        required
                        validators={['minNumber:0', 'maxNumber:10', 'matchRegexp:^[0-9]$']}
                        onChange={(e) => {setPhoneNumber(e.target.value)}}
                        value={phoneNumber}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        type="email"
                        required
                        onChange={(e) => {setEmail(e.target.value)}}
                        value={email}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Địa Chỉ"
                        variant="outlined"
                        type="text"
                        required 
                        multiline
                        rows={4}
                        onChange={(e) => {setAdress(e.target.value)}}
                        value={address}
                    />
                    <div>
                    <Button variant="contained" color="primary" type='submit'>
                        Đăng Kí
                    </Button>
                    </div>
                </ValidatorForm>
           </div>
           <p>Quay lại <Link to='/home/dang-nhap'>Đăng nhập </Link> ngày</p>
                <div className="alert">
                   <div>
                    <div className={classes.root} >
                            <Alert variant="outlined" severity="warning">
                                Tài khoản,Mật khẩu, Họ tên ít nhất 6 kí tự 
                               
                            </Alert>
                            <Alert variant="outlined" severity="warning">
                            Tài Khoản không bao gồm kí tự đặc biệt  
                            <br></br>
                            Mật Khẩu không chứa khoảng trắng
                            </Alert>
                            <Alert variant="outlined" severity="warning">
                                Số điện thoại ( 9-11 số )
                            </Alert>
                        </div>
                   </div>
                </div>
           <SendGmail></SendGmail>
           <Footer></Footer>
       </div>
    )
}

export default Register
