import React , {component} from 'react'
import { BrowserRouter as Router ,Switch,Route,Link, Redirect,useRouteMatch} from "react-router-dom";
import Login from '../Login/Login';
import AccountUser from './AccoutnUser/AccountUser';
import AddProduct from './AddProduct/AddProduct';
import AccountAdmin from './AdminAccount/AdminAccount';
import FormCreateAccount from './FormCreateAccount/FormCreateAccount';
import Healthy from './Healthy';
import Mushroom from './MushRoom';
import Navbar from './Navbar'
import ProductsPage from './ProductsPage';
import StaffAccount from './StaffAccount/StaffAccount';
import UserPage from './UserPage';
import Vegetable from './Vegetables';

function MainControll() {
    
    return ( 
        <div className="Main-Controll">
           <Router>
                <Navbar></Navbar>
                <Switch>
                    <Route exact path="/admin">
                        <Redirect exact to="/traicay"></Redirect>
                    </Route>
                    <Route exact path="/traicay" component={ProductsPage}></Route>
                    <Route exact path="/raucuqua" component={Vegetable}></Route>
                    <Route exact path="/namtuoi" component={Mushroom}></Route>
                    <Route exact path="/chamsocsuckhoe" component={Healthy}></Route>
                    <Route exact path="/useraccount" component={AccountUser}></Route>
                    <Route exact path="/adminaccount" component={AccountAdmin}></Route>
                    <Route exact path="/staffaccount" component={StaffAccount}></Route>
                    <Route exact path="/admin/themoisanpham" component={AddProduct}></Route>
                    <Route exact path="/themtaikhoan" component={FormCreateAccount}></Route>
                    
                </Switch>
            </Router>
        </div>
    )
}

export default MainControll