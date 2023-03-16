import { AuthenticatedRequest } from "@/middlewares";
import ActivityService from "@/services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  const date = req.query?.date as string;
  const { userId } = req;

  try {
    if (date) {
      const parsedDate = new Date(date);
      const activities = await ActivityService.getActivitiesByDate(parsedDate, userId);
      return res.send(activities);
    }

    const activities = await ActivityService.getActivities();
    return res.send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
