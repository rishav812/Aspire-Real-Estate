export const endpoints={
    auth:{
       SIGNIN:"/auth/login",
       GOOGLE_SIGNIN:"/auth/google-login",
       SIGNUP:"/auth/signup",
       FORGOT_PASSWORD:"/auth/forgot-password",
       OTP_VERIFICATION:"/auth/otp-verification",
       RESET_PASSWORD:"/auth/reset-password"
    },
    admin:{
       ADDPRODUCT:"/admin/add-product",
       GETALLPRODUCTS:"/admin/get-all-product",
       GETUSERSDATA:"/admin/get-all-user",
       UPDATE_ENUMS:"/admin/update-enums/",
       DELETE_PRODUCT:"/admin/delete-product/",
       UNDO_PRODUCT:"/admin/undo-product/",
       ADD_CATEGORY:"/admin/add-category",
       GET_CATEGORY:"/admin/get-all-category",
       SELECT_DB:"/admin/select-db",
       DELETE_USER:"/admin/delete-user/",
       GET_PAYMENT_DETAILS:"/admin/get-payment-details"
   },
    user:{
      GET_ALL_COUNTRIES:"/user/get-countries",
      FETCH_PUBLISHED_PRODUCT:"/user/fetch-published-product",
      GET_CATEGORY:"/user/fetch-all-category",
      GET_PRODUCT_BY_CATEGORY:"/user/fetch-product-by-category/",
      ADD_TO_CART:"/user/add-to-cart",
      ADD_TO_FAV:"/user/add-to-wishlist",
      GET_CART_DATA:"/user/get-cart-data",
      DELETE_CART_PRODUCT:"/user/delete-cart-data/",
      DELETE_ALL_CART_PRDCT:"/user/delete-all-cart-data",
      GET_WISHLIST:"/user/get-wishlist",
      DELETE_WISHLIST_PRDCT:"/user/delete-fav-product/",
      UPDATE_USER_DATA:"/user/update-user-data",
      STRIPE_CHECKOUT:"/user/checkout",
    },
    payment:{
      PAYMENT:"/payment_intents/pay",
      CREATE_PAYMENT:"/payment_intents/create-payment"
    }
}