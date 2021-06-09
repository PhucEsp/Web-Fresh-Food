import React, {useEffect, useState} from 'react'
import cartApi from '../../../api/CartApi'
import accountApi from '../../../api/AccountApi'
import './Persional.scss'
import Header from '../Header/Header';
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb';
import Footer from '../Footer/Footer';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';
import { Button } from '@material-ui/core';

function Persional() {

    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [infoOrderForUser, setInfoOrderUser] = useState([])
    const [flag,setFlag] = useState(false)
    const acc = localStorage.getItem('account')
    useEffect( async() => {
            try {
                const respone = await accountApi.getUser(acc);
                setInfoUser(respone);
                setFlag(!flag)
            } catch (error) {
                console.log(error.message)
            }
    }, [])

    useEffect(() => {
      const fetchListCart = async () => {
          try {
              const respone = await cartApi.getCartUser(infoUser.MAKH);
              setListCartRender(respone)
          } catch (error) {
                  console.log(error.message);
          }
      }
      fetchListCart()
    }, [flag])
    
    useEffect(() => {
        const fetchInfoOrderForUser = async () => {
            try {
                const respone = await cartApi.getUserOrder(infoUser.MAKH);
                setInfoOrderUser(respone)
            } catch (error) {
                    console.log(error.message);
            }
        }
        fetchInfoOrderForUser()
    }, [flag])

    console.log(`infoOrderUser`, infoOrderForUser)

    const handleLogout = () => {
        localStorage.removeItem("account")
    }

    const handleCancleOrder = async (e,id) => {
        e.preventDefault()
        const data = {
            MADH: id,
            TRANGTHAI: 5,
            MANV: null
          }
        try {
            await cartApi.cancelOrder(data);
            await setFlag(!flag)
        } catch (error) {
            alert(error.message)
        }
    }

    const renderStateOrder = (value) => {
        if(value.TRANGTHAI === 1) 
            return <td>Đang xử lí</td>
        else if(value.TRANGTHAI === 2)
            return  <td>Đã xác nhận</td>
        else if(value.TRANGTHAI === 3)
            return  <td>Đang giao hàng</td>
        else if(value.TRANGTHAI === 4)
            return  <td>Hoàn Thành</td>
         else if(value.TRANGTHAI === 5)
            return  <td>Đã Hủy</td>
    }

    return (

        <div className="persional">
            <Header listCartRender={listCartRender}></Header>
            <HeaderCrumb category = 'Tài Khoản' ></HeaderCrumb>
            <div class="content">
        <div class="container title_tk mt-4">
            <h1>TÀI KHOẢN CỦA TÔI</h1>
            <hr  width="100%" size="5px"/>
        </div>
 
        <div class="container">
          <div className="wrap-persional">
          <div class="mini_menu_content">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-3 mt-4">
                            <div class="danh_muc_tk">
                                <h3>Tài khoản</h3>
                                <ul class="danh_muc_content mt-4">
                                    <li><a href="/home/edit-account">Sửa thông tin tài khoản</a></li>
                                    <li><a href="home/order/info">Trạng thái đơn hàng</a></li>
                                    <li ><a onClick={handleLogout} href="/home/dang-nhap">Đăng Xuất</a></li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-sm-9 mt-4">
                            <div class="danh_muc_tk">
                                <h3>Thông tin tài khoản</h3>
                                <ul class="danh_muc_content mt-4">
                                    <li>
                                        <div class="danh_muc_content_info">
                                            <label for="">Họ tên: </label>
                                            <p>{infoUser.HOTEN}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="danh_muc_content_info">
                                            <label for="">Email: </label>
                                            <p>{infoUser.MAIL}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="danh_muc_content_info">
                                            <label for="">Số điện thoại: </label>
                                            <p>{infoUser.SDT}</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="danh_muc_content_info">
                                            <label for="">Địa chỉ: </label>
                                            <p>{infoUser.DIACHI}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="order_list_tk">
                               <h3>DANH SÁCH ĐƠN HÀNG MỚI NHẤT</h3>
                               <table>
                                   <thead>
                                       <tr>
                                           <th>Mã đơn hàng</th>
                                           <th>Ngày đặt</th>
                                           <th>Thành tiền</th>
                                           <th>Trạng Thái</th>
                                       </tr>
                                   </thead>

                                   <hr  width="100%" size="3px"/>

                                   <tbody>
                                   {/* import NumberFormat from 'react-number-format'; */}
                                        
                                        {
                                            infoOrderForUser.length > 0 && infoOrderForUser.map(val => (
                                                    <tr>
                                                        <td>{val.ID}</td>
                                                        <td>
                                                            <Moment format="DD/MM/YYYY">
                                                            {val.THOIGIAN}
                                                            </Moment>
                                                        </td>
                                                    
                                                        <td>
                                                        <NumberFormat value={val.TONGTIEN} displayType={'text' } thousandSeparator={true} /> vnđ
                                                        </td>
                                                        {
                                                            renderStateOrder(val)
                                                        }
                                                        {
                                                            val.TRANGTHAI == 1 ? 
                                                            <Button 
                                                            color="primary"
                                                            onClick={(e) => {handleCancleOrder(e,val.ID)}}
                                                            >Hủy</Button>
                                                            : <Button disabled={true}>Hủy</Button>
                                                        }
                                                    </tr> 
                                            ))
                                        }  
                                   </tbody>
                               </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
          </div>
        </div>
            <Footer></Footer>
        </div>
    )
}

export default Persional
