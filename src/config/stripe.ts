import { loadStripe } from "@stripe/stripe-js";

import dotenv from "dotenv";
dotenv.config();

export const stripeClient = loadStripe(process.env.STRIPE_SECRET_KEY);
