import { prisma } from "../../config";

async function findHotels() {
  return prisma.hotel.findMany({
   
  });
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: true,
    },
  });
}

async function findRoomsDetailsByHotelId(hotelId: number) {
  const rooms = await prisma.room.findMany({
    where: { Hotel: { id: hotelId } },
    select: {
      id: true,
      name: true,
      hotelId: true,
      capacity: true,
      _count: { select: { Booking: true } },
    },
    orderBy: { id: "asc" },
  });

  const availability = { total: 0, occupied: 0 };

  rooms.forEach((room) => {
    availability.total += room.capacity;
    availability.occupied += room._count.Booking;
  });

  return { availability, rooms: rooms };
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findRoomsDetailsByHotelId,
};

export default hotelRepository;
