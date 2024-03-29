import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { listActivities, listDays, listLocations, postSubscriptions, getSubscriptions } from "../controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/days", listDays)
  .get("/locations", listLocations)
  .post("/subscriptions", postSubscriptions)
  .get("/subscriptions/:activityId", getSubscriptions);

export { activityRouter };
