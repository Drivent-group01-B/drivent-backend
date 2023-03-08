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
      data: { name: "Online", price: 100, includesHotel: false, isRemote: true, hotelTax: 0 },
    });

    const localTicketType = await prisma.ticketType.create({
      data: { name: "Presencial", price: 100, includesHotel: true, isRemote: false, hotelTax: 350 },
    });

    // BOLD TEXT, GREEN TEXT, "MESSAGE", RESET TERMINAL STYLES
    console.log("\x1b[1m", "\x1b[32m", `✔️ "Presencial" and "Online" ticket types created successfully 🥳 `, "\x1b[0m");
  }

  let user = await prisma.user.findFirst({ include: { Enrollment: true } });
  if (!user?.Enrollment) {
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
  }

  console.log({ event });

  const hotels = await prisma.hotel.findMany();
  if (hotels.length === 0) {

    let hotel_example;
    let rooms;
   
    hotel_example = await prisma.hotel.create({
      data: { name: "Driven Resort", image: "https://www.dicasdeviagem.com/wp-content/uploads/2022/05/hotel-fasano-angra-dos-reis-e1652707437760.jpg"},
    });

    rooms = [
      {
        name: '101',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '102',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '103',
        capacity: 1,
        hotelId: hotel_example?.id
      },
      {
        name: '104',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '105',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '106',
        capacity: 1,
        hotelId: hotel_example?.id
      },
      {
        name: '107',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '108',
        capacity: 1,
        hotelId: hotel_example?.id
      },
    ];

    await prisma.room.createMany({
      data: rooms
    });

    hotel_example = await prisma.hotel.create({
      data: { name: "Driven Palace", image: "https://claudia.abril.com.br/wp-content/uploads/2020/01/cinco-spas-dentro-de-hoteis-1.jpg?quality=85&strip=info" },
    });

    rooms = [
      {
        name: '101',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '102',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '103',
        capacity: 1,
        hotelId: hotel_example?.id
      },
      {
        name: '104',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '105',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '106',
        capacity: 1,
        hotelId: hotel_example?.id
      },
      {
        name: '107',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '108',
        capacity: 1,
        hotelId: hotel_example?.id
      },
    ];

    await prisma.room.createMany({
      data: rooms
    });

    hotel_example = await prisma.hotel.create({
      data: { name: "Driven World", image: "https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2019/01/zona-hoteleira-de-cancun22-t2AJq.jpg?resize=768%2C568&strip=all&ssl=1" },
    });

    rooms = [
      {
        name: '101',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '102',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '103',
        capacity: 1,
        hotelId: hotel_example?.id
      },
      {
        name: '104',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '105',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '106',
        capacity: 1,
        hotelId: hotel_example?.id
      },
      {
        name: '107',
        capacity: 2,
        hotelId: hotel_example?.id
      },
      {
        name: '108',
        capacity: 1,
        hotelId: hotel_example?.id
      },
    ];

    await prisma.room.createMany({
      data: rooms
    });


    // BOLD TEXT, GREEN TEXT, "MESSAGE", RESET TERMINAL STYLES
    console.log("\x1b[1m", "\x1b[32m", `✔️ "hotels with rooms created successfully 🥳 `, "\x1b[0m");
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
