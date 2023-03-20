import app, { init } from "@/app";
import { cleanDb, generateValidToken } from "../helpers";
import httpStatus from "http-status";
import supertest from "supertest";
import { TicketStatus } from "@prisma/client";
import {
  createUser,
  createEnrollmentWithAddress,
  createPayment,
  createTicket,
  createTicketTypeWithHotel,
} from "../factories";
import { array, object } from "joi";

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
      const user = await createUser();
      const token = await generateValidToken(user);
      const enrollment = await createEnrollmentWithAddress(user);
      // const ticketType = await createTicketTypeWithHotel();
      // const ticket = await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);
      // const payment = await createPayment(ticket.id, ticketType.price);
      const date = "2023-03-27";

      const response = await server.get(`/activities?date=${date}`).set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
    });
  });
});
