import React, { useState,useEffect } from 'react'
import accountApi from '../../../api/AccountApi';
import loginAdminApi from '../../../api/LoginAdminApi';
import RenderListAccount from '../RenderListAccount';
import './AdminAccount.scss'

    //ui
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';

function AccountAdmin() {

    const [listAdmins, setListAdmins] = useState([]);
    const [flag, setFlag] = useState(false);



    useEffect(() => {
        const fetchListUser = async () => {
            try {
                const responds = await accountApi.getAccountAdmin();
               
                setListAdmins(responds);
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
                    accountApi.deleteNhanVien(TAIKHOAN);
                    loginAdminApi.delete(TAIKHOAN);
                    setFlag(!flag);
                } catch (e) {
                    alert(`${e.message}`)
                }
            }
    }

    let acc = localStorage.getItem('token');
    if(acc === null) {
       return <Redirect to='/admin/dangnhap' ></Redirect>
    }

    return (
        <div className='AdminAccount'>
            <div className="header-products container">
        
            {/* <Button className="button-link" variant="contained" color="primary" href="/themtaikhoan">
                Thêm Mới <i class="fas fa-plus"></i> 
             </Button>                */}
        </div>
        <RenderListAccount listUsers={listAdmins}  handleDelete ={handleDelete}></RenderListAccount>
        </div>
   
   )
}

export default AccountAdmin
