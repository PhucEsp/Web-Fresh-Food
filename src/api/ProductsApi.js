import axios from "axios";
import axiosClient from "./axiosClient"

const productsApi = {
    getAll: (params) => {
        const url = '/sanpham';
        return axiosClient.get(url, {params});
    },
    getFruit: () => {
        const url = '/sanpham/traicay';
        return axiosClient.get(url);
    },
    getRamdom: (madm) => {
        const url = `sanpham/random10/${madm}`
        return axiosClient.get(url)
    },
    getVegetable: () => {
        const url = '/sanpham/raucuqua';
        return axiosClient.get(url);
    },
    getMushroom: () => {
        const url = '/sanpham/nam';
        return axiosClient.get(url);
    },
    getHealthy: () => {
        const url = '/sanpham/chamsocsuckhoe';
        return axiosClient.get(url);
    },
    update: (id,data) => {
        const url = `/sanpham/${id}`;
        return axiosClient.put(url, data);
    },
    delete: (id) => {
        const url = `/sanpham/${id}`;
        return axiosClient.delete(url);
    },
    add: (product) => {
        const url ='/sanpham';
        return axiosClient.post(url, product);
    },
    detail: (id) => {
        const url = `/sanpham/${id}`;
        return axiosClient.get(url);
    },
    getCategories: () => {
        const url = '/danhmuc';
        return axiosClient.get(url);
    },
    addCommentForProduct: (data) => {
        const url ='/binhluan';
        return axiosClient.post(url, data);
    },
    getListCommentForProduct: (id) => {
        const url = `/binhluan/sanpham/${id}`;
        return axiosClient.get(url);
    },
    getInfoRating: (id) => {
        const url = `/danhgia/sanpham/${id}`;
        return axiosClient.get(url);
    },
    addRating: (data) => {
        const url = `/danhgia`;
        return axiosClient.post(url,data);
    },
    getStatistical: () => {
        const url = `/thongkedoanhthu/2021`;
        return axiosClient.get(url);
    },
    
    
}

export default productsApi;