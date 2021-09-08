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
        const url='/taikhoan/admin';
        return axiosClient.get(url);
    },
    getAccountNhanVien: () => {
        const url = '/taikhoan/nhanvien';
        return axiosClient.get(url);
    },
    addTaiKhoan: (account) =>{
        const url ='/dangnhap';
        return axiosClient.post(account);
    },
    addKhachHang: (account) =>{
        const url ='/dangnhap';
        return axiosClient.post(account);
    },
    addNhanVien: (nhanvien) =>{
        const url ='/nhanvien';
        return axiosClient.post(nhanvien);
    },
    deleteKhachHang: (taikhoan) => {
        const url = `khachhang/${taikhoan}`;
        return axiosClient.delete(url);
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
    },
    updateNV: (id,data) => {
        const url = `nhanvien/${id}`
        return axiosClient.put(url,data)
    },
    updateKH: (id,data) => {
        const url = `khachhang/${id}`
        return axiosClient.put(url,data)
    },
    createAccountKH: (data) => {
        const url = `taikhoan/khachhang`
        return axiosClient.post(url,data)
    },
    verifyAccountKH: (data) => {
        const url = `taikhoan/xacthuc`
        return axiosClient.post(url,data)
    }, 
}

export default accountApi;