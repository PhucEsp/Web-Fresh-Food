
import axiosClient from "./axiosClient"

const cartApi = {
    addToCart: (data) => {
        const url = '/giohang'
        return axiosClient.post(url,data)
    },
    getAll: () => {
        const url = '/giohang'
        return axiosClient.get(url)
    },
    getCartUser: (user_id) => {
        const url = `/giohang/khachhang/sanpham/${user_id}`
        return axiosClient.get(url)
    },
    deleteItem: (id) => {
        const url = `giohang/${id}`
        return axiosClient.delete(url)
    },
    update: (id,data) => {
        const url = `giohang/${id}`
        return axiosClient.put(url,data)
    },
    
}

export default cartApi