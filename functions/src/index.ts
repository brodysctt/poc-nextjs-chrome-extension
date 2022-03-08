import * as functions from "firebase-functions";
import { Client, resources } from "coinbase-commerce-node";
import type { CreateCharge } from "coinbase-commerce-node";
import { cors } from "./cors";

Client.init("ea5f684e-7558-420b-b2b6-4c091f32d8da");

const { Charge } = resources;

export const createCharge = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const chargeData: CreateCharge = {
      name: "hi",
      description: "how u like this wander",
      local_price: {
        amount: "9.99",
        currency: "USD",
      },
      pricing_type: "fixed_price",
      metadata: {
        user: "bscott4",
      },
    };

    const charge = await Charge.create(chargeData);
    console.log(charge);

    res.send(charge);
  });
});
