
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
    order: (data) => {
        const url = `dathang/khachhang`
        return axiosClient.post(url,data)
    },
    // order
    getAllOrder: () => {
        const url = '/dathang'
        return axiosClient.get(url)
    },
    
    getDetailOrder: (makh) => {
        const url = `dathang/ctdh/${makh}`
        return axiosClient.get(url)
    },
    updateDetailOrder: (id,data) => {
        const url = `dathang/${id}`
        return axiosClient.put(url,data)
    },
    
    cancelOrder: (data) => {
        const url = 'dathang/huy'
        return axiosClient.post(url,data)
    },
    getUserOrder: (makh) => {
        const url = `dathang/khachhang/${makh}`
        return axiosClient.get(url)
    },
    getUserDetailOrder: (madh) => {
        const url = `ctdh/khachhang/${madh}`
        return axiosClient.get(url)
    }
}

export default cartApi