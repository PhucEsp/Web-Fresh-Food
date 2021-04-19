
const initState = {
    loading: false,
    data: [],
    error: '',
}

const ProductsReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FETCH_PRODUCTS_REQUEST':
            return {
                ...state,
                loading: true,
            }
        case 'FETCH_PRODUCTS_SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: '',
            }
        case 'FETCH_PRODUCTS_FAILURE':
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload,
            }
    
        default:
            return state;
    }
}

export default ProductsReducer;