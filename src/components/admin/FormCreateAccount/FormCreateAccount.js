import React, { useEffect, useState,  } from 'react'
import Button from '@material-ui/core/Button';
import './form.scss'
import accountApi from '../../../api/AccountApi';
import axios from 'axios';
import { Redirect } from 'react-router';
function FormCreateAccount() {

    const url_createAcc = 'http://localhost:8081/dangnhap';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(null);
    const [name, setName] = useState('');
    const [phonenumber, setPhoneNumber] = useState(null);
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');

    const [checkSuccess, setCheckSuccess] = useState('');


    const [listAccount, setListAccount] = useState([]);

    useEffect(() => {
       const fetchListAccount = async () => {
            try {
                const respones = await accountApi.getAll();
                setListAccount(respones);
            } catch (error) {
                console.log(error.message);
            }
       }
       fetchListAccount();
    }, [])

    const checkExistAccount = () => {
        for(let i = 0; i< listAccount.length; i++)
         {
             if(username == listAccount[i].TAIKHOAN){
                 return true;
             }
         }
         return false;
    }

    const validationAccount = () => {
        if(username.length < 6 || password.length < 6) {
            alert('Tài khoản hoặc mật khẩu phải lớn hơn 6 kí tự. Vui lòng kiểm tra lại !!!')
        }
    }

    const focusInput = () => {
        setUsername('');
        setPassword('');
        setRole(null);
        setEmail('');
        setAddress('');
        setName('');
        setPhoneNumber(null)
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const account = {
            TAIKHOAN: username,
            MATKHAU: password,
            MAQUYEN: role,
            HOTEN: name,
            SDT: phonenumber,
            MAIL: email,
            DIACHI: address,
        }

        if(username.length < 6 || password.length < 6) {
            alert('Tài khoản hoặc mật khẩu phải lớn hơn 6 kí tự. Vui lòng kiểm tra lại !!!')
        }
        else if(checkExistAccount() ) {
            alert('Tài khoản đã tồn tại !!!')
        }
        else {
            try {
                axios.post(url_createAcc, account)
                .then(res => {
                    alert('Đăng kí thành công')
                })
            } catch (error) {
                alert('Đăng kí thất bại ' + error.message);
            }
            focusInput();
        }
    }
    let acc = localStorage.getItem('token');
    if(acc === null) {
       return <Redirect to='/admin/dangnhap' ></Redirect>
    }
    
    return (
        // TAIKHOAN,MATKHAU,MAQUYEN,HOTEN,SDT,MAIL,DIACHI
        <div className="FormCreate">
            <div className="title">
                <h3>Tạo Tài Khoản</h3>
            </div>
            <div className="wrap-form">
                <form onSubmit={handleSubmit}>
                <div class="col-md-12 input-control">
                    <label for="validationCustom03" class="form-label">Tài Khoản</label>
                    <input type="text" class="form-control" id="validationCustom03" required 
                    value={username} onChange={(e) => {setUsername(e.target.value)}}
                    />
                    <div class="invalid-feedback">
                    Vui lòng nhập thông tin.
                    </div>
                </div>
                <div class="col-md-12 input-control">
                    <label for="validationCustom03" class="form-label">Mật Khẩu</label>
                    <input type="text" class="form-control" id="validationCustom03" required 
                    value={password} onChange={(e) => {setPassword(e.target.value)}}
                    />
                    <div class="invalid-feedback">
                    Vui lòng nhập thông tin.
                    </div>
                </div>
                <div class="col-md-4 input-control">
                    <label for="validationCustom04" class="form-label">Chức Vụ</label>
                    <select class="form-select" id="validationCustom04" required 
                    value={role} onChange={(e) => {setRole(e.target.value)}}
                    >
                    <option selected disabled value="">Chọn...</option>
                    <option value="1">Quản Lí</option>
                    <option value="2">Nhân Viên</option>
                    <option value="3">Khách Hàng</option>
                    </select>
                    <div class="invalid-feedback">
                    Please select a valid state.
                    </div>
                </div>

                <div class="col-md-12 input-control">
                    <label for="validationCustom03" class="form-label">Họ Tên</label>
                    <input type="text" class="form-control" id="validationCustom03" required
                    value={name} onChange={(e) => {setName(e.target.value)}}
                    />
                    <div class="invalid-feedback">
                    Vui lòng nhập thông tin.
                    </div>
                </div>

                <div class="col-md-12 input-control">
                    <label for="validationCustom03" class="form-label">Số Điện Thoại</label>
                    <input type="number" class="form-control" id="validationCustom03" required 
                    value={phonenumber} onChange={(e) => {setPhoneNumber(e.target.value)}}
                    />
                    <div class="invalid-feedback">
                    Vui lòng nhập thông tin.
                    </div>
                </div>

                <div class="col-md-12 input-control">
                    <label for="validationCustom03" class="form-label">Email</label>
                    <input type="email" class="form-control" id="validationCustom03" required 
                    value={email} onChange={(e) => {setEmail(e.target.value)}}
                    />
                    <div class="invalid-feedback">
                    Vui lòng nhập thông tin.
                    </div>
                </div>

                <div class="col-md-12 input-control">
                    <label for="validationCustom03" class="form-label">Textarea</label>
                    <textarea class="form-control" id="validationCustom03" placeholder="Địa chỉ" required
                    value={address} onChange={(e) => {setAddress(e.target.value)}}
                    ></textarea>
                    <div class="invalid-feedback">
                    Please enter a message in the textarea.
                    </div>
                </div>

                <Button type="submit" variant="contained" color="primary">
                    Thêm
                </Button>
                </form>
            </div>
        </div>
    )
}

export default FormCreateAccount
