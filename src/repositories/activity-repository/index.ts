import { prisma } from "../../config";
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

async function createSubscription(activityId: number, enrollmentId: number, vacancies: number) {
  const [sub, a] = await prisma.$transaction([
    prisma.subscription.create({
      data: {
        activityId: activityId,
        enrollmentId: enrollmentId
      }
    }),
    prisma.activity.update({
      where: { id: activityId },
      data: {
        vacancies: vacancies - 1,
      }
    })
  ]);
  return sub;
}

async function findSubscription(enrollmentId: number) {
  return prisma.subscription.findMany({
    where: {
      enrollmentId: enrollmentId,
    },
    include: {
      Activity: true,
    }
  });
}

async function findSubscriptionByActivities(activityId: number, enrollmentId: number) {
  return prisma.subscription.findFirst({
    where: {
      enrollmentId: enrollmentId,
      activityId: activityId,
    },
    include: {
      Activity: true,
    }
  });
}

async function findActivitiesById(id: number) 
{
  return prisma.activity.findUnique({
    where: { id },
  });

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
  findSubscription,
  findActivitiesById,
  createSubscription,
  findSubscriptionByActivities
  findActivitiesByDate,

};

export default activityRepository;
