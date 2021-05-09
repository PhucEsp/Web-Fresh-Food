import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import SendGmail from '../SendGmail/SendGmail'
import './UserLogin.scss'

// meterial UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Alert } from '@material-ui/lab';

import { ValidatorForm} from 'react-material-ui-form-validator';
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import accountApi from '../../../api/AccountApi'


const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(2),
        width: "100%"
      }
    },
  }));

function UserLogin() {

    const classes = useStyles();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [checkLogin, setCheckLogin] = useState(false);
    const [isError, setIsError] = useState(false);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!ValidationUsername(e) && !ValidationPass(e)) {
            alert("Thông tin không hợp lệ")
            return;
        }
        const account = {
            TAIKHOAN: username,
            MATKHAU: password
        }
        try {
            const res = await accountApi.LoginKH(account);
            if(res == 'Valid') setCheckLogin(true);
            else setCheckLogin(false)
        } catch (error) {
            console.log(error.message);
        }
        if(checkLogin == false) {
            setIsError(true)
        }
        
    }

    if(localStorage.getItem('account') != null){
        return  <Redirect to="/home"></Redirect>
    }
    
    if(checkLogin == true) {
        localStorage.setItem('account', username);
        return  <Redirect to="/home"></Redirect>
    }
    else {
        localStorage.removeItem('account')
    }

    return (
        
        <div className="login"> 
            <Header></Header>
            <h1 id="title container">Đăng Nhập</h1>
            <div className="form-login container">
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
                            placeholder="Tối thiểu 6 kí tự"
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

                    
                        <Button variant="contained" color="primary" type='submit'>
                            Đăng Nhập
                        </Button>
            </ValidatorForm>
            </div>
            <div className={classes.root, 'container'} style={{width: '500px'}}>
            {
                isError && <Alert severity="error">Tài Khoản hoặc Mật Khẩu không chính xác</Alert>
            }
            </div>
            <p>Bạn chưa có tài khoản? <Link to='/home/dang-ki'>Đăng kí </Link> ngay</p>
            
            <SendGmail></SendGmail>
            <Footer></Footer>
        </div>
    )
}

export default UserLogin
