// import css
import './index.scss'
// import './admin.scss'
import './App.css';
import './components/admin/AccoutnUser/AccountUser.scss'

import { BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";
import HeaderAdmin from './components/admin/Header';
import MainControll from './components/admin/MainControll';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Home from './components/User/HomePage/Home';
import Collections from './components/User/CollectionsPage/Collections';
import Introduction from './components/User/Introduction/Introduction';
import Contact from './components/User/Contact/Contact';
import Address from './components/User/Address/Address';
import BlogPage from './components/User/Blog/BlogPage';
import Fruit from './components/User/PageFruit/Fruit';
import Mushroom from './components/User/PageMushroom/Mushroom';
import Healthy from './components/User/PageHealthy/Healthy';
import DetailProduct from './components/User/DetailProduct/DetailProduct';
import UserRegister from './components/User/UserRegister/Register'
import UserLogin from './components/User/UserLogin/UserLogin';
import CartDetail from './components/User/CartDetail/CartDetail';
import Payment from './components/User/Payment/Payment';
import Persional from './components/User/Personal/Persional';
import OrderSuccess from './components/User/OrderSuccess/OrderSuccess';
import EditInfoPersonal from './components/User/EditInfoPersonal/EditInfoPersonal';
import Paypal from './components/User/Paypal/Paypal';

function App() {  
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route  path="/admin/dangnhap" component={Login}>
          </Route>
          <Route  path="/admin/dangki" component={Register}></Route>
          <Route exact path="/admin">
            <HeaderAdmin></HeaderAdmin>
            <MainControll></MainControll>
          </Route>
          <Route exact path="/admin/products">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
              <Redirect to="/admin/products" ></Redirect>
            </MainControll>
          </Route>
          <Route exact path="/admin/management">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/admin/management" ></Redirect>
            </MainControll>
          </Route>
          <Route exact path="/admin/order">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/admin/order" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/admin/statistical">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/admin/statistical" ></Redirect>
            </MainControll>
          </Route>


          <Route exact path ='/home' component={Home}></Route>
          <Route exact path ='/home/collections/rau-sach' component={Collections}></Route>
          <Route exact path ='/home/collections/trai-cay' component={Fruit}></Route>
          <Route exact path ='/home/collections/nam-tuoi' component={Mushroom}></Route>
          <Route exact path ='/home/collections/cham-soc-suc-khoe' component={Healthy}></Route>
          <Route exact path ='/home/gioi-thieu' component={Introduction}></Route>
          <Route exact path ='/home/lien-he' component={Contact}></Route>
          <Route exact path ='/home/dia-chi' component={Address}></Route>
          <Route exact path ='/home/blogs' component={BlogPage}></Route>
          <Route exact path ='/home/chi-tiet-san-pham/:ID' component={DetailProduct}></Route>
          <Route exact path ='/home/dang-ki' component={UserRegister}></Route>
          <Route exact path ='/home/dang-nhap' component={UserLogin}></Route>
          <Route exact path ='/home/gio-hang' component={CartDetail}></Route>
          <Route exact path ='/home/thanh-toan' component={Payment}></Route>
          <Route exact path ='/home/tai-khoan' component={Persional}></Route>
          <Route exact path ='/home/dat-hang-thanh-cong' component={OrderSuccess}></Route>
          <Route exact path ='/home/chinhsua/taikhoan' component={EditInfoPersonal}></Route>
          {/* <Route exact path ='/home/thanh-toan/paypal' component={Paypal}></Route> */}
          <Route exact path="*">
          </Route>
        </Switch>
      </Router>
      
      {/* <Login></Login> */}
    </div>
  );
}
export default App;
