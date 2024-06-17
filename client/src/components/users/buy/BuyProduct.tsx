import { useEffect, useState } from "react";
import { ToastContainer} from 'react-toastify';
import {  getCartData } from "../../../services/user";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { IallProduct } from "../../../interfaces/commonInterface";
import StripeCheckout from "react-stripe-checkout";
import "./BuyProduct.css";
import { toastMessageSuccess } from "../../utilities/commonTostify";
import React from "react";

function BuyPrdct() {
  const [data, setData] = useState<IallProduct[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const id = window.location.pathname.split("/").pop();

  const fetchData = async () => {
    try {
      const dataList = await getCartData();
      setData(dataList.productData);
      setIsLoading(true);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    }
  };
  
  const filteredProduct = data.find((item: IallProduct) => item._id === id);

  // const handleToken = async (token?: any, addresses?: any) => {
  //   const resp=await StripePayment(token,addresses,filteredProduct);
  //   if(resp.status==200){
  //       toastMessageSuccess(resp.message);
  //   }
  //   else{
  //       toastMessageSuccess(resp.message);
  //   }
  // };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="buy-container">
      {filteredProduct ? (
        <Card className="productCard">
          <Card.Img
            variant="top"
            src={filteredProduct.image}
            alt="Product"
            className="productImg"
          />
          <Card.Body>
            <Card.Title className="productname">
              {filteredProduct.productname}
            </Card.Title>
            <Card.Title className="description">
              {filteredProduct.description}
            </Card.Title>
            <Card.Text className="price">
              Price: ${filteredProduct.price}
            </Card.Text>
            {/* <StripeCheckout
              stripeKey="pk_test_51Nacd5Ij1cuyHlAeit2pUK6CxoLeiKoOOiSDaWuhq4HI2uJwMdkI5sI5bvxz48irg2btN9x4ONH6M7bRJczFkIo200NbPJpKKn"
              // token={handleToken}
              amount={filteredProduct.price * 100}
              name={filteredProduct.productname}
              billingAddress
              shippingAddress
            /> */}
          </Card.Body>
        </Card>
      ) : (
        <p>No product found.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default BuyPrdct;
