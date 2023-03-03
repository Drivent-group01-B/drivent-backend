import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getPaymentByTicketId, paymentIntent, paymentProcess } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getPaymentByTicketId)
  .post("/process", paymentProcess)
  .post("/create-payment-intent", paymentIntent);

export { paymentsRouter };
