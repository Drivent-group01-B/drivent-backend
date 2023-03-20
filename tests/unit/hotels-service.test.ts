import hotelService from "@/services/hotels-service";
import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import hotelRepository from "@/repositories/hotel-repository";

describe("events service suit tests", () => {
  it("should get list of hotels", async () => {
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

    jest.spyOn(hotelRepository, "findHotels").mockImplementationOnce((): any => {
      return [
        {
          id: 1,
          name: "Driven Resort",
          image: "https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2019/01/zona-hoteleira-de-cancun22-t2AJq.jpg?resize=768%2C568&strip=all&ssl=1",
          createdAt: "2023-03-02T08:00:00Z",
          updatedAt: "2023-03-02T08:00:00Z"
        }
      ];
    });

    const hotels = await hotelService.getHotels(1);

    expect(hotels).toEqual([
      {
        id: 1,
        name: "Driven Resort",
        image: "https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2019/01/zona-hoteleira-de-cancun22-t2AJq.jpg?resize=768%2C568&strip=all&ssl=1",
        createdAt: "2023-03-02T08:00:00Z",
        updatedAt: "2023-03-02T08:00:00Z"
      }
    ]);
  });

  it("should get list of hotels", async () => {
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

    jest.spyOn(hotelRepository, "findHotels").mockImplementationOnce((): any => {
      return [
        {
          id: 1,
          name: "Driven Resort",
          image: "https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2019/01/zona-hoteleira-de-cancun22-t2AJq.jpg?resize=768%2C568&strip=all&ssl=1",
          createdAt: "2023-03-02T08:00:00Z",
          updatedAt: "2023-03-02T08:00:00Z"
        }
      ];
    });

    const hotels = await hotelService.getHotels(1);

    expect(hotels).toEqual([
      {
        id: 1,
        name: "Driven Resort",
        image: "https://i0.wp.com/www.guiamexico.com.br/wp-content/uploads/2019/01/zona-hoteleira-de-cancun22-t2AJq.jpg?resize=768%2C568&strip=all&ssl=1",
        createdAt: "2023-03-02T08:00:00Z",
        updatedAt: "2023-03-02T08:00:00Z"
      }
    ]);
  });
  // falta getHotelsWithRooms e getHotelsWithRoomsAndDetails
});
