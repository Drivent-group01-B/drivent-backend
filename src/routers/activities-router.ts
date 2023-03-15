import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .post("", );

export { activityRouter };
