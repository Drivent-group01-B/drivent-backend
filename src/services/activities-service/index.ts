import { notFoundError } from "@/errors";
import activityRepository from "@/repositories/activity-repository";

async function getActivities() {
  const activities = await activityRepository.findActivities();
  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

const ActivityService = {
  getActivities
};

export default ActivityService;
