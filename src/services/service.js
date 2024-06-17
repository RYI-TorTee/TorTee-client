// service/ApiService.js
import axiosInstance from '../service/AxiosInstance';
import { RYI_URL } from '../URL_BE/urlbackend';

// Example function to get profile data
export const getProfile = () => {
    return axiosInstance.get(`${RYI_URL}/Account/my-profile`);
};

// Example function to handle logout
export const logout = () => {
    return axiosInstance.post(`${RYI_URL}/Auth/logout`);
};

// Example function to create payment URL
export const createPaymentUrl = (id, fullName) => {
    return axiosInstance.post(`${RYI_URL}/Payment/create-payment-url`, {
        OrderInfo: id,
        FullName: fullName,
        OrderType: 'pay',
        Description: '',
        amount: 5000
    });
};

// Add more functions as needed
