process.env.NODE_ENV = "test";

import { jest } from "@jest/globals";
import {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} from "../controllers/tournament.controller.js";
import { Tournament } from "../models/index.js";

const today = new Date();
const oneDay = 60 * 60 * 24 * 1000;
const tomorrow = new Date(today.getTime() + oneDay);
const yesterday = new Date(today.getTime() - oneDay);

const tournament1 = {
  name: "tournament 1",
  description: "description 1",
  setup: "setup 1",
  startDate: today,
  endDate: tomorrow,
  entryFee: "10.50",
  registerLimitDate: yesterday,
  playerLimit: "8",
  location: "location 1",
};
const foundTournament1 = Tournament.build({ ...tournament1, id: 1 });

const tournament2 = {
  name: "tournament 2",
  description: "description 2",
  setup: "setup 2",
  startDate: today,
  endDate: tomorrow,
  entryFee: "10.50",
  registerLimitDate: yesterday,
  playerLimit: "8",
  location: "location 2",
};
const foundTournament2 = Tournament.build({ ...tournament2, id: 2 });

const allTournaments = [foundTournament1, foundTournament2];

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

  const mockedRequest = () => {
    return {};
  };
  const req = mockedRequest();

  beforeEach(() => {
    Tournament.findAll = jest.fn();
    Tournament.findAll.mockImplementation(() => {
      return allTournaments;
    });
  });

  it("Found tournaments : should return status 200 with an array", async () => {
    await getAll(req, res);
    expect(Tournament.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allTournaments);
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Tournament.findAll.mockRejectedValue(new Error("Unexpected error"));
    await getAll(req, res);
    expect(Tournament.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching tournament",
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
    return { params: { id: 1 } };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Tournament.findByPk = jest.fn();
    Tournament.findByPk.mockImplementation(() => {
      return tournament1;
    });
  });

  it("Found tournament : should return status 200 with the found tournament", async () => {
    await getById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(tournament1);
  });

  it("Not found tournament : should return status 404 with a specific message", async () => {
    Tournament.findByPk.mockImplementation(() => {
      return null;
    });
    await getById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Tournament.findByPk.mockRejectedValue(new Error("Unexpected error"));
    await getById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching tournament",
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

  beforeEach(() => {
    Tournament.create = jest.fn();
    Tournament.create.mockImplementation((args) => {
      args.id = 1;
      return Tournament.build(args);
    });
    Tournament.findOne = jest.fn();
  });

  it("Valid tournament : should return status 201 and a confirmation message", async () => {
    const mockedRequest = () => {
      return { body: tournament1 };
    };
    const newTournament = {
      ...tournament1,
      id: 1,
    };
    const req = mockedRequest();
    await create(req, res);
    expect(Tournament.create).toHaveBeenCalledTimes(1);
    expect(Tournament.create).toHaveBeenCalledWith({ ...newTournament });
    expect(res.status).toHaveBeenCalledWith(201);
    newTournament.people = [];
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament has been created",
      newTournament: newTournament,
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return { body: tournament1 };
    };
    const req = mockedRequest();
    Tournament.create.mockRejectedValue(new Error("Unexpected error"));
    await create(req, res);
    expect(Tournament.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in creating tournament",
    });
  });
});

/**
 * UPDATE
 */
describe("Tests for update", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const toUpdateObject = { name: "update" };
  const mockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Tournament.findByPk = jest.fn();
    Tournament.findByPk.mockImplementation(() => {
      return foundTournament1;
    });
    foundTournament1.update = jest.fn();
    foundTournament1.update.mockImplementation(() => {
      return foundTournament1;
    });
  });

  it("Found tournament and edit : should return status 200 with the updated tournament", async () => {
    await updateById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(foundTournament1.update).toHaveBeenCalledTimes(1);
    expect(foundTournament1.update).toHaveBeenCalledWith(toUpdateObject);
    expect(res.status).toHaveBeenCalledWith(200);
    const { password, ...updatedTournament } = foundTournament1;
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament has been updated",
      updatedTournament,
    });
  });

  it("Not found tournament : should return status 404 with a specific message", async () => {
    Tournament.findByPk.mockImplementation(() => {
      return null;
    });
    await updateById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(foundTournament1.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Tournament not found" });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundTournament1.update.mockRejectedValue(new Error("Unexpected error"));
    await updateById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(foundTournament1.update).toHaveBeenCalledTimes(1);
    expect(foundTournament1.update).toHaveBeenCalledWith(toUpdateObject);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in updating tournament",
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

  const mockedRequest = () => {
    return { params: { id: 1 } };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Tournament.findByPk = jest.fn();
    Tournament.findByPk.mockImplementation(() => {
      return foundTournament1;
    });
    foundTournament1.destroy = jest.fn();
  });

  it("Deleted tournament : should return status 200 with a message", async () => {
    await deleteById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(foundTournament1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament has been deleted",
    });
  });

  it("Not found tournament : should return status 404 with a specific message", async () => {
    Tournament.findByPk.mockImplementation(() => {
      return null;
    });
    await deleteById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(foundTournament1.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Tournament not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundTournament1.destroy.mockRejectedValue(new Error("Unexpected error"));
    await deleteById(req, res);
    expect(Tournament.findByPk).toHaveBeenCalledTimes(1);
    expect(foundTournament1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in deleting tournament",
    });
  });
});
