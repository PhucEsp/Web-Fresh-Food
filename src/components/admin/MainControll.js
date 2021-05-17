import '../../admin.scss'
import React , {component} from 'react'
import { BrowserRouter as Router ,Switch,Route, Redirect} from "react-router-dom";
import Login from '../Login/Login';
import AccountUser from './AccoutnUser/AccountUser';
import AddProduct from './AddProduct/AddProduct';
import AccountAdmin from './AdminAccount/AdminAccount';
import FormCreateAccount from './FormCreateAccount/FormCreateAccount';
import Healthy from './Healthy';
import Mushroom from './MushRoom';
import Navbar from './Navbar'
import Order from './Order/Order';
// import ProductsPage from './ProductsPage';
import StaffAccount from './StaffAccount/StaffAccount';
import UserPage from './UserPage';
import Vegetable from './Vegetables';
import ProductsPage from '../AdminMain/PageProducts/ProductsPage';
import Createbar from './CreateBar/Createbar';
import CreatebarUser from './CreateBar/CreateBarUser';
import UserManagement from '../AdminMain/UserPage/UserManagement';
import OrderManagement from '../AdminMain/OrderPage/OrderManagement';



function MainControll() {
    
    return ( 
        <>
            <div className="Main-Controll">
            <Router>
                <div>
                <Navbar></Navbar>
                </div>
                    
                    <Switch>
                        <Route exact path="/admin/products">
                            <div>
                                <Createbar></Createbar>
                                <ProductsPage></ProductsPage>
                            </div>
                        </Route>

                        <Route exact path="/admin/management">
                            <div>
                                <CreatebarUser ></CreatebarUser>
                                <UserManagement></UserManagement>
                            </div>
                        </Route>

                        <Route exact path="/admin/order">
                            <div>
                                <OrderManagement></OrderManagement>
                            </div>
                        </Route>
                        
                    </Switch>
                </Router>
            </div>
        </>
        
    )
}

export default MainControll