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

const activityRepository = {
  findActivities
};

export default activityRepository;
