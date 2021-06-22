import React, {useEffect, useState} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import SendGmail from '../SendGmail/SendGmail'
import TitleProducts from '../TitleProducts/TitleProducts'
import cartApi from '../../../api/CartApi'
import accountApi from '../../../api/AccountApi'

import './Contact.scss'

function Contact() {
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
    }, [flag])

    return (
        <div>
           <Header listCartRender={listCartRender}></Header>
            <HeaderCrumb category = 'Liên Hệ' productName = ''></HeaderCrumb>
            <TitleProducts title='Liên Hệ Với Chúng Tôi'></TitleProducts>
            <div class="container mt-4">
            <div class="row">
                <div class="col-sm-6 info">
                    <h2>Thông tin liên hệ</h2>
                    <ul class="list_info">
                        <li>
                            <span class="list_icon">
                                <i class="fas fa-map-marker-alt"></i>
                            </span>
                            <span class="content_contact">
                                <p>Địa chỉ chúng tôi</p>
                                <strong>
                                    183B Trần Quốc Thảo, Phường 09, Quận 03, HCM
                                </strong>
                            </span>
                        </li>
                        <li>
                            <span class="list_icon">
                                <i class="fas fa-phone-alt"></i>
                            </span>
                            <span class="content_contact">
                                <p>Số điện thoại</p>
                                <strong>
                                    0899327766
                                </strong>
                            </span>
                        </li>
                        <li>
                            <span class="list_icon">
                                <i class="fas fa-envelope"></i>
                            </span>
                            <span class="content_contact">
                                <p>Email chúng tôi</p> 
                                <strong>
                                    sale@sunigreenfarm.vn
                                </strong>
                            </span>
                        </li>
                        <li>
                            <span class="list_icon">
                                <i class="far fa-calendar-alt"></i>
                            </span>
                            <span class="content_contact">
                                <p>Thòi gian làm việc</p>
                                <strong>
                                    Từ Thứ 2 đến Chủ Nhật ( Từ 7h - 22h)
                                </strong>
                            </span>
                        </li>
                    </ul>
                </div>

                <div class="col-sm-6 feedback">
                    <h2>Gửi thắc mắc cho chúng tôi</h2>
                    <p>
                        Nếu bạn có thắc mắc gì, có thể gửi yêu cầu cho chúng tôi, và chúng tôi sẽ liên lạc lại với bạn sớm nhất có thể .
                    </p>
                    <form action="" class="form_feedback">
                        <input type="text" placeholder="Tên của bạn"/>
                        <input type="email" placeholder="Email của bạn"/>
                        <input type="text" placeholder="Số điện thoại"/>
                        <textarea placeholder="Nội dung" cols="30" rows="3"></textarea>
                        <button type="button" class="btn btn-outline-success">Gửi</button>
                    </form>
                </div>
            </div>

        </div>

            <SendGmail></SendGmail>
            <Footer></Footer>
        </div>
    )
}

export default Contact
