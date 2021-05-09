import React, { useState, useEffect } from 'react'
import { Col } from 'react-bootstrap';
import {Redirect, Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import './Login.scss'


function Login() {
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errUsername,setErrUsername] = useState('');
    const [errPass,setErrPass] = useState('');
    const [checkLogin,setCheckLogin] = useState('');
    const [errMessage,setErrMessage] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const [checkSubmit, setCheckSubmit] = useState(false);
    const history = useHistory();
    const URL_Login = 'http://localhost:8081/dangnhap/admin'

    useEffect(()=> {
        let account = {
            TAIKHOAN: username,
            MATKHAU: password,
        }
        try {
            axios.post(URL_Login,account)   
            .then(res => {
                setCheckLogin(res.data)
            })
            .catch(err => {
            setCheckLogin(err.message)
            })
        } catch (error) {
            setCheckLogin(error.message)
        }
    }, );



    function ValidationUsername(e) {
        e.preventDefault();
        let txt = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        let check = false;
        if (username.trim() === '') {
            setErrUsername('Vui lòng nhập thông tin!')
        }
        else if(username.trim("").length < 6){
            setErrUsername('Yêu cầu ít nhất 6 kí tự !')
        }
        else if (txt.test(username)) {
            setErrUsername('Không bao gồm khoảng trống !')
        }
        
        else {
            setErrUsername('')
            check = true;
        }
        return check;
    }

    function ValidationPass(e){
        e.preventDefault();
        let check = false;
        let txt = /[ ]/;
        if (password.trim() === '') {
            setErrPass('Vui lòng nhập thông tin !');
            // check = false;
        }
        else if (txt.test(password)) {
            setErrPass('Không bao gồm khoảng trống !');
            // check = false;
        }
        else if(password.trim("").length < 6){
            setErrPass('Yêu cầu ít nhất 6 kí tự !');
            // check = false;
        }
        else {
            setErrPass('');
            check = true;
        }
        return check;
    }

    const  submitForm = (e) => {
        e.preventDefault();
        console.log(errMessage)
        console.log(checkLogin)
        if(checkLogin === 'Valid'){
            localStorage.setItem('token',`admin`);
            history.push("/admin");
        }
         if(checkLogin === 'Wrong Password') {
            setErrMessage('Sai mật khẩu');
            setIsLogin(false);
        }
        if(checkLogin === "Access Deny")
        {
            setErrMessage('Tài khoản không tôn tại')
        }
        else if (checkLogin === 'User not found') {
            setErrMessage("Tài khoản không tồn tại");
            setIsLogin(false);
        }
    }
    // window.location.reload(true);
    return (
        <div className="LoginPage"> 
            <div className="wrap-logginPage">
                <h1>Đăng Nhập</h1>
                <form className="form" onSubmit={submitForm}>
                    <div className="input-username wrap-input" >
                        {/* <label>Email </label> */}
                        <input type="text" className="inputEmail" placeholder="User Name" 
                        name="username" value={username} 
                        onBlur={ValidationUsername} onChange={(e) => setUsername(e.target.value)}></input>
                        <span className="error" >{errUsername}</span>
                    </div>
                    <div className="input-pass wrap-input" >
                        {/* <label>Password</label> */}
                        <input type="password" className="inputEmail" placeholder="Password" 
                        name="password" value={password} 
                        onBlur={ValidationPass} onChange={(e) => setPassword(e.target.value)}></input>
                        <span className="error" >{errPass}</span>
                    </div>
                    <button type="submit">Đăng Nhập </button>
                </form>
                <div className="link-Register">
                    <Link className="to-Register"  to="/admin/dangki"><span>Đăng kí</span> </Link>
                </div>   
                <div>
                    <h1>{errMessage}</h1>
                </div>
            </div>
        </div>
        
    )
}

export default Login
