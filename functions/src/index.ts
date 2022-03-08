import * as functions from "firebase-functions";
import {Client, Webhook, resources} from "coinbase-commerce-node";
import type {CreateCharge} from "coinbase-commerce-node";
import {cors} from "./cors";

Client.init("ea5f684e-7558-420b-b2b6-4c091f32d8da");

const {Charge} = resources;

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

export const webhookHandler = functions.https.onRequest(async (req, res) => {
  const rawBody = req.rawBody;
  const signature = req.headers["x-cc-webhook-signature"];
  const webhookSecret = "your-webhook-secret";

  try {
    const event = Webhook.verifyEventBody(
        rawBody.toString(),
      signature as string,
      webhookSecret
    );

    if (event.type === "charge:pending") {
      functions.logger.log("pending");
    }

    if (event.type === "charge:confirmed") {
      functions.logger.log("confirmed");
    }

    if (event.type === "charge:failed") {
      functions.logger.log("no bueno");
    }

    res.send(`success ${event.id}`);
  } catch (error) {
    functions.logger.error(error);
    res.status(400).send("failure!");
  }
});
