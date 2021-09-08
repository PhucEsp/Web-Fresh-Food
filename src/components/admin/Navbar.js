import { Link } from "react-router-dom"

const Navbar = () => {
  const role = localStorage.getItem("role")
    return(
    <div className="navbar">
      <div className="wrap-navbar">
        <div class="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
            {
                role == 1 ? (
                  <>
                      <Link to="/admin/products" class="nav-link active" 
                      id="v-pills-home-tab" data-toggle="pill" 
                      href="#v-pills-home" role="tab" aria-controls="v-pills-home" 
                      aria-selected="true" 
                      >Sản Phẩm</Link>
                      <Link to="/admin/management" class="nav-link" 
                      id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" 
                      role="tab" aria-controls="v-pills-profile" aria-selected="false"
                      >Tài Khoản</Link>
                  </>
                ) : (
                <> 
                </>
                )
            }
            <Link to="/admin/order" class="nav-link" 
            id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" 
            role="tab" aria-controls="v-pills-messages" aria-selected="false"
            >Đơn Hàng</Link>
            <Link to="/admin/statistical" class="nav-link" 
            id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" 
            role="tab" aria-controls="v-pills-messages" aria-selected="false"
            >Thống Kê Doanh Thu</Link>
          </div>
        
      </div>
    </div>
    )
}

export default Navbar;