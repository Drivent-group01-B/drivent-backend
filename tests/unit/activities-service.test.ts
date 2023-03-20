import activityRepository from "@/repositories/activity-repository";
import activityService from "@/services/activities-service";
import enrollmentsService from "@/services/enrollments-service";

describe("activities service suit tests", () => {
  it("should get activities data", async () => {
    jest.spyOn(activityRepository, "findActivities").mockImplementationOnce((): any => {
      return [
        {
          "id": 1,
          "name": "AWS Fundamentals",
          "vacancies": 4,
          "start_at": "2023-03-27T08:00:00.000Z",
          "end_at": "2023-03-27T09:00:00.000Z",
          "eventId": 1,
          "locationId": 1,
          "createdAt": "2023-03-15T07:00:34.864Z",
          "updatedAt": "2023-03-15T07:00:34.865Z",
          "Location": {
            "id": 1,
            "name": "Auditório Principal",
            "createdAt": "2023-03-15T06:53:27.619Z",
            "updatedAt": "2023-03-15T06:53:27.620Z"
          },
          "Schedule": [
            {
              "id": 1,
              "activityId": 1,
              "dateId": 1,
              "createdAt": "2023-03-15T07:00:34.905Z",
              "updatedAt": "2023-03-15T07:00:34.906Z",
              "DateEvent": {
                "id": 1,
                "dateEvent": "2023-03-27T03:00:00.000Z",
                "createdAt": "2023-03-15T06:53:27.644Z",
                "updatedAt": "2023-03-15T06:53:27.645Z"
              }
            }
          ]
        },
      ];
    });

    const activities = await activityService.getActivities();

    expect(activities).toEqual([
      {
        "id": 1,
        "name": "AWS Fundamentals",
        "vacancies": 4,
        "start_at": "2023-03-27T08:00:00.000Z",
        "end_at": "2023-03-27T09:00:00.000Z",
        "eventId": 1,
        "locationId": 1,
        "createdAt": "2023-03-15T07:00:34.864Z",
        "updatedAt": "2023-03-15T07:00:34.865Z",
        "Location": {
          "id": 1,
          "name": "Auditório Principal",
          "createdAt": "2023-03-15T06:53:27.619Z",
          "updatedAt": "2023-03-15T06:53:27.620Z"
        },
        "Schedule": [
          {
            "id": 1,
            "activityId": 1,
            "dateId": 1,
            "createdAt": "2023-03-15T07:00:34.905Z",
            "updatedAt": "2023-03-15T07:00:34.906Z",
            "DateEvent": {
              "id": 1,
              "dateEvent": "2023-03-27T03:00:00.000Z",
              "createdAt": "2023-03-15T06:53:27.644Z",
              "updatedAt": "2023-03-15T06:53:27.645Z"
            }
          }
        ]
      },
    ]);
  });

  it("should get days of the event", async () => {
    jest.spyOn(activityRepository, "findDays").mockImplementationOnce((): any => {
      return [
        {
          "id": 1,
          "dateEvent": "2023-03-27T03:00:00.000Z",
          "createdAt": "2023-03-15T06:53:27.644Z",
          "updatedAt": "2023-03-15T06:53:27.645Z"
        },
      ];
    });

    const activities = await activityService.getDays();

    expect(activities).toEqual([
      {
        "id": 1,
        "dateEvent": "2023-03-27T03:00:00.000Z",
        "createdAt": "2023-03-15T06:53:27.644Z",
        "updatedAt": "2023-03-15T06:53:27.645Z"
      },
    ]);
  });

  it("should get locations of the event", async () => {
    jest.spyOn(activityRepository, "findLocations").mockImplementationOnce((): any => {
      return [
        {
          "id": 1,
          "name": "Auditório Principal",
          "createdAt": "2023-03-15T06:53:27.619Z",
          "updatedAt": "2023-03-15T06:53:27.620Z"
        },
      ];
    });

    const activities = await activityService.getLocations();

    expect(activities).toEqual([
      {
        "id": 1,
        "name": "Auditório Principal",
        "createdAt": "2023-03-15T06:53:27.619Z",
        "updatedAt": "2023-03-15T06:53:27.620Z"
      },
    ]);
  });

  it("should get activities by date", async () => {
    jest.spyOn(enrollmentsService, "getOneWithAddressByUserId").mockImplementationOnce((): any => {
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

    jest.spyOn(activityRepository, "findActivitiesByDate").mockImplementationOnce((): any => {
      return [
        {
          "id": 2,
          "name": "LOL - Montando o pc perfeito",
          "start_at": "2023-03-27T09:00:00.000Z",
          "end_at": "2023-03-27T10:00:00.000Z",
          "eventId": 1,
          "locationId": 1,
          "createdAt": "2023-03-15T07:00:34.864Z",
          "updatedAt": "2023-03-15T07:00:34.866Z",
          "subscribed": false,
          "availableVacancies": 2
        },
      ];
    });

    const activities = await activityService.getActivitiesByDate(new Date("2023-03-27"), 1);

    expect(activities).toEqual([
      {
        "id": 2,
        "name": "LOL - Montando o pc perfeito",
        "start_at": "2023-03-27T09:00:00.000Z",
        "end_at": "2023-03-27T10:00:00.000Z",
        "eventId": 1,
        "locationId": 1,
        "createdAt": "2023-03-15T07:00:34.864Z",
        "updatedAt": "2023-03-15T07:00:34.866Z",
        "subscribed": false,
        "availableVacancies": 2
      },
    ]);
  });

  //teste da função de checagem de início ou final do evento
});
