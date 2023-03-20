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

async function getActivitiesByDate(date: Date, userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const data = await activityRepository.findActivitiesByDate(date, enrollment.id);

  if (!data) throw notFoundError();

  return data;
}

const activityService = {
  getActivities,
  getDays,
  getLocations,
  getActivitiesByDate,
};

export default activityService;
