import { useState } from "react";
import { IallProduct } from "../../../interfaces/commonInterface";
import { RootStateOrAny, useSelector } from "react-redux";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { IErrors } from "../../../interfaces/checkOutInterface";
import { paymentStripe, savePaymentAction } from "../../../services/user";
import React from "react";
interface propsInterface {
  data: IallProduct[];
}

function CheckOutForm(props: propsInterface) {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState<IErrors>({
    incomplete_number: "",
    incomplete_expiry: "",
    incomplete_cvc: "",
  });
  const elements = useElements();
  const stripe = useStripe();
  const user_id = useSelector(
    (state: RootStateOrAny) => state.AuthReducer.authData.user_id
  );

  const handleSubmit = async () => {
    setLoader(true);
    try {
      const cardElement = elements && elements.getElement(CardNumberElement);
      const new_data = props.data;
      console.log(new_data);

      let amount: number = 0;
      const product_ids: any = [];

      new_data.map((item) => {
        amount += item.price;
        product_ids.push(item._id);
      });
      amount = Number(amount.toFixed(2));

      const { data: clientSecret } = await paymentStripe({
        amount: Math.round(amount * 100),
        product_ids: product_ids,
        type: "Buying",
      });

      const createPayment =
        stripe &&
        (await stripe.createPaymentMethod({
          type: "card",
          card: cardElement!,
        }));
      if (createPayment?.paymentMethod && clientSecret?.client_secret) {
        const confirmPayment =
        stripe &&
        (await stripe.confirmCardPayment(clientSecret?.client_secret as any, {
          payment_method: createPayment?.paymentMethod.id,
        }));

        if (createPayment?.paymentMethod && confirmPayment) {
          const { paymentIntent, error } = confirmPayment;
          if(paymentIntent){
            const paymentPayload={
              user_id:user_id,
              product_ids:product_ids,
              transactionId: paymentIntent.id,
              amount:amount
            }
            console.log("payload",user_id, typeof user_id, product_ids, typeof product_ids, paymentIntent.id, typeof paymentIntent.id)
            const savePayment = await savePaymentAction(paymentPayload);
            console.log(savePayment.data);
            if(savePayment.data?.status==200){
              alert("Payment successfuly done")
            }
            else if(error){
              alert(error)
            }
          }
        }
      }
    } catch (error: any) {
      console.log(error);
    }
    setLoader(false)
  };

  return (
    <form>
      <div className="stripe-input form-group">
        <label>Card Number</label>
        <CardNumberElement className="form-control" />
        <div className="auth-msg error">
          <p>{errors.incomplete_number}</p>
        </div>
      </div>
      <div className="stripe-input form-group">
        <label>Card Expiry</label>
        <CardExpiryElement className="form-control" />
        <div className="auth-msg error">
          <p>{errors.incomplete_expiry}</p>
        </div>
      </div>
      <div className="stripe-input form-group">
        <label>CVC</label>
        <CardCvcElement className="form-control" />
        <div className="auth-msg error">
          <p>{errors.incomplete_cvc}</p>
        </div>
      </div>

      <div className="text-center">
        <button
          disabled={loader ? true : false}
          type="button"
          onClick={handleSubmit}
          className="theme-button button-lg blue-btn"
        >
          <span>Pay Now</span>
        </button>
      </div>
    </form>
  );
}

export default CheckOutForm;
