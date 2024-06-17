import { useEffect, useState } from "react";
import {
  findandDeleteUser,
  getPaymentDetails,
  getUsersData,
  select_database,
} from "../../../services/admin";
import { IallProduct, IgetUser } from "../../../interfaces/commonInterface";
import "./Dashboard.css";
import React from "react";

const AdminDashboard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [list, setList] = useState([]);
  const [dlt, setDlt] = useState<boolean>(false);
  const [isId, setIsId] = useState<String>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    // alert(`${e.target.value} is selected`);
    try {
      const dbselect = await select_database(e.target.value);
      localStorage.setItem("selected_db", e.target.value);
      setSelectedValue(e.target.value);
      console.log(dbselect);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setDlt(true);
    setIsId(id);
    try {
      const res = await findandDeleteUser(id);
      console.log(res);
    } catch (error) {
      console.log("error in delete product", error);
    }
    setDlt(false);
  };

  const fetchData = async () => {
    try {
      const dataList = await getUsersData();
      setSelectedValue(selectedValue);
      setData(dataList.data);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };

  const fetchPaymentDetails = async () => {
    try {
      const dataList = await getPaymentDetails();
      setUser(dataList.data.user_details);
      setList(dataList.data);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchPaymentDetails();
  }, [dlt, isLoading]);
  useEffect(() => {
    const value = localStorage.getItem("selected_db");
    if (value) {
      setSelectedValue(value);
    }
    console.log(value)
  }, [selectedValue])

  console.log(selectedValue)

  return (
    <div>
      <br />
      <br />
      <h2>Select Database</h2>
      <br />
      {selectedValue && (
        <h1
          style={{ padding: "5px", backgroundColor: "black", color: "white" }}
        >
          {selectedValue} is selected
        </h1>
      ) }
      <>
        <input
          type="radio"
          id="option1"
          name="db_type"
          value="sql"
          onChange={handleChange}
          checked={selectedValue === "sql"}
        />
        <label htmlFor="option1">SQL</label>
        <br />
        <br />
        <input
          type="radio"
          id="option2"
          name="db_type"
          value="mongodb"
          onChange={handleChange}
          checked={selectedValue === "mongodb"}
        />
        <label htmlFor="option2">Mongodb</label>
      </>
      <br />
      <br />
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
          {data && data.length
            ? data.map((item: IgetUser) => {
                return (
                  <tr>
                    <td>{item?.name}</td>
                    <td>{item?.email}</td>
                    <td>{item?.phone}</td>
                  </tr>
                );
              })
            : null}
        </table>
      </div>
      <br />
      <br />
      <div className="data-display">
        <h1>Sales List</h1>
        <br />
        {list.map((item: any) => (
          <div key={item._id}>
            <div className="section">
              <h4>Product Details</h4>
              {item.productDetails && item.productDetails.length > 0 ? (
                item.productDetails.map((product: IallProduct) => (
                  <div key={product._id}>
                    <p>Product Name : {product.productname}</p>
                    <p>Product Price : {product.price}</p>
                  </div>
                ))
              ) : (
                <p>No product details available.</p>
              )}
            </div>
            <div className="section">
              <h4>User Details</h4>
              {item.userDetails && item.userDetails.length > 0 ? (
                item.userDetails.map((user: any) => (
                  <div key={user._id}>
                    <p>User Name : {user.name}</p>
                    <p>User Email : {user.email}</p>
                    <p>User Phone : {user.phone}</p>
                  </div>
                ))
              ) : (
                <p>No user details available.</p>
              )}
            </div>
            <div className="section">
              <h4>Payment Details</h4>
              {item.paymentDetails && item.paymentDetails.length > 0 ? (
                item.paymentDetails.map((payment: any) => (
                  <div key={payment._id}>
                    <p>Transaction Id : {payment.transactionId}</p>
                    <p>Total Amount : {payment.amount}</p>
                  </div>
                ))
              ) : (
                <p>No payment details available.</p>
              )}
            </div>
            <br />
            <br />
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
