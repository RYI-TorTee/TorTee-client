
import axiosInstance from '../service/AxiosInstance';
import { RYI_URL } from '../URL_BE/urlbackend';

//get profile data
export const getProfile = () => {
    return axiosInstance.get(`${RYI_URL}/Account/my-profile`);
};

// handle logout
export const logout = () => {
    return axiosInstance.post(`${RYI_URL}/Auth/logout`);
};

//admin
export const getUsersAdmin = () => {
    return axiosInstance.get(`${RYI_URL}/Admin/users?pageSize=100`)
}

export const getMentorsAdmin = () => {
    return axiosInstance.get(`${RYI_URL}/Admin/mentors?pageSize=100`)
}
export const getStaffsAdmin = () => {
    return axiosInstance.get(`${RYI_URL}/Admin/staffs?pageSize=100`)
}

export const getTransactionAdmin = () => {
    return axiosInstance.get(`${RYI_URL}/Admin/transaction`)
}






export const fetchAPIMyProfile = () => {
    return axiosInstance.get(`${RYI_URL}/Account/my-profile`)
}
