import axiosClient from "./axiosClient"

const loginAdminApi = {
   login: (account) => {
        const url = `/dangnhap/nhanvien`;
        return axiosClient.post(url, account);
    }, 

    // đăng kí 1 tài khoảng
    register: (account) => {
        const url = `/dangnhap`;
        return axiosClient.post(url, account);
    },
    getAll: () => {
        const url = `/dangnhap`;
        return axiosClient.get(url);
    },
    delete: (TAIKHOAN) => {
        const url = `/dangnhap/${TAIKHOAN}`;
        return axiosClient.delete(url);
    }
}
export default loginAdminApi