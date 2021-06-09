import React from 'react'
import './Footer.scss'
function Footer() {
    return (
        <div class="container-fluid mt-5 end">
            <div class="customer d-flex">
                <div class="col-sm-4 mt-4">
                <ul>
                    <h4>Hỗ trợ khách hàng</h4>
                    <li><a href="/home/gioi-thieu">Giới thiệu</a></li>
                    <li><a href="#">Chính sách đổi trả</a></li>
                    <li><a href="#">Chính sách bảo mật</a></li>
                    <li><a href="#">Điều khoản dịch vụ</a></li>
                </ul>
                </div>
                
                <div class="col-sm-4 mt-4">
                <ul>
                    <h4>Thông tin liên hệ</h4>
                    <li><i class="fas fa-map-marker-alt"></i> 183B Trần Quốc Thảo, Phường 09, Quận 03, HCM</li>
                    <li><i class="fas fa-phone-alt"></i> 0899327766</li>
                    <li><i class="fas fa-envelope"></i> sale@sunigreenfarm.vn</li>
                </ul>
                </div>

                <div class="col-sm-4 mt-4">
                <ul className="img-footer">
                    <h4>Fanpage</h4>
                    <li>
                    <a className='img-footer' href="//www.facebook.com/sunigreenfarmvn/">
                        <i class="fa fa-facebook"><img src="https://theme.hstatic.net/200000240163/1000672133/14/slideshow_1.jpg?v=405"  alt="Suni Green Farm"/></i>
                    </a>
                    </li>
                </ul>
                </div>  
            </div>

            <div class="company">
                <p>Copyright © 2021 <a href="/home"> SUNI GREEN FARM.</a> <a href="https://www.haravan.com/"> Powered by Haravan</a></p>
            </div>
        </div>
    )
}

export default Footer
