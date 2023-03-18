import app, { init } from "@/app";
import { cleanDb, generateValidToken } from "../helpers";
import httpStatus from "http-status";
import supertest from "supertest";
import { Activity, TicketStatus } from "@prisma/client";
import {
  createUser,
  createEnrollmentWithAddress,
  createPayment,
  createTicket,
  createTicketTypeWithHotel,
  createEvent,
} from "../factories";
import { createActivity, createLocation } from "../factories/activities-factory";
import dayjs from "dayjs";

const server = supertest(app);

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe("GET /activities", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/booking");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("When token is valid", () => {
    it("should respond with activities data given a date", async () => {
      const event = await createEvent();

      const user = await createUser();
      const token = await generateValidToken(user);
      await createEnrollmentWithAddress(user);

      const location = await createLocation();
      const activity = await createActivity(10, event.id, location.id);
      //NAO PODE VER SE N TEM TICKET
      //NAO PODE VER SE N TEM TICKET PRESENCIAL
      //NAO PODE VER SE ELE N FINALIZOU O PAGAMENTO

      // const ticketType = await createTicketTypeWithHotel();
      // const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      // const payment = await createPayment(ticket.id, ticketType.price);

      const response = await server.get(`/activities?date=${"2023-03-18"}`).set("Authorization", `Bearer ${token}`);

      // console.log(dayjs(activity.start_at).startOf("day").toDate());

      // expect(response.status).toBe(httpStatus.OK);
      // expect(response.body).toEqual(
      //   expect.arrayContaining([
      //     expect.objectContaining({
      //       id: expect.any(Number),
      //       name: expect.any(String),
      //       vacancies: expect.any(Number),
      //       start_at: expect.any(String),
      //       end_at: expect.any(String),
      //       eventId: expect.any(Number),
      //       locationId: expect.any(Number),
      //       createdAt: expect.any(String),
      //       updatedAt: expect.any(String),
      //     }),
      //   ]),
      // );
    });
  });
});
