import React from 'react'
import './OrderSuccess.scss'
function OrderSuccess() {
    return (
        <div className="success">
            <div id="content" class="container content mt-5">
                <h1>ĐẶT HÀNG THÀNH CÔNG<i class="fas fa-check-circle"></i></h1>
                <p>
                    Cảm ơn bạn đã tin dùng mua hàng tại Suni Green Farm,
                    Chúng tôi sẽ sớm liên hệ với bạn để Xác Nhận Đơn Hàng qua điện thoại trước khi giao hàng!
                </p>
                <div class="content_info">
                
                    <div class="funtion">
                        <a href="/home">
                            <i class="fa fa-reply"></i>
                            Tiếp tục mua hàng
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccess
