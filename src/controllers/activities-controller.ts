import { AuthenticatedRequest } from "../middlewares";
import ActivityService from "../services/activities-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function listActivities(req: AuthenticatedRequest, res: Response) {
  try {
    const activities = await ActivityService.getActivities();
    return res.status(httpStatus.OK).send(activities);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function listDays(req: AuthenticatedRequest, res: Response) {
  try {
    const days = await ActivityService.getDays();
    return res.status(httpStatus.OK).send(days);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function listLocations(req: AuthenticatedRequest, res: Response) {
  try {
    const locations = await ActivityService.getLocations();
    return res.status(httpStatus.OK).send(locations);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postSubscriptions(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { activityId } = req.body;
    if (!activityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const subscription = await ActivityService.postSubscriptions(userId, Number(activityId));
    return res.status(httpStatus.CREATED).send(subscription);
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
}

export async function getSubscriptions(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const activityId= Number(req.params.activityId);
    if (!activityId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
    const subscription = await ActivityService.getSubscriptions(userId, Number(activityId));
    return res.status(httpStatus.OK).send(subscription);
  } catch (error) {
    return res.status(error.status).send(error.message);
  }
}

