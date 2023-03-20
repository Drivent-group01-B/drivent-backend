import { notFoundError, unauthorizedError } from "../../errors";
import ticketRepository, { CreateTicketParams } from "../../repositories/ticket-repository";
import enrollmentRepository from "../../repositories/enrollment-repository";
import { Ticket, TicketStatus } from "@prisma/client";
import { createTicketType } from "../../factories";
import { exclude } from "../../utils/prisma-utils";


async function getTicketTypes() {
  const ticketTypes = await ticketRepository.findTicketTypes();

  if (!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function getTicketByUserId(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket) {
    throw notFoundError();
  }

  return ticket;
}

async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };

  await ticketRepository.createTicket(ticketData);

  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollment.id);

  return ticket;
}

type PartialTicketParams = Partial<Ticket>;

async function createOrUpdateTicket(userId: number, ticketParams: PartialTicketParams) {
  if (!ticketParams?.enrollmentId) {
    const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!enrollment) {
      throw notFoundError();
    }
    ticketParams.enrollmentId = enrollment.id;
  }

  if (!ticketParams?.id) {
    ticketParams.id = 0;
    ticketParams.status = TicketStatus.RESERVED;
  }

  if (ticketParams.status === "PAID") {
    throw unauthorizedError();
  }

  const ticketData: CreateTicketParams = {
    enrollmentId: ticketParams.enrollmentId,
    status: ticketParams.status,
    ticketTypeId: ticketParams.ticketTypeId,
  };

  await ticketRepository.upsert(ticketParams.id, ticketData, exclude(ticketData, "enrollmentId"));

  const ticket = await ticketRepository.findTicketByEnrollmentId(ticketParams.enrollmentId);

  return ticket;
}

const ticketService = {
  getTicketTypes,
  getTicketByUserId,
  createTicket,
  createOrUpdateTicket,
};

export default ticketService;
