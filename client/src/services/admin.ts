import axios from "axios"
import { baseURL } from "../constants/Constants"
import { endpoints } from "../constants/endpoints"
import { IallProduct,Icategory } from "../interfaces/commonInterface"
import * as http from "../utils/http"

export const getAllProduct=async (): Promise<any>=>{
    const res=await http.get(`${baseURL}${endpoints.admin.GETALLPRODUCTS}`)
    return res.data;
}

export const getUsersData=async (): Promise<any>=>{
    const res=await http.get(`${baseURL}${endpoints.admin.GETUSERSDATA}`)
    return res.data;
}

export const getPaymentDetails=async (): Promise<any>=>{
    const res=await http.get(`${baseURL}${endpoints.admin.GET_PAYMENT_DETAILS}`)
    return res.data;
}

export const addProduct=async(data:IallProduct):Promise<any>=>{
    const res=await http.post(`${baseURL}${endpoints.admin.ADDPRODUCT}`,data)
    return res.data;
}

export const addCategory=async(data:Icategory):Promise<any>=>{
    const res=await http.post(`${baseURL}${endpoints.admin.ADD_CATEGORY}`,data)
    return res.data;
}

export const findandUpdateProduct=async(id:string): Promise<any>=>{
   const res=await http.put(`${baseURL}${endpoints.admin.UPDATE_ENUMS}${id}`)
   return res.data;
}

export const findandDeleteProduct=async(id:String): Promise<any>=>{
    const res=await http.remove(`${baseURL}${endpoints.admin.DELETE_PRODUCT}${id}`)
    return res.data;
}

export const findandDeleteUser=async(id:String): Promise<any>=>{
    const res=await http.remove(`${baseURL}${endpoints.admin.DELETE_USER}${id}`)
    return res.data;
}

export const undoProduct=async(id:String):Promise<any>=>{
    const res=await http.put(`${baseURL}${endpoints.admin.UNDO_PRODUCT}${id}`)
    return res.data;
}

export const fetchCategory=async():Promise<any>=>{
    const res=await http.get(`${baseURL}${endpoints.admin.GET_CATEGORY}`)
    return res.data;
}

export const select_database=async(data:string)=>{
    const res=await axios.post(`${baseURL}${endpoints.admin.SELECT_DB}`,data)
    return res.data;
}
