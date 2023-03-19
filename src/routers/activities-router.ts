import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { listActivities, listDays, listLocations, postSubscriptions } from "../controllers";

const activityRouter = Router();

activityRouter
  .all("/*", authenticateToken)
  .get("", listActivities)
  .get("/days", listDays)
  .get("/locations", listLocations)
  .post("/subscriptions", postSubscriptions);

export { activityRouter };
