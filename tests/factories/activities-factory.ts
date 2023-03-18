import { prisma } from "@/config";
import faker from "@faker-js/faker";
import { Location } from "@prisma/client";
import dayjs from "dayjs";

export async function createLocation() {
  return await prisma.location.create({
    data: {
      name: faker.address.ordinalDirection(),
    },
  });
}

export async function createManyLocations(howMany: number) {
  const data = Array.from({ length: howMany }).map((_) => {
    return {
      name: faker.address.state(),
    };
  });

  return await prisma.location.createMany({
    data: data,
  });
}

export async function createActivity(vacancies: number, eventId: number, locationId: number) {
  const startAt = dayjs(new Date())
    .startOf("day")
    .add(faker.datatype.number({ min: 9, max: 15 }), "h");
  const endAt = dayjs(startAt).add(faker.datatype.number({ min: 1, max: 3 }), "h");

  return await prisma.activity.create({
    data: {
      name: faker.company.catchPhrase(),
      start_at: startAt.toISOString(),
      end_at: endAt.toISOString(),
      vacancies: vacancies,
      eventId: eventId,
      locationId: locationId,
    },
  });
}
