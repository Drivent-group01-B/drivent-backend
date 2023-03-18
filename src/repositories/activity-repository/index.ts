import { prisma } from "../../config";
import { Activity } from "@prisma/client";

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      Location: true,
      Schedule: {
        include: {
          DateEvent: true
        }
      }
    }
  });
}

async function findDays() {
  return prisma.dateEvent.findMany();
}

async function findLocations() {
  return prisma.location.findMany();
}

const activityRepository = {
  findActivities,
  findDays,
  findLocations
};

export default activityRepository;
