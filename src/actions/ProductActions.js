import productsApi from "../api/ProductsApi"
import { FETCH_PRODUCTS_FAILURE, FETCH_PRODUCTS_REQUEST, FETCH_PRODUCTS_SUCCESS } from "./ConstantType"

export const fetchProductsRequest = () => {
    return{
        type: FETCH_PRODUCTS_REQUEST,
    }
}

export const fetchProductsSuccess = (products) => {
    return{
        type: FETCH_PRODUCTS_SUCCESS,
        payload: products,
    }
}

export const fetchProductsFailure = (errors) => {
    return{
        type: FETCH_PRODUCTS_FAILURE,
        payload: errors,
    }
}


// Action creator return a function -- to call Api
export const fetchProducts = () => {
    return (dispatch) => {
        // ==================== Call Api cách 2 ------------------------
        dispatch(fetchProductsRequest());
        const fetchProductsList = async () => {
                    try {
                        const products = await productsApi.getAll();
                        dispatch(fetchProductsSuccess(products));
                    } catch (error) {
                        dispatch(fetchProductsFailure(error.message))
                    }
                }
        fetchProductsList();

        //  ----------------- Call Api cách 1 --------------------
        // dispatch(fetchProductsRequest());
        // axios.get('http://localhost:8081/sanpham')
        // .then(res => {
        //     const products = res.data;
        //     dispatch(fetchProductsSuccess(products));
        // })
        // .catch(err => {
        //     const error = err.message;
        //     dispatch(fetchProductsFailure(error))
        // })
    }
}