import React, {useEffect, useState} from 'react'

import './CartDetail.scss'

import productsApi from '../../../api/ProductsApi'
import accountApi from '../../../api/AccountApi'
import cartApi from '../../../api/CartApi'
import Header from '../Header/Header'
import TitleProducts from '../TitleProducts/TitleProducts'
import Footer from '../Footer/Footer'
import SendGmail from '../SendGmail/SendGmail'
import { Input, Link } from '@material-ui/core'


function CartDetail() {

    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
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
    },[flag])

    const onDelete = (id) => {
        setFlag(!flag)
        cartApi.deleteItem(id);
    }

    const totalPrice = () => {
        return listCartRender.reduce((acc,val) => {
            return acc + (parseInt(val.SOLUONG,10) * parseInt(val.GIA,10));
        },0)
    }

    const handleUpdateQuanty = (e,val) => {
        setFlag(!flag)
        try {
            const data = {
                MASP: val.MASP,
                MAKH: val.MAKH,
                SOLUONG: e.target.value
            }
            cartApi.update(val.ID,data)
            
        } catch (error) {
            alert('Hệ thống lỗi !!! Vui lòng thử lại')
        }
    }

    return (
        <div className="Cart">
            <Header listCartRender={listCartRender}></Header>
            {/* <TitleProducts title='Giỏ Hàng Của Bạn'
            ></TitleProducts> */}

            <div class="content">

            <div class="container title mt-4">
                <h1>GIỎ HÀNG CỦA BẠN</h1>
            </div>

            <div class="container">
                <div class="row">
                    <div class="col-sm-8 mt-4 ">
                        <div class="time_number_card">
                            <p class="count-cart">
                                Bạn đang có
                                <span>
                                    4 sản phẩm
                                </span>
                                trong giỏ hàng
                            </p>
                        </div>

                        <div class="table_card">
                            {
                                listCartRender && listCartRender.map(val => (
                                    <div class="line-item-container" key={val.ID}>
                                        <div class="image">
                                            <img src={val.HINHANH}alt=""/>
                                        </div>
                                        <div class="item">
                                            <div class="info_item">
                                                <h3>Bắp nếp</h3>
                                                <span class="variant_title">Trái</span>
                                                <div class="quantity-area">
                                                    <input type="number" name="quantity" min="1" defaultValue={val.SOLUONG} onChange={(e)=>handleUpdateQuanty(e,val)} />
                                                </div>
                                            </div>
                                            
                                            <p class="price">
                                            <span>₫</span><span>{val.GIA}</span>
                                                <button class="remove_card" title="Xóa sản phẩm này" onClick={()=>{onDelete(val.ID)}}>
                                                    <i class="fas fa-times-circle"></i>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                                

                               
                        </div>

                        <div class="container cart_note">
                            <div class="cart_note_left">
                                <label for="">Ghi chú đơn hàng</label>
                                <textarea name="" id="" cols="30" rows="3"></textarea>
                            </div>
                            <div class="cart_note_right">
                                <h2>Chính sách mua hàng</h2>
                                <ul>
                                    <li><i class="fas fa-arrow-right"></i> Giao nhận tận nơi</li>
                                    <li><i class="fas fa-arrow-right"></i> Tư vấn hướng dẫn sử dụng miễn phí</li>
                                    <li><i class="fas fa-arrow-right"></i> Hotline: 0899327766 (sms/zalo/viber/whatsapp)</li>
                                    <li><i class="fas fa-arrow-right"></i> PKD B2B: 0899317766</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="col-sm-4 mt-4">
                        <div class="danh_muc">
                            <h2>THÔNG TIN ĐƠN HÀNG</h2>
                            <div class="order_price">
                                <p>
                                    Tổng tiền: 
                                    <span> {totalPrice()}₫</span><span></span>
                                </p>
                            </div>
                            <p class="order_note">
                                Phí vận chuyển sẽ được tính ở trang thanh toán.
                                <br/>
                                Bạn cũng có thể nhập mã giảm giá ở trang thanh toán.
                            </p>
                            <div class="order_action">
                                <a href="/home/thanh-toan" >THANH TOÁN</a>
                            </div>
                            <a className="countine_order" href="/home" >
                                <i class="fa fa-reply"></i>
                                Tiếp tục mua hàng
                            </a>
                        </div>

                    </div>
                </div>
            </div>
            </div>

            <SendGmail></SendGmail>
            <Footer> </Footer>
        </div>
    )
}

export default CartDetail
