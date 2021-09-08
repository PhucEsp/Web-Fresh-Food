import '../../admin.scss'
import React  from 'react'
import { BrowserRouter as Router ,Switch,Route, Redirect} from "react-router-dom";
import Navbar from './Navbar'
import ProductsPage from '../AdminMain/PageProducts/ProductsPage';
import Createbar from './CreateBar/Createbar';
import CreatebarUser from './CreateBar/CreateBarUser';
import UserManagement from '../AdminMain/UserPage/UserManagement';
import OrderManagement from '../AdminMain/OrderPage/OrderManagement';
// import Statistical from '../AdminMain/Statistical/Statistical';
import RevenueStatistical from '../AdminMain/Statistical/RevenueStatistical';
// import Statistical from '../User/Statistical/Statistical';



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
                        
                        <Route exact path="/admin/statistical">
                            <div>
                                {/* <Statistical></Statistical> */}
                                {/* <Statistical></Statistical> */}
                                <RevenueStatistical></RevenueStatistical>
                            </div>
                        </Route>
                    </Switch>
                </Router>
            </div>
        </>
        
    )
}

export default MainControll