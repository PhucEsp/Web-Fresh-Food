import axiosClient from "./axiosClient"

export const satisticalApi = {
    RevenueStatistical: (year) => {
        const url = `/thongkedoanhthu/${year}`
        return axiosClient.get(url)
    }
}