import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";

async function getActivities() {
  const activities = await activityRepository.findActivities();
  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

async function getDays() {
  const days = await activityRepository.findDays();
  if (!days) {
    throw notFoundError();
  }

  return days;
}

const ActivityService = {
  getActivities,
  getDays
};

export default ActivityService;
