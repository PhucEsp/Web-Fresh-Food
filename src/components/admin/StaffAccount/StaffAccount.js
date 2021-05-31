import React, { useState,useEffect } from 'react'
import accountApi from '../../../api/AccountApi';
import loginAdminApi from '../../../api/LoginAdminApi';
import RenderListAccount from '../RenderListAccount';
import './StaffAccount.scss'

//ui
import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';


function StaffAccount() {
    const [listStaffs, setListStaffs] = useState([]);
    const [flag, setFlag] = useState(false);

    useEffect(() => {
        const fetchListStaff = async () => {
            try {
                const responds = await accountApi.getAccountNhanVien();
                setListStaffs(responds);
                // set state below 
            } catch (e) {
                console.log(e.message);
            }
        }
        fetchListStaff();
       
    }, [flag] )

    const handleDelete = (TAIKHOAN) => {
        setFlag(!flag);
            try {
                accountApi.deleteNhanVien(TAIKHOAN);
                loginAdminApi.delete(TAIKHOAN);
            } catch (e) {
                console.log(e.message);
            }
    }

    let acc = localStorage.getItem('token');
    if(acc === null) {
       return <Redirect to='/admin/dangnhap' ></Redirect>
    }

    return (
        <div className="list-products">
        <div className="header-products container">
           
           {/* <Link className="add-new" to="/themtaikhoan">
               <p>Thêm</p>
               <i className="fas fa-plus"></i>
           </Link>                 */}
           <Button className="button-link" variant="contained" color="primary" href="/themtaikhoan">
               Thêm Mới <i class="fas fa-plus"></i> 
            </Button>
       </div>
       <RenderListAccount listUsers={listStaffs} handleDelete ={handleDelete}></RenderListAccount>
        </div>
    )
}

export default StaffAccount
