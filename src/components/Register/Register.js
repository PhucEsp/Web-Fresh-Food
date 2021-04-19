import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react'
import {Redirect, Link, useHistory} from 'react-router-dom'
import axiosClient from '../../api/axiosClient';
import LoginAdminApi from '../../api/LoginAdminApi';
import './Register.scss'
function Register() {
    const url_listAccount = 'http://localhost:8081/dangnhap/admin';
    const url_register = 'http://localhost:8081/dangnhap';
    
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [errUsername,setErrUsername] = useState('');
    const [errPass,setErrPass] = useState('');
    const [errors,setErrors] = useState('');
    const [errMessage,setErrMessage] = useState('');
    const history = useHistory();
    const [listAdminAccount, setListAdminAccount] = useState(null);
    const [successful, setSuccessful] = useState('');
    const searchInput = useRef(null)
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        try {
            axios.get(url_listAccount)
            .then(res => {
                setListAdminAccount(res.data);
            })
        } catch (error) {
            console.log(error.message);
            setErrors(error.message);
        }
    },[flag])

    console.log(listAdminAccount)

    const UserExist = () => {
        setErrors("");
        for(let i = 0; i < listAdminAccount.length; i++) {
            if(listAdminAccount[i].TAIKHOAN === username)
            return true;
        }
        return false;
    }

    function ValidationUsername(e) {
        e.preventDefault();
        let txt = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
        let check = false;
        if (username.trim() === '') {
            setErrUsername('This field is required !')
            // check = false;
        }
        else if(username.trim("").length < 6){
            setErrUsername('at least 6 characters !')
            // check = false;
        }
        else if (txt.test(username)) {
            setErrUsername('Invalid characters !')
            // check = false;
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
            setErrPass('This field is required !');
            check = false;
        }
        else if (txt.test(password)) {
            setErrPass('not include space !');
            check = false;
        }
        else if(password.trim("").length < 6){
            setErrPass('at least 6 characters !');
            check = false;
        }
        else {
            setErrPass('');
            check = true;
        }
        return check;
    }

    const  submitForm = (e) => {
        e.preventDefault();
        setFlag(!flag)
        const adminAcount = {
            TAIKHOAN: username,
            MATKHAU: password,
            MAQUYEN: 1
        }
        console.log(UserExist())
        if(UserExist() === true) {
            // setSuccessful("Tài khoản đã tồn tại !");
            alert('Tài khoản đã tồn tại !!!')
        }
        else if(username.length < 6 || password.length < 6) {
            alert('tài khoảng hoặc mật khẩu phải ít nhất 6 kí tự')
        }
        else {
            if (errUsername === "" && errPass === "") {
                try {
                    axios.post(url_register,adminAcount)
                    .then(res => {
                        setSuccessful("Đăng kí thành công");
                    })
                } catch (error) {
                    setSuccessful(error.message);
                }
            }
            else {
                setSuccessful('');
                setErrPass('');
                searchInput.current.focus();
            }
        }
        
    }
    
    const token = localStorage.getItem('token');
    console.log('token ---',token);
    if(token != null ){
       return <Redirect to="/admin" ></Redirect>
    }

    else if(setSuccessful === "Đăng kí thành công") {
        return <Redirect to="admin/dangnhap" ></Redirect>
    }

    return (
        <div className="RegisterPage"> 
            <div className="wrap-registerPage">
                <h1>Đăng Kí</h1>
                <form className="form" onSubmit={submitForm}>
                    <div className="input-username wrap-input" >
                        {/* <label>Email </label> */}
                        <input type="text" className="inputEmail" placeholder="User Name" 
                        name="username" value={username} 
                        onBlur={ValidationUsername} onChange={(e) => setUsername(e.target.value)}
                        ref={searchInput}></input>
                        <span className="error" >{errUsername}</span>
                    </div>
                    <div className="input-pass wrap-input" >
                        {/* <label>Password</label> */}
                        <input type="password" className="inputEmail" placeholder="Password" 
                        name="password" value={password} 
                        onBlur={ValidationPass} onChange={(e) => setPassword(e.target.value)}></input>
                        <span className="error" >{errPass}</span>
                    </div>
                    <button type="submit">Đăng Kí </button>
                    <h2 className="login-error">{errMessage}</h2>
                </form>
                <div className="link-Register">
                    <Link  to="/admin/dangnhap"><span>Đăng nhập</span> </Link>
                </div>   

                <h3 className="success">{successful}</h3>
            </div>
        </div>
    )
}

export default Register
