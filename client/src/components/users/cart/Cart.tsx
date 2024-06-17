import { Suspense, useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  clearCart,
  deleteCartService,
  getCartData,
} from "../../../services/user";
import { IallProduct } from "../../../interfaces/commonInterface";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../payment/CheckOut";
import "./Cart.css";
import React from "react";
import { http } from "../../../utils/http";
import Loader from "../../loader/Loader";

function Cart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<IallProduct[]>([]);
  const [dlt2, setDlt2] = useState<boolean>(false);
  const [clr, setClr] = useState<boolean>(false);
  const [isId1, setIsId1] = useState<String>("");
  const [showCheckout, setShowCheckout] = useState<boolean>(false);
  const STRIPE_PK_TEST =
    "pk_test_51Nacd5Ij1cuyHlAeit2pUK6CxoLeiKoOOiSDaWuhq4HI2uJwMdkI5sI5bvxz48irg2btN9x4ONH6M7bRJczFkIo200NbPJpKKn";
  const stripePromise = loadStripe(STRIPE_PK_TEST as string);

  const fetchData = async () => {
    console.log("fetchData called");
    try {
      const res = await getCartData();
      console.log("res", res);
      setData(res.CartData);
    } catch (error) {
      console.log("Error in fetching product data: ", error);
    } finally {
      setLoading(false);
    }
  };

  const delete_Product = async (id: string) => {
    setDlt2(true);
    setIsId1(id);
    try {
      const resp = await deleteCartService(id);
    } catch (error) {
      console.log(error);
    }
    setDlt2(false);
  };

  const clearAll = async () => {
    try {
      const resp = await clearCart();
      setClr(true);
    } catch (error) {
      console.log(error);
    }
  };

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51MBWXdSA4Sjfy5zCKi69yiSK0RmkCeCJWf11gaEeys3ZcSK7zzAOtELJir7Y6W4AgG26gZQLupNkIYJxBarRWs1v00TnLWwdm6"
    );
    const headers = {
      "Content-Type": "application/json",
    };

    // const response = await fetch(
    //   "http://localhost:3001/api/v1/payment/create-checkout-session",
    //   {
    //     method: "POST",
    //     headers: headers,
    //     body: JSON.stringify(data),
    //   }
    // );

    const response = await http.post(
      "http://localhost:3001/api/v1/payment/create-checkout-session",
      data
    );
    console.log("response", response);
    const result = await stripe?.redirectToCheckout({
      sessionId: response.data.id,
    });
    console.log("results", result);
    if (result?.error) {
      console.log(result?.error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dlt2, clr]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="cart-container">
          {data && data.length
            ? data.map((item: IallProduct, index) => (
                <Card key={index} className="productCard">
                  <Card.Img
                    variant="top"
                    src={item.image}
                    alt="Product"
                    className="productImg"
                  />
                  <Card.Body>
                    <Card.Title>{item.productname}</Card.Title>
                    <Card.Title>{item.description}</Card.Title>
                    <Card.Text>Price: {item.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => delete_Product(item._id)}
                      disabled={item._id == isId1 && dlt2}
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))
            : null}
            <Button
          variant="primary"
          className="clear-btn"
          onClick={() => makePayment()}
        >
          Proceed to Checkout
        </Button>
          </div>
      )}
    </>
  );
}

export default Cart;
