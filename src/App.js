// import css
import './index.scss'
import './admin.scss'
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

function App() {  
  return (
    <div className="App">

      <Router>
        <Switch>
          <Route  path="/admin/dangnhap" component={Login}></Route>
          <Route  path="/admin/dangki" component={Register}></Route>
          <Route exact path="/admin">
            <HeaderAdmin></HeaderAdmin>
            <MainControll></MainControll>
          </Route>
          {/* return page in MainControl */}
          <Route exact path="/admin/themoisanpham">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/admin/themoisanpham" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/traicay">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/traicay" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/raucuqua">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/raucuqua" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/namtuoi">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/namtuoi" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/chamsocsuckhoe">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/chamsocsuckhoe" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/useraccount">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/useraccount" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/staffaccount">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/staffaccount" ></Redirect>
            </MainControll>
          </Route>

          <Route exact path="/themtaikhoan">
            <HeaderAdmin></HeaderAdmin>
            <MainControll>
            <Redirect to="/themtaikhoan" ></Redirect>
            </MainControll>
          </Route>



          <Route exact path ='/home' component={Home}></Route>
          <Route exact path ='/home/collections/rau-sach' component={Collections}></Route>
          <Route exact path ='/home/gioi-thieu' component={Introduction}></Route>
          <Route exact path="*">
          </Route>

          
         
          
          
        </Switch>
      </Router>
      
      {/* <Login></Login> */}
    </div>
  );
}
export default App;
