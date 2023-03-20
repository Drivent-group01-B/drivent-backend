import { Hotel, PrismaClient, Room } from "@prisma/client";
import dayjs from "dayjs";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: "Driven.t",
        logoImageUrl: "https://files.driveneducation.com.br/images/logo-rounded.png",
        backgroundImageUrl: "linear-gradient(to right, #FA4098, #FFD77F)",
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, "days").toDate(),
      },
    });
  }

  let ticketTypes = await prisma.ticketType.findFirst();
  if (!ticketTypes) {
    const onlineTicketType = await prisma.ticketType.create({
      data: { name: "Online", price: 100, includesHotel: false, isRemote: true },
    });

    const localTicketType = await prisma.ticketType.create({
      data: { name: "Presencial", price: 600, includesHotel: true, isRemote: false },
    });

    const localTicketTypeWithoutHotel = await prisma.ticketType.create({
      data: { name: "Presencial", price: 250, includesHotel: false, isRemote: false },
    });

    // BOLD TEXT, GREEN TEXT, "MESSAGE", RESET TERMINAL STYLES
    console.log("\x1b[1m", "\x1b[32m", `✔️ "Presencial" and "Online" ticket types created successfully 🥳 `, "\x1b[0m");
  }

  const hashedPass = await bcrypt.hash("useruser", 12);
  const newUser = await prisma.user.create({
    data: {
      email: "user@user.com",
      password: hashedPass,
    },
  });

  await prisma.enrollment.create({
    data: {
      name: "John Doe",
      cpf: "77963936014",
      birthday: dayjs("01-01-2000").toDate(),
      phone: "11987654321",
      User: { connect: { id: newUser.id } },
      Address: {
        create: {
          cep: "01304001",
          street: "Rua Augusta",
          number: "1",
          neighborhood: "Consolação",
          city: "São Paulo",
          state: "São Paulo",
        },
      },
    },
  });

  console.log("\x1b[1m", "\x1b[32m", "✔️ New user with enrollment created successfully 🥳 ", "\x1b[0m");
  console.log({ ...newUser, password: "useruser" });

  console.log({ event });

  const hotels = await prisma.hotel.findMany();
  if (hotels.length === 0) {
    let hotel_example;
    let rooms;

    hotel_example = await prisma.hotel.create({
      data: {
        name: "Driven Resort",
        image:
          "https://www.dicasdeviagem.com/wp-content/uploads/2022/05/hotel-fasano-angra-dos-reis-e1652707437760.jpg",
      },
    });

    rooms = [
      {
        name: "101",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "103",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
      {
        name: "104",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "105",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
    ];

    await prisma.room.createMany({
      data: rooms,
    });

    hotel_example = await prisma.hotel.create({
      data: {
        name: "Driven Palace",
        image:
          "https://claudia.abril.com.br/wp-content/uploads/2020/01/cinco-spas-dentro-de-hoteis-1.jpg?quality=85&strip=info",
      },
    });

    rooms = [
      {
        name: "101",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "103",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
      {
        name: "104",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "105",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
    ];

    await prisma.room.createMany({
      data: rooms,
    });

    hotel_example = await prisma.hotel.create({
      data: {
        name: "Driven World",
        image:
          "https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2019/01/zona-hoteleira-de-cancun22-t2AJq.jpg?resize=768%2C568&strip=all&ssl=1",
      },
    });

    rooms = [
      {
        name: "101",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "102",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "103",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
      {
        name: "104",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "105",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "106",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
      {
        name: "107",
        capacity: 2,
        hotelId: hotel_example?.id,
      },
      {
        name: "108",
        capacity: 1,
        hotelId: hotel_example?.id,
      },
    ];

    await prisma.room.createMany({
      data: rooms,
    });

    // BOLD TEXT, GREEN TEXT, "MESSAGE", RESET TERMINAL STYLES
    console.log("\x1b[1m", "\x1b[32m", `✔️ "hotels with rooms created successfully 🥳 `, "\x1b[0m");
  }

  const locations = await prisma.location.findMany();
  if (locations.length === 0) {
    const locations = [
      {
        name: "Auditório Principal",
      },
      {
        name: "Auditório Lateral",
      },
      {
        name: "Sala de Workshop",
      },
    ];

    await prisma.location.createMany({
      data: locations,
    });
  }

  const dates = await prisma.dateEvent.findMany();
  if (dates.length === 0) {
    const dates = [
      {
        dateEvent: new Date("03/27/2023"),
      },
      {
        dateEvent: new Date("03/28/2023"),
      },
      {
        dateEvent: new Date("03/29/2023"),
      },
    ];

    await prisma.dateEvent.createMany({
      data: dates,
    });
  }

  const activities = await prisma.activity.findMany();
  if (activities.length === 0) {
    const locations = await prisma.location.findMany();
    const event = await prisma.event.findFirst();

    if (locations?.length > 0 && event) {
      const activities = [
        {
          name: "AWS Fundamentals",
          vacancies: 4,
          start_at: new Date("2023-03-27T08:00:00Z"),
          end_at: new Date("2023-03-27T09:00:00Z"),
          eventId: event?.id,
          locationId: locations[0]?.id,
        },
        {
          name: "LOL - Montando o pc perfeito",
          vacancies: 2,
          start_at: new Date("2023-03-27T09:00:00Z"),
          end_at: new Date("2023-03-27T10:00:00Z"),
          eventId: event?.id,
          locationId: locations[0]?.id,
        },
        {
          name: "Palestra - LGPD",
          vacancies: 23,
          start_at: new Date("2023-03-28T08:00:00Z"),
          end_at: new Date("2023-03-28T10:00:00Z"),
          eventId: event?.id,
          locationId: locations[1]?.id,
        },
        {
          name: "Workshop - Empreendedorismo em TECH",
          vacancies: 2,
          start_at: new Date("2023-03-29T08:00:00Z"),
          end_at: new Date("2023-03-29T09:00:00Z"),
          eventId: event?.id,
          locationId: locations[2]?.id,
        },
        {
          name: "Workshop - Redis",
          vacancies: 10,
          start_at: new Date("2023-03-29T09:00:00Z"),
          end_at: new Date("2023-03-29T10:00:00Z"),
          eventId: event?.id,
          locationId: locations[2]?.id,
        },
      ];

      await prisma.activity.createMany({
        data: activities,
      });
    }
  }

  const schedules = await prisma.schedule.findMany();
  if (schedules.length === 0) {
    const activities = await prisma.activity.findMany();
    const dates = await prisma.dateEvent.findMany();

    if (activities?.length > 0 && dates?.length > 0) {
      const schedules = [
        {
          activityId: activities[0]?.id,
          dateId: dates[0]?.id,
        },
        {
          activityId: activities[1]?.id,
          dateId: dates[0]?.id,
        },
        {
          activityId: activities[2]?.id,
          dateId: dates[1]?.id,
        },
        {
          activityId: activities[3]?.id,
          dateId: dates[2]?.id,
        },
        {
          activityId: activities[4]?.id,
          dateId: dates[2]?.id,
        },
      ];

      await prisma.schedule.createMany({
        data: schedules,
      });
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
