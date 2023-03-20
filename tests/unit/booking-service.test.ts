import bookingRepository from "@/repositories/booking-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";
import roomRepository from "@/repositories/room-repository";
import ticketRepository from "@/repositories/ticket-repository";
import bookingService from "@/services/booking-service";

describe("events service suit tests", () => {
  it("should get booking by user id", async () => {
    jest.spyOn(bookingRepository, "findByUserId").mockImplementationOnce((): any => {
      return {
        id: 1,
        Room: {
          id: 1,
          name: "101",
          capacity: 2,
          hotelId: 1,
          createdAt: "2023-03-03T08:00:00Z",
          updatedAt: "2023-03-03T08:00:00Z"
        },
      };
    });

    const booking = await bookingService.getBooking(1);

    expect(booking).toEqual({
      id: 1,
      Room: {
        id: 1,
        name: "101",
        capacity: 2,
        hotelId: 1,
        createdAt: "2023-03-03T08:00:00Z",
        updatedAt: "2023-03-03T08:00:00Z"
      },
    });
  });

  it("should book room", async () => {
    jest.spyOn(enrollmentRepository, "findWithAddressByUserId").mockImplementationOnce((): any => {
      return {
        id: 1,
        name: "Lucas Peixoto",
        cpf: "962.434.270-99",
        birthday: "2001-03-31T12:00:00Z",
        phone: "11981567867",
        address: {
          id: 1,
          cep: "02040-070",
          street: "Rua Barra de São João",
          city: "São Paulo",
          state: "ce",
          number: "876",
          neighborhood: "Jardim São Paulo",
          addressDetail: "",
        },
      };
    });
  
    jest.spyOn(ticketRepository, "findTicketByEnrollmentId").mockImplementationOnce((): any => {
      return {
        id: 1,
        status: "PAID",
        ticketTypeId: 2,
        enrollmentId: 1,
        TicketType: {
          id: 3,
          name: "Presencial",
          price: 600,
          isRemote: false,
          includesHotel: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });

    jest.spyOn(roomRepository, "findById").mockImplementationOnce((): any => {
      return {
        id: 1,
        name: "101",
        capacity: 2,
        hotelId: 1,
        createdAt: "2001-03-07T12:00:00Z",
        updatedAt: "2001-03-07T12:00:00Z"
      };
    });

    jest.spyOn(bookingRepository, "findByRoomId").mockImplementationOnce((): any => {
      return [
        { 
          id: 1,
          Room: {
            id: 1,
            name: "101",
            capacity: 2,
            hotelId: 1,
            createdAt: "2023-03-12T08:00:00Z",
            updatedAt: "2023-03-12T08:00:00Z"
          },
        }];
    });

    jest.spyOn(bookingRepository, "create").mockImplementationOnce((): any => {
      return { 
        id: 1,
        Room: {
          id: 1,
          name: "101",
          capacity: 2,
          hotelId: 1,
          createdAt: "2023-03-12T08:00:00Z",
          updatedAt: "2023-03-12T08:00:00Z"
        },
      };
    });

    const booking = await bookingService.bookingRoomById(1, 1);

    expect(booking).toEqual({
      id: 1,
      Room: {
        id: 1,
        name: "101",
        capacity: 2,
        hotelId: 1,
        createdAt: "2023-03-12T08:00:00Z",
        updatedAt: "2023-03-12T08:00:00Z"
      },
    });
  });
});

