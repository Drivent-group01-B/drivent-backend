import enrollmentRepository from "@/repositories/enrollment-repository";
import paymentRepository from "@/repositories/payment-repository";
import ticketRepository from "@/repositories/ticket-repository";
import paymentService from "@/services/payments-service";
import faker from "@faker-js/faker";

describe("payments service suit tests", () => {
  it("should get payment by ticket id", async () => {
    jest.spyOn(paymentRepository, "findPaymentByTicketId").mockImplementationOnce((): any => {
      return {
        id: 1,
        ticketId: 1,
        value: 600,
        cardIssuer: "visa",
        cardLastDigits: 345,
        createdAt: "2023-03-07T12:00:00Z",
        updatedAt: "2023-03-07T12:00:00Z",
      };
    });

    const payment = await paymentRepository.findPaymentByTicketId(1);

    expect(payment).toEqual({
      id: 1,
      ticketId: 1,
      value: 600,
      cardIssuer: "visa",
      cardLastDigits: 345,
      createdAt: "2023-03-07T12:00:00Z",
      updatedAt: "2023-03-07T12:00:00Z",
    });
  });

  it("should process payment with ticket id and credit card data", async () => {
    jest.spyOn(ticketRepository, "findTickeyById").mockImplementationOnce((): any => {
      return {
        id: 1,
        status: "RESERVED",
        ticketTypeId: 2,
        enrollmentId: 1,
        createdAt: "2023-03-05T12:00:00Z",
        updatedAt: "2023-03-05T12:00:00Z",
      };
    });
    jest.spyOn(enrollmentRepository, "findById").mockImplementationOnce((): any => {
      return {
        id: 1,
        userId: 1,
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
    jest.spyOn(ticketRepository, "findTickeWithTypeById").mockImplementationOnce((): any => {
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
          createdAt: "2023-03-01T12:00:00Z",
          updatedAt: "2023-03-01T12:00:00Z",
        },
        createdAt: "2023-03-05T12:00:00Z",
        updatedAt: "2023-03-05T12:00:00Z",
      };
    });
    jest.spyOn(paymentRepository, "createPayment").mockImplementationOnce((): any => {
      return {
        id: 1,
        ticketId: 1,
        value: 600,
        cardIssuer: "visa",
        cardLastDigits: 345,
        createdAt: "2023-03-07T12:00:00Z",
        updatedAt: "2023-03-07T12:00:00Z",
      };
    });
    jest.spyOn(ticketRepository, "ticketProcessPayment").mockImplementationOnce((): any => {
      return {
        id: 1,
        status: "PAID",
        ticketTypeId: 2,
        enrollmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    });
   
    const payment = await paymentService.paymentProcess(1, 1, {
      number: +faker.finance.creditCardNumber(),
      issuer: faker.finance.creditCardIssuer(),
      name: faker.name.findName(),
      cvv: +faker.finance.creditCardCVV(),
      expirationDate: faker.date.future()
    });
    expect(payment).toEqual({
      id: 1,
      ticketId: 1,
      value: 600,
      cardIssuer: "visa",
      cardLastDigits: 345,
      createdAt: "2023-03-07T12:00:00Z",
      updatedAt: "2023-03-07T12:00:00Z",
    });
  });
});
