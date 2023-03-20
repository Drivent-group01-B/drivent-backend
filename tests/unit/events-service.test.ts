import eventRepository from "@/repositories/event-repository";
import eventsService from "@/services/events-service";

describe("events service suit tests", () => {
  it("should get info event", async () => {
    jest.spyOn(eventRepository, "findFirst").mockImplementationOnce((): any => {
      return {
        id: 1,
        title: "Drivent Workshop",
        backgroundImageUrl: "https://i.ytimg.com/vi/vik-PASUVuE/maxresdefault.jpg",
        logoImageUrl: "https://s3.amazonaws.com/gupy5/production/companies/2355/career/19612/images/2021-07-28_17-25_logo.png",
        startsAt: "2023-03-29T08:00:00Z",
        endsAt: "2023-03-31T12:00:00Z"
      };
    });

    const event = await eventsService.getFirstEvent();

    expect(event).toEqual({
      id: 1,
      title: "Drivent Workshop",
      backgroundImageUrl: "https://i.ytimg.com/vi/vik-PASUVuE/maxresdefault.jpg",
      logoImageUrl: "https://s3.amazonaws.com/gupy5/production/companies/2355/career/19612/images/2021-07-28_17-25_logo.png",
      startsAt: "2023-03-29T08:00:00Z",
      endsAt: "2023-03-31T12:00:00Z"
    });
  });

  //teste da função de checagem de início ou final do evento
});
