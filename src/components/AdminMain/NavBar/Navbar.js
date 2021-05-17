import React from 'react'

function Navbar() {
    return (
        <div>
            <div className="navbar">
                <div className="wrap-navbar"> 
                    <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                        <Link to="/traicay" class="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true" >Sản Phẩm</Link>
                        <Link to="/namtuoi" class="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Tài Khoản</Link>
                        <Link to="/donhang" class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Đơn Hàng</Link>
                        <Link to="/admin/products" class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Test</Link>
                    </div>            
                </div>
            </div>
        </div>
    )
}

export default Navbar
