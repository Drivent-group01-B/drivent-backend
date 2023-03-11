import eventsService from "@/services/events-service";
import { Request, Response } from "express";
import httpStatus from "http-status";
import { redis } from "@/app";


export async function getDefaultEvent(_req: Request, res: Response) {
  const cacheKey = 'event';
  try {
    const cachedEvents = await redis.get(cacheKey);

    if(cachedEvents){
      return res.status(httpStatus.OK).send(JSON.parse(cachedEvents));
    }

    const event = await eventsService.getFirstEvent();
    redis.set(cacheKey, JSON.stringify(event));

    return res.status(httpStatus.OK).send(event);
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).send({});
  }
}
