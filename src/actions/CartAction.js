
export const fetchCartRequest = () => {
    return{
        type: FETCH_CART_REQUEST,
    }
}

export const fetchCartSuccess = (products) => {
    return{
        type: FETCH_CART_REQUEST,
        payload: products,
    }
}

export const fetchCartFailure = (errors) => {
    return{
        type: FETCH_CART_REQUEST,
        payload: errors,
    }
}

export const fetchListCart = () => {
    return (dispatch) => {
        // ==================== Call Api cách 2 ------------------------
        dispatch(fetchCartRequest());
        const fetchProductsList = async () => {
                    try {
                        const products = await productsApi.getAll();
                        dispatch(fetchCartSuccess(products));
                    } catch (error) {
                        dispatch(fetchProductsFailure(error.message))
                    }
                }
        fetchProductsList();
    }
}