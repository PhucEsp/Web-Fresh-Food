import userEvent from '@testing-library/user-event'
import React, { useState,useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom'
import accountApi from '../../../api/AccountApi';
import loginAdminApi from '../../../api/LoginAdminApi';
import RenderListAccount from '../RenderListAccount';
import './AccountUser.scss'

//ui
import Button from '@material-ui/core/Button';

function AccountUser() {

    const [listUsers, setListUsers] = useState([]);
    const [flag, setFlag] = useState(false);
    const [openModal, setModalIsOpen] = useState(false);
    

    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const responds = await accountApi.getAccountKhachHang();
                setListUsers(responds);
                // set state below 
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchListUser();
       
    }, [flag] )

    const handleDelete = (TAIKHOAN) => {
        let agree = window.confirm(` Bạn có chắc chắn muốn xóa tài khoản?` );
        if(!agree) return;
        else {
            try {
                accountApi.deleteKhachHang(TAIKHOAN);
                loginAdminApi.delete(TAIKHOAN);
                setFlag(!flag);
            } catch (e) {
                console.log(e.message);
            }
        }
            
    }

    const setOpenModal = () => {
        setOpenModal(true);
    }

    let acc = localStorage.getItem('token');
    if(acc === null) {
       return <Redirect to='/admin/dangnhap' ></Redirect>
    }

    return(
        <div className="list-products">
         <div className="header-products container">
         
            {/* <Link className="add-new" to="/themtaikhoan">
                <p>Thêm</p>
                <i className="fas fa-plus"></i>
            </Link>                 */}
            <Button className="button-link" variant="contained" color="primary" href="/themtaikhoan" disabled>
                Thêm Mới <i class="fas fa-plus"></i> 
             </Button>
        </div>
        <RenderListAccount listUsers={listUsers}  setOpenModal = {setOpenModal} handleDelete ={handleDelete}></RenderListAccount>
         </div>
    )
}

export default AccountUser
