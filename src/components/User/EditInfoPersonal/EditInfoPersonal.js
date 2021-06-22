import React, { useState, useEffect } from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import SendGmail from '../SendGmail/SendGmail'
import { Link, Redirect } from 'react-router-dom'
import './EditPersonal.scss'

// meterial UI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import { Alert } from '@material-ui/lab';

import { ValidatorForm} from 'react-material-ui-form-validator';
import accountApi from '../../../api/AccountApi'
import { Zoom } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "100%"
      }
    },
  }));
//   
function EditInfoPersonal() {
    const classes = useStyles();
    const [name, setName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAdress] = useState('')
    const [infoUser, setInfoUser] = useState({})
    const acc = localStorage.getItem('account')
    const [success, setSuccess] = useState(false)
    useEffect( async() => {
        try {
            const respone = await accountApi.getUser(acc);
            setInfoUser(respone);
            setName(respone.HOTEN)
            setPhoneNumber(respone.SDT)
            setAdress(respone.DIACHI)
            setEmail(respone.MAIL)
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(false)
        if(name.length <= 5){
            alert('Họ Tên phải có ít nhất 6 kí tự')
            return;
        }
        else if(phoneNumber.length > 11 || phoneNumber.length < 9){
            alert('Số điện thoại chưa hợp lệ !!! ( 9-11 số )')
            return;
        }

        else {
            const data = {
                HOTEN: name,
                SDT: phoneNumber,
                MAIL: email,
                DIACHI: address
            }
           try {
                await accountApi.updateKH(infoUser.MAKH,data)
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false)
                }, 3000);
           } catch (error) {
            
            alert("Hệ thống gặp vấn đề. Tạo Tài Khoản thất bại. Vui lòng thử lại")
           }   
        }
    }

    if(localStorage.getItem('account') === null){
        return  <Redirect to="/home/dang-nhap"></Redirect>
    }

    return (
       <div className="register">
           <Header></Header>
           <h1 id="title container">Chỉnh Sửa Thông Tin Tài Khoản</h1>
           <div className="form-register container">
           <ValidatorForm className={classes.root}
           onSubmit={handleSubmit}
           >
                    <Tooltip 
                    ransitionComponent={Zoom} 
                    title="Ít nhất 6 kí tự" 
                    placement="right-start">
                    <TextField
                        id="outlined-basic"
                        label="Họ Tên"
                        variant="outlined"
                        type="text"
                        required
                        onChange={(e) => {setName(e.target.value)}}
                        value={name}
                    />
                    </Tooltip>

                    <Tooltip TransitionComponent={Zoom} 
                    title="9-11 số" placement="right-start">
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
                    </Tooltip>

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
                        Gửi
                    </Button>
                    </div>
                </ValidatorForm>
           </div>
            <Link style={{marginLeft: 12}} to='/home/tai-khoan'>Quay lại</Link>
                <div style={{display: "flex", justifyContent: "center"}} className={classes.notifi, "container"}>
                   {
                       success && 
                       <Alert style={{width: 400, marginTop: 24}} severity="info">Chỉnh Sửa Thành Công</Alert>
                   }
                </div>
           <SendGmail></SendGmail>
           <Footer></Footer>
       </div>
    )
}

export default EditInfoPersonal
