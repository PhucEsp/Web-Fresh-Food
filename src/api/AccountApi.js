import axios from "axios";
import axiosClient from "./axiosClient";


const accountApi = {

    getAll: () => {
        const url = '/dangnhap';
        return axiosClient.get(url);
    },
    getAccountKhachHang: () => {
        const url = '/khachhang';
        return axiosClient.get(url);
    },
    getAccountAdmin: () => {
        const url='/admin/taikhoan';
        return axiosClient.get(url);
    },
    getAccountNhanVien: () => {
        const url = '/nhanvien/taikhoan';
        return axiosClient.get(url);
    },
    deleteKhachHang: (taikhoan) => {
        const url = `khachhang/${taikhoan}`;
        return axiosClient.delete(url);
    },
    addKhachHang: (account) =>{
        const url ='/khachhang';
        return axiosClient.post(account);
    },
    addKhachHang: (account) =>{
        const url ='/nhanvien';
        return axiosClient.post(account);
    },
    deleteNhanVien: (taikhoan) => {
        const url = `nhanvien/${taikhoan}`;
        return axiosClient.delete(url);
    },
    createUserAccount: (UserAccount) => {
        const url = 'taikhoan/khachhang'
        return axiosClient.post(UserAccount);
    },
    LoginKH: (account) => {
        const url = '/dangnhap/khachhang';
        return axiosClient.post(url,account);
    },
    // lay thong tin cua 1 khach hang theo tai khoan
    getUser: (TAIKHOAN) => {
        const url = `/khachhang/${TAIKHOAN}`;
        return axiosClient.get(url);
    }
}

export default accountApi;