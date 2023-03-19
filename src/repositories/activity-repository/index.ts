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

async function findDays() {
  return prisma.dateEvent.findMany();
}

async function findLocations() {
  return prisma.location.findMany();
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
      _count: { select: { Subscription: true } },
    },
  });

  return activities.map(({ Subscription, _count, vacancies, ...rest }) => ({
    ...rest,
    subscribed: Subscription.length > 0,
    availableVacancies: vacancies - _count.Subscription,
  }));
}

const activityRepository = {
  findActivities,
  findDays,
  findLocations,
  findActivitiesByDate,
};

export default activityRepository;
