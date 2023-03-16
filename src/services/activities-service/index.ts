import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";
import enrollmentsService from "../enrollments-service";

async function getActivities() {
  const activities = await activityRepository.findActivities();
  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

async function getActivitiesByDate(date: Date, userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const data = await activityRepository.findActivitiesByDate(date, enrollment.id);

  if (!data) throw notFoundError();

  return data;
}

const ActivityService = {
  getActivities,
  getActivitiesByDate,
};

export default ActivityService;
