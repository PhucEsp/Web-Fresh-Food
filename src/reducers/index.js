import { combineReducers } from "redux";
import ProductsReducer from "./Products";


const rootReducer  = combineReducers({
    products: ProductsReducer,
})

export default rootReducer;