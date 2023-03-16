import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { listActivities, listDays } from "@/controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/days", listDays)
  .post("", );

export { activityRouter };
