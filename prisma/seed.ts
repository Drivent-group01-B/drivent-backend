import { PrismaClient } from "@prisma/client";
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
      data: { name: "Presencial", price: 100, includesHotel: true, isRemote: false },
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
      },
    });

    console.log("\x1b[1m", "\x1b[32m", "✔️ New user with enrollment created successfully 🥳 ", "\x1b[0m");
    console.log({ ...newUser, password: "useruser" });
  }

  console.log({ event });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
