import enrollmentRepository from "../../repositories/enrollment-repository";
import { notFoundError, requestError } from "../../errors";
import activityRepository from "../../repositories/activity-repository";
import tikectRepository from "../../repositories/ticket-repository";
import enrollmentsService from "../enrollments-service";


async function getActivities() {
  const activities = await activityRepository.findActivities();
  if (!activities) {
    throw notFoundError();
  }

  return activities;
}

async function getDays() {
  const days = await activityRepository.findDays();
  if (!days) {
    throw notFoundError();
  }

  return days;
}

async function getLocations() {
  const locations = await activityRepository.findLocations();
  if (!locations) {
    throw notFoundError();
  }

  return locations;
}

async function postSubscriptions(userId: number, activityId: number)
{
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const ticket = await tikectRepository.findTicketByEnrollmentId(enrollment.id);
  if (!ticket || ticket.status === "RESERVED" || ticket.TicketType.isRemote) {
    throw requestError(400, "Invalid Ticket");
  }

  const activities = await activityRepository.findActivitiesById(activityId);
  if (!activities) {
    throw notFoundError();
  }
  if(activities.vacancies <= 0) {
    throw requestError(409, "Acabou as vagas");
  }
  const d = new Date(activities.end_at);
  if(d.getTime() < Date.now())
  {
    throw requestError(410, "so com uma maquina do tempo para ver essa atividade");
  }

  const subscriptions = await activityRepository.findSubscription(enrollment.id);
  if (subscriptions.length > 0) {
    for(let i = 0; i < subscriptions.length; i++) {
      if(subscriptions[i].Activity.id === activityId)
      {
        throw requestError(409, "Voce ja esta inscrito nessa atividade");
      }
      const d1 = new Date(subscriptions[i].Activity.end_at);
      const d2 = new Date(activities.start_at);
      const d3 = new Date(subscriptions[i].Activity.start_at);
      const d4 = new Date(activities.end_at);
      if((d1.getTime() > d2.getTime()) && !(d3.getTime() > d4.getTime()))
      {
        throw requestError(409, "Voce ja tem uma atividade nesse horario"); 
      }
    }
  }
  try {
    const subscription = await activityRepository.createSubscription(activityId, enrollment.id, activities.vacancies);
    return subscription;
  } catch (error) {
    console.log(error);
    throw requestError(error, error.message);
  }
}

async function getSubscriptions(userId: number, activityId: number)
{
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }

  const activities = await activityRepository.findActivitiesById(activityId);
  if (!activities) {
    throw notFoundError();
  }

  const subscription = await activityRepository.findSubscriptionByActivities(activityId, enrollment.id);
  return subscription;
}

async function getActivitiesByDate(date: Date, userId: number) {
  const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
  const data = await activityRepository.findActivitiesByDate(date, enrollment.id);

  if (!data) throw notFoundError();

  return data;
}

const activityService = {
  getActivities,
  getDays,
  getLocations,
  getActivitiesByDate,
  postSubscriptions,
  getSubscriptions
};

export default activityService;
