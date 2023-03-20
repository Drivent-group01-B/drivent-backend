import { Router } from "express";
import { authenticateToken } from "../middlewares";
import { getHotelRoomsDetailsByHotelId, getHotels, getHotelsWithRooms } from "../controllers";

const hotelsRouter = Router();

hotelsRouter
  .all("/*", authenticateToken)
  .get("/", getHotels)
  .get("/:hotelId", getHotelsWithRooms)
  .get("/:hotelId/rooms", getHotelRoomsDetailsByHotelId);

export { hotelsRouter };
