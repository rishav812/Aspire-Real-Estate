import express, { Express } from "express";
import bodyParser from "body-parser";
import rootRouter from "./src/features/RootRouter";
import cors from "cors";
import dbConnect from "./src/db/mgdbConnection";
import { mysqlConnection } from "./src/db/sqldb_Connection";
// import stripe from "stripe";
// const stripe = new Stripe(
//   "sk_test_51MBWXdSA4Sjfy5zC6wI3R8hpK3MhoCF9gvve8ggOhMjica8sywiZETJINKCUybtYQxs43DEqA4eYJYQKQLmWRDAg00pHzDJCz9"
// );
const stripe = require('stripe')('sk_test_51MBWXdSA4Sjfy5zC6wI3R8hpK3MhoCF9gvve8ggOhMjica8sywiZETJINKCUybtYQxs43DEqA4eYJYQKQLmWRDAg00pHzDJCz9');
const endpointSecret = "whsec_jdyypZLwQyZqTgkdlx6iLoOS9FZGpA2A";

const app: Express = express();
const PORT = 3001;

const corsOptions = {
  credentials: true,
};

dbConnect();

mysqlConnection.connect((err) => {
  if (err) {
    console.log("Error in db connection: " + JSON.stringify(err, undefined, 2));
  } else {
    console.log("mysql-db Connected...");
  }
});

app.use(cors(corsOptions));

app.post("/webhook", express.raw({ type: "*/*" }), (request, response) => {
  console.log("reuest", request.body);
  const sig = request.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      request.body,
      sig as any,
      endpointSecret
    );
    // console.log("event.data.object", event.data.object);
  } catch (err: any) {
    console.log("error", err);
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }
  // Handle the event
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case "checkout.session.completed":
      console.log("");
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  if(event.data.object.object=="charge"){
    console.log("event.data.object.object.charge===>>",event.data.object)
  }
  // Return a 200 response to acknowledge receipt of the event
  response.send("ok");
});

app.use(bodyParser.json({ limit: "10mb" }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(express.json());

app.use("/api/v1", rootRouter);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log("Running on the server ", PORT);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
