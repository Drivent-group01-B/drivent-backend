import { prisma } from "@/config";
import dayjs from "dayjs";

async function findActivities() {
  return prisma.activity.findMany({
    include: {
      Location: true,
      Schedule: {
        include: {
          DateEvent: true,
        },
      },
    },
  });
}

async function findActivitiesByDate(date: Date) {
  const dateAfter = dayjs(date).add(1, "day");

  const data = await prisma.activity.findMany({
    where: {
      Schedule: {
        some: {
          DateEvent: {
            dateEvent: { lt: new Date(dateAfter.toISOString()), gte: date },
          },
        },
      },
    },
  });

  return data;
}

const activityRepository = {
  findActivities,
  findActivitiesByDate,
};

export default activityRepository;
