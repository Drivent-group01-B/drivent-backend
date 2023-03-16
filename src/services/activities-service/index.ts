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

async function getLocations() {
  const locations = await activityRepository.findLocations();
  if (!locations) {
    throw notFoundError();
  }

  return locations;
}

const ActivityService = {
  getActivities,
  getDays,
  getLocations
};

export default ActivityService;
