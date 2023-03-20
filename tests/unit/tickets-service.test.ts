import enrollmentRepository from "@/repositories/enrollment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import ticketService from "@/services/tickets-service";

describe("tickets service suit tests", () => {
  it("should get ticket types data", async () => {
    jest.spyOn(ticketRepository, "findTicketTypes").mockImplementationOnce((): any => {
      return [
        { id: 1, name: "Online", price: 100, includesHotel: false, isRemote: true },
        { id: 2, name: "Presencial", price: 250, includesHotel: false, isRemote: false },
        { id: 3, name: "Presencial", price: 600, includesHotel: true, isRemote: false }
      ];
    });

    const ticketTypes = await ticketService.getTicketTypes();

    expect(ticketTypes).toEqual([
      { id: 1, name: "Online", price: 100, includesHotel: false, isRemote: true },
      { id: 2, name: "Presencial", price: 250, includesHotel: false, isRemote: false },
      { id: 3, name: "Presencial", price: 600, includesHotel: true, isRemote: false }
    ]);
  });

  it("should get ticket with id of the user ", async () => {
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
        status: "RESERVED",
        ticketTypeId: 2,
        enrollmentId: 1,
        TicketType: {
          id: 3,
          name: "Presencial",
          price: 600,
          isRemote: false,
          includesHotel: true,
          createdAt: "2023-03-03T12:00:00Z",
          updatedAt: "2023-03-03T12:00:00Z",
        },
        createdAt: "2023-03-07T12:00:00Z",
        updatedAt: "2023-03-07T12:00:00Z",
      };
    });

    const ticket = await ticketService.getTicketByUserId(1);

    expect(ticket).toEqual(
      {
        id: 1,
        status: "RESERVED",
        ticketTypeId: 2,
        enrollmentId: 1,
        TicketType: {
          id: 3,
          name: "Presencial",
          price: 600,
          isRemote: false,
          includesHotel: true,
          createdAt: "2023-03-03T12:00:00Z",
          updatedAt: "2023-03-03T12:00:00Z",
        },
        createdAt: "2023-03-07T12:00:00Z",
        updatedAt: "2023-03-07T12:00:00Z",
      }
    );
  });

  //upsert do ticket
});
