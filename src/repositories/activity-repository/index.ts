import { prisma } from "@/config";
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

const activityRepository = {
  findActivities,
  findDays
};

export default activityRepository;
