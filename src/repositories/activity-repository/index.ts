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

async function findActivitiesByDate(date: Date, enrollmentId: number) {
  const dateAfter = dayjs(date).add(1, "day");

  const activities = await prisma.activity.findMany({
    where: {
      Schedule: {
        some: {
          DateEvent: {
            dateEvent: { lt: new Date(dateAfter.toISOString()), gte: date },
          },
        },
      },
    },
    include: {
      Subscription: { where: { Enrollment: { id: enrollmentId } } },
    },
  });

  return activities.map(({ Subscription, ...rest }) => ({ ...rest, subscribed: Subscription.length > 0 }));
}

const activityRepository = {
  findActivities,
  findActivitiesByDate,
};

export default activityRepository;
