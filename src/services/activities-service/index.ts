import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";

async function getActivities() {
  const activities = await activityRepository.findActivities();
  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

async function getActivitiesByDate(date: Date) {
  return await activityRepository.findActivitiesByDate(date);
}

const ActivityService = {
  getActivities,
  getActivitiesByDate,
};

export default ActivityService;
