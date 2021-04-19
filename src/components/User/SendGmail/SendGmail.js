import React from 'react'
import './SendGmail.scss'
function SendGmail() {
    return (
        <section className="send-for-gmail container">
                <div class="row form_DK">
                    <div id="send-email" class=" send_email">
                        <div className="contend">
                            <h3> Đăng kí nhận tin</h3>
                            <p> Đăng ký Email để theo dõi những sản phẩm được giảm giá của chúng tôi</p>
                        </div>
                        <div class="form_DK">
                            <div className="form">
                                <input type="text" placeholder="Nhập email của bạn"/>
                            </div>
                            <button id="btn-subcribe" type="button" class="btn btn-outline-success">Gửi</button>
                        </div>
                    </div>
                </div>
        </section>
    )
}

export default SendGmail
