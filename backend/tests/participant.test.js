process.env.NODE_ENV = "test";

import { jest } from "@jest/globals";
import {
  getAll,
  getByIdTAndIdP,
  create,
  deleteByIdTAndIdP,
} from "../controllers/participant.controller.js";
import { Participant, Person, Tournament } from "../models/index.js";
import { env } from "../configs/config.js";

const person1 = {
  firstname: "firstname1",
  lastname: "lastname1",
  email: "email1@email.email",
};
const foundPerson1 = Person.build({
  id: 1,
  ...person1,
  phone: "0123456789",
  password: env.DEFAULT_USER_PASSWORD,
  subscription: new Date(),
  EMANumber: "01234567",
  role: "user",
});
const person2 = {
  firstname: "firstname2",
  lastname: "lastname2",
  email: "email2@email.email",
};
const tournament = {
  name: "tournament1",
  startDate: new Date(),
  endDate: new Date(),
};

const participant1 = {
  PersonId: 1,
  TournamentId: 1,
  Tournament: tournament,
  Person: person1,
};
const participant2 = {
  PersonId: 2,
  TournamentId: 1,
  Tournament: tournament,
  Person: person2,
};
const foundParticipant = Participant.build({
  PersonId: participant1.PersonId,
  TournamentId: participant1.TournamentId,
});

const allParticipants = [participant1, participant2];

/**
 * GETALL
 */

describe("Tests for getAll", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  beforeEach(() => {
    Participant.findAll = jest.fn();
    Participant.findAll.mockImplementation(() => {
      return allParticipants;
    });
  });

  it("Found participants : should return status 200 with an array", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    await getAll(req, res);
    expect(Participant.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allParticipants);
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    Participant.findAll.mockRejectedValue(new Error("Unexpected error"));
    await getAll(req, res);
    expect(Participant.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching participant",
    });
  });
});

/**
 * GETBYID
 */

describe("Tests for getById", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const mockedRequest = () => {
    return { params: { PersonId: 1, TournamentId: 1 } };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Participant.findOne = jest.fn();
    Participant.findOne.mockImplementation(() => {
      return participant1;
    });
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return person1;
    });
    Tournament.findByPk = jest.fn();
    Tournament.findByPk.mockImplementation(() => {
      return tournament;
    });
  });

  it("Found participant : should return status 200 with the found participant", async () => {
    await getByIdTAndIdP(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(participant1);
  });

  it("Not found tournament : should return status 404 with a specific message", async () => {
    Tournament.findByPk.mockImplementation(() => {
      return null;
    });
    await getByIdTAndIdP(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).not.toHaveBeenCalled();
    expect(Participant.findOne).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament not found",
    });
  });

  it("Not found person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await getByIdTAndIdP(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Not found participant : should return status 404 with a specific message", async () => {
    Participant.findOne.mockImplementation(() => {
      return null;
    });
    await getByIdTAndIdP(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Participant not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Participant.findOne.mockRejectedValue(new Error("Unexpected error"));
    await getByIdTAndIdP(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching participant",
    });
  });
});

/**
 * CREATE
 */

describe("Tests for create", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const body = {
    PersonId: participant1.PersonId,
    TournamentId: participant1.TournamentId,
  };
  const userMockedRequest = () => {
    return { body, user: { id: 1 } };
  };
  const userReq = userMockedRequest();
  const adminMockedRequest = () => {
    return { body, user: { role: "admin" } };
  };
  const adminReq = adminMockedRequest();

  beforeEach(() => {
    Participant.create = jest.fn();
    Participant.create.mockImplementation((args) => {
      return Participant.build(args).dataValues;
    });
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return foundPerson1;
    });
    Tournament.findByPk = jest.fn();
    Tournament.findByPk.mockImplementation(() => {
      return tournament;
    });
  });

  it("Valid participant as user : should return status 201 and a confirmation message", async () => {
    await create(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.create).toHaveBeenCalledTimes(1);
    expect(Participant.create).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Participant has been created",
      participant: body,
    });
  });

  it("Valid participant as admin : should return status 201 and a confirmation message", async () => {
    await create(adminReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.create).toHaveBeenCalledTimes(1);
    expect(Participant.create).toHaveBeenCalledWith(body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Participant has been created",
      participant: body,
    });
  });

  it("Not found tournament : should return status 404 with a specific message", async () => {
    Tournament.findByPk.mockImplementation(() => {
      return null;
    });
    await create(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).not.toHaveBeenCalled();
    expect(Participant.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament not found",
    });
  });

  it("Not found person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await create(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Participant.create.mockRejectedValue(new Error("Unexpected error"));
    await create(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in creating participant",
    });
  });
});

/**
 * DELETE
 */
describe("Tests for delete", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const userMockedRequest = () => {
    return { params: { idT: 1, idP: 1 }, user: { id: 1 } };
  };
  const userReq = userMockedRequest();
  const adminMockedRequest = () => {
    return { params: { idT: 1, idP: 1 }, user: { role: "admin" } };
  };
  const adminReq = adminMockedRequest();
  const wrongUserMockedRequest = () => {
    return { params: { idT: 1, idP: 1 }, user: { id: 2 } };
  };
  const wrongUserReq = wrongUserMockedRequest();

  beforeEach(() => {
    Participant.findOne = jest.fn();
    Participant.findOne.mockImplementation(() => {
      return foundParticipant;
    });
    foundParticipant.destroy = jest.fn();
    Tournament.findByPk = jest.fn();
    Tournament.findByPk.mockImplementation(() => {
      return tournament;
    });
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return foundPerson1;
    });
  });

  it("Deleted participant as self user : should return status 200 with a message", async () => {
    await deleteByIdTAndIdP(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(foundParticipant.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Participant has been deleted",
    });
  });

  it("Deleted participant as admin : should return status 200 with a message", async () => {
    await deleteByIdTAndIdP(adminReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(foundParticipant.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Participant has been deleted",
    });
  });

  it("Not participant user : should return status 403 with a specific message", async () => {
    await deleteByIdTAndIdP(wrongUserReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(foundParticipant.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unable to delete participant with your privilege",
    });
  });

  it("Not found tournament : should return status 404 with a specific message", async () => {
    Tournament.findByPk.mockImplementation(() => {
      return null;
    });
    await deleteByIdTAndIdP(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).not.toHaveBeenCalled();
    expect(Participant.findOne).not.toHaveBeenCalled();
    expect(foundParticipant.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament not found",
    });
  });

  it("Not found person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await deleteByIdTAndIdP(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).not.toHaveBeenCalled();
    expect(foundParticipant.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundParticipant.destroy.mockRejectedValue(new Error("Unexpected error"));
    await deleteByIdTAndIdP(userReq, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Participant.findOne).toHaveBeenCalledTimes(1);
    expect(foundParticipant.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in deleting participant",
    });
  });
});
