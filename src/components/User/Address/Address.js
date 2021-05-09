import React, {useEffect, useState} from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import HeaderCrumb from '../HeaderCrumb/HeaderCrumb'
import SendGmail from '../SendGmail/SendGmail'
import TitleProducts from '../TitleProducts/TitleProducts'
import cartApi from '../../../api/CartApi'
import accountApi from '../../../api/AccountApi'
import './Address.scss'
function Address() {

    const [listCartRender, setListCartRender] = useState([]);
    const [infoUser, setInfoUser] = useState({})
    const [flag,setFlag] = useState(false)
    const acc = localStorage.getItem('account')
    useEffect( async() => {
            try {
                const respone = await accountApi.getUser(acc);
                setInfoUser(respone);
            } catch (error) {
                console.log(error.message)
            }
    }, [flag])

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

    const iframeStyle ={
        width: '600px',
        height: '450px',
        style: "border:0;" ,
        allowfullscreen: "",
         loading: "lazy"
    }
    return (
        <div>
             <Header listCartRender={listCartRender}></Header>
            <HeaderCrumb category = 'Địa Chỉ' ></HeaderCrumb>
            <TitleProducts title='Địa Chỉ' ></TitleProducts>
            <div class="container">
                <div class="row">
                    <div class="col-sm-9 mt-4 ">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.338475889367!2d106.6797543141166!3d10.785367161979416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!
                    1m2!1s0x31752f2bf9dbc633%3A0xd1d17195fc9e50d1!2zMTgzQiBUcuG6p24gUXXhu5FjIFRo4bqjbywgUGjGsOG7nW5nIDksIFF14bqtbiAzLCBUaMOgbmggcGjhu5EgSOG7kyBDaMOtIE1pbmgsIFZp
                    4buHdCBOYW0!5e0!3m2!1svi!2s!4v1617183584077!5m2!1svi!2s"
                    style={iframeStyle}
                    ></iframe>
                    </div>

                    <div class="col-sm-3 mt-4">
                        <div class="danh_muc">
                            <h2>DANH MỤC TRANG</h2>
                            <ul>
                                <li><a href="introduce.html">Giới thiệu</a></li>
                                <li><a href="chinh_sachDT.html">Chính sách đổi trả</a></li>
                                <li><a href="chinhSachBM.html">Chính sách bảo mật</a></li>
                                <li><a href="DieuKhoanDV.html">Điều khoản dịch vụ</a></li>
                            </ul>
                        </div>

                        <div class="hinh_sp">
                            <a href="list_product.html">
                                <img src="https://theme.hstatic.net/200000240163/1000672133/14/page_banner.jpg?v=405" alt="List product"/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <SendGmail></SendGmail>

            <Footer></Footer>
        </div>
    )
}

export default Address
