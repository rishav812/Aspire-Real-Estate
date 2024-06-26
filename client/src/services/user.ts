import {
  ISignup,
  ILogin,
  IcartService,
  IUpdateUser,
  IPayment,
  ISavePayment,
} from "../interfaces/commonInterface";
import * as http from "../utils/http";
import { endpoints } from "../constants/endpoints";
import { baseURL } from "../constants/Constants";

export const postSignupService = async (data: ISignup): Promise<any> => {
  const res = await http.post(`${baseURL}${endpoints.auth.SIGNUP}`, data);
  return res.data;
};

export const postLoginService = async (data: ILogin): Promise<any> => {
  const res = await http.post(`${baseURL}${endpoints.auth.SIGNIN}`, data);
  return res.data;
};

export const googleLogin = async (data: { googleCredential: string }) => {
  const res = await http.post(
    `${baseURL}${endpoints.auth.GOOGLE_SIGNIN}`,
    data
  );
  return res.data;
};

export const forgotPasswordService = async (data: { email: string }) => {
  const res = await http.post(
    `${baseURL}${endpoints.auth.FORGOT_PASSWORD}`,
    data
  );
  return res.data;
};

export const OtpVerificationService = async (data: {
  encOtp: string;
  newOtp: string;
}) => {
  const res = await http.post(
    `${baseURL}${endpoints.auth.OTP_VERIFICATION}`,
    data
  );
  return res.data;
};

export const resetPasswordService = async (data: any) => {
  const res = await http.post(
    `${baseURL}${endpoints.auth.RESET_PASSWORD}`,
    data
  );
  return res.data;
};

export const createListing = async (data: any): Promise<any> => {
  const res = await http.post(
    `${baseURL}${endpoints.user.CREATE_LISTING}`,
    data
  );
  return res.data;
};

export const getAllProductService = async (skip: number): Promise<any> => {
  const res = await http.get(
    `${baseURL}${endpoints.user.FETCH_PUBLISHED_PRODUCT}?skip=${skip}`
  );
  return res.data;
};

export const fetchCategories = async (): Promise<any> => {
  const res = await http.get(`${baseURL}${endpoints.user.GET_CATEGORY}`);
  return res.data;
};

export const getProductByCategory = async (id: string): Promise<any> => {
  const res = await http.get(
    `${baseURL}${endpoints.user.GET_PRODUCT_BY_CATEGORY}${id}`
  );
  return res.data;
};

export const addToCartService = async (data: IcartService): Promise<any> => {
  console.log("from front", data);
  const res = await http.post(`${baseURL}${endpoints.user.ADD_TO_CART}`, data);
  return res.data;
};

export const addToWishlist = async (data: IcartService): Promise<any> => {
  const res = await http.post(`${baseURL}${endpoints.user.ADD_TO_FAV}`, data);
  return res.data;
};

export const getCartData = async (): Promise<any> => {
  const res = await http.get(`${baseURL}${endpoints.user.GET_CART_DATA}`);
  return res.data;
};

export const deleteCartService = async (id: string): Promise<any> => {
  const res = await http.remove(
    `${baseURL}${endpoints.user.DELETE_CART_PRODUCT}${id}`
  );
  return res.data;
};

export const deleteWishlistService = async (id: string): Promise<any> => {
  const res = await http.remove(
    `${baseURL}${endpoints.user.DELETE_WISHLIST_PRDCT}${id}`
  );
  return res.data;
};

export const clearCart = async (): Promise<any> => {
  const res = await http.remove(
    `${baseURL}${endpoints.user.DELETE_ALL_CART_PRDCT}`
  );
  return res.data;
};

export const getWishList = async (): Promise<any> => {
  const res = await http.get(`${baseURL}${endpoints.user.GET_WISHLIST}`);
  return res.data;
};

export const updateUser = async (data: IUpdateUser): Promise<any> => {
  const res = await http.post(
    `${baseURL}${endpoints.user.UPDATE_USER_DATA}`,
    data
  );
  return res.data;
};

export const paymentStripe = (data: IPayment): Promise<any> => {
  const res = http.post(`${baseURL}${endpoints.payment.PAYMENT}`, data);
  return res;
};

export const savePaymentAction = (data: ISavePayment): Promise<any> => {
  const res = http.post(`${baseURL}${endpoints.payment.CREATE_PAYMENT}`, data);
  return res;
};

export const getCountries = async (): Promise<any> => {
  const res = await http.get(`${baseURL}${endpoints.user.GET_ALL_COUNTRIES}`);
  return res.data;
};
