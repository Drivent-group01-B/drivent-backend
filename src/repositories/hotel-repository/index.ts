import { prisma } from "@/config";

async function findHotels() {
  return prisma.hotel.findMany({
    include: {
      Rooms: true,
    },
  });
}

async function findRoomsByHotelId(hotelId: number) {
  // return prisma.hotel.findFirst({
  //   where: {
  //     id: hotelId,
  //   },
  //   include: {
  //     Rooms: true,
  //   },
  // });

  const rooms = await prisma.room.findMany({
    where: { Hotel: { id: hotelId } },
    select: {
      id: true,
      name: true,
      hotelId: true,
      capacity: true,
      _count: { select: { Booking: true } },
    },
  });

  const hotel = await prisma.hotel.findUnique({
    where: { id: hotelId },
  });

  return { hotel, rooms: rooms };
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
};

export default hotelRepository;
