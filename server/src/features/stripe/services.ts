// import { IPaymentData, ISavePayment } from "./interface";
// import { mysqlConnection } from "../../db/sqldb_Connection";
// import { OkPacket, RowDataPacket } from "mysql2";
// import { v4 as uuidv4 } from "uuid";
// import Payment from "./model/payment";
// import Order_details from "../user/models/orderDetails";
// import Pre_order from "../user/models/orderDetails";
// import mongoose from "mongoose";
// import User from "../auth/model/user";
// import { ObjectId } from "mongodb";

// const stripe = require("stripe")(
//   "sk_test_51MBWXdSA4Sjfy5zC6wI3R8hpK3MhoCF9gvve8ggOhMjica8sywiZETJINKCUybtYQxs43DEqA4eYJYQKQLmWRDAg00pHzDJCz9"
// );

// export class PaymentServices {
//   // static payment = async (data: IPaymentData) => {
//   //   let { amount } = data;
//   //   try {
//   //     let paymentIntentConfig: {
//   //       amount: number;
//   //       currency: string;
//   //     } = {
//   //       amount,
//   //       currency: "usd",
//   //     };

//   //     const paymentIntent = await stripe.paymentIntents.create(
//   //       paymentIntentConfig
//   //     );

//   //     if (paymentIntent) {
//   //       return {
//   //         success: true,
//   //         message: "payment_successfully",
//   //         client_secret: paymentIntent.client_secret,
//   //       };
//   //     } else {
//   //       return {
//   //         success: false,
//   //         message: "payment_unsuccessfully",
//   //       };
//   //     }
//   //   } catch (error) {
//   //     console.log(error);
//   //     return {
//   //       success: false,
//   //       message: "Something went wrong",
//   //     };
//   //   }
//   // };

//   static payment = async (data: any, user_id: any) => {
//     const userId = new mongoose.Types.ObjectId(user_id);
//     const user = await User.findById(userId);
//     // const stripeCustomerId = user?.stripeCustomerId;

//     const product_ids = data?.map((item: any) => new mongoose.Types.ObjectId(item._id));
//     let total_amount=0;
//     data.map((item:any)=>total_amount+=item.price);
//     const orderDetails=new Order_details({
//       user_id:new mongoose.Types.ObjectId(user_id),
//       product_ids:product_ids,
//       total_amount:total_amount*100
//     });
//     const resp = await orderDetails.save();
//     console.log("respData",resp);
//     if(resp._id){
//        const preorder=new Pre_order({
//         user_id:new mongoose.Types.ObjectId(user_id),
//         order_details_id:resp._id,
//        })
//        const preorder_result = await preorder.save();
//        console.log("preorder_result",preorder_result);
//     }

//     const line_items = data.map((item: any, index: number) => ({
//       price_data: {
//         currency: "USD",
//         product_data: {
//           name: item.productname,
//         },
//         unit_amount: item.price * 100,
//       },
//       quantity: 1,
//     }));

//     try {
//       const session = await stripe.checkout.sessions.create({
//         mode: "payment",
//         payment_method_types: ["card"],
//         line_items: line_items,
//         customer: stripeCustomerId,
//         success_url: `http://localhost:3000/success`,
//         cancel_url: `http://localhost:3000/cancel`,
//       });
//       console.log("successsss====", session);
//       return { id: session?.id };
//     } catch (e) {
//       console.log("errrrr====>>", e);
//     }
//   };

//   static savePayment = async (body: ISavePayment, prev_db: string) => {
//     const { user_id, product_ids, transactionId, amount } = body;
//     try {
//       if (prev_db === "mongodb") {
//         const user_id = new mongoose.Types.ObjectId(body.user_id);
//         const id_List = body.product_ids;

//         const product_ids = <any>[];
//         id_List.map((item) => {
//           const product_id = new mongoose.Types.ObjectId(item);
//           product_ids.push(product_id);
//         });

//         const data = new Payment({
//           ...body,
//           user_id: user_id,
//           product_ids: product_ids,
//         });

//         const resp = await data.save();
//         if (resp) {
//           return {
//             status: 200,
//             data: data,
//             message: "Payment details saved successfully",
//           };
//         }
//       } else if (prev_db === "sql") {
//         const _id = uuidv4();
//         function queryAsync(
//           connection: any,
//           sql: string,
//           values?: any
//         ): Promise<RowDataPacket[]> {
//           return new Promise((resolve, reject) => {
//             connection.query(
//               sql,
//               values,
//               (error: any, results: RowDataPacket[]) => {
//                 if (error) {
//                   reject(error);
//                 } else {
//                   resolve(results);
//                 }
//               }
//             );
//           });
//         }
//         const insertQuery =
//           "INSERT INTO payments (_id, user_id, transactionId, amount) VALUES (?, ?, ?, ?)";
//         const insertResult: any = await queryAsync(
//           mysqlConnection,
//           insertQuery,
//           [_id, user_id, transactionId, amount]
//         );

//         if (insertResult.affectedRows === 1) {
//           const selectQuery = "SELECT _id FROM payments WHERE transactionId=?";
//           const get_id: any = await queryAsync(mysqlConnection, selectQuery, [
//             transactionId,
//           ]);

//           const payment_id = get_id[0]._id;

//           const productInsertQuery =
//             "INSERT INTO payment_products (payment_id, product_id) VALUES (?, ?)";
//           product_ids.map(async (id) => {
//             const result = await queryAsync(
//               mysqlConnection,
//               productInsertQuery,
//               [payment_id, id]
//             );
//           });

//           return {
//             status: 200,
//             message: "Payment details saved successfully",
//           };
//         }
//       }
//     } catch (error: any) {
//       return {
//         status: 500,
//         message: error.message,
//       };
//     }
//   };
// }
