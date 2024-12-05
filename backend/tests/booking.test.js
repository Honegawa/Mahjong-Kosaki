process.env.NODE_ENV = "test";

import { jest } from "@jest/globals";
import {
  getAll,
  create,
  deleteById,
  getById,
  updateById,
} from "../controllers/booking.controller.js";
import { env } from "../configs/config.js";
import { Booking, Person } from "../models/index.js";

const today = new Date();
const person1 = {
  id: 1,
  firstname: "firstname1",
  lastname: "lastname1",
  email: "email1@email.email",
};
const foundPerson = Person.build({
  ...person1,
  phone: "0123456789",
  password: env.DEFAULT_USER_PASSWORD,
  subscription: today,
  EMANumber: "01234567",
  role: "user",
});
const person2 = {
  id: 2,
  firstname: "firstname2",
  lastname: "lastname2",
  email: "email2@email.email",
};

const booking1 = {
  date: today,
  type: "Classée",
  format: 4,
  PersonId: 1,
  Person: person1,
};
const foundBooking1 = Booking.build({ ...booking1, id: 1 });
const booking2 = {
  date: today,
  type: "Classée",
  format: 4,
  PersonId: 2,
  Person: person2,
};
const foundBooking2 = Booking.build({ ...booking2, id: 1 });

const allBookings = [foundBooking1, foundBooking2];

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
    Booking.findAll = jest.fn();
    Booking.findAll.mockImplementation(() => {
      return allBookings;
    });
  });

  it("Found bookings : should return status 200 with an array", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    await getAll(req, res);
    expect(Booking.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allBookings);
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    Booking.findAll.mockRejectedValue(new Error("Unexpected error"));
    await getAll(req, res);
    expect(Booking.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching booking",
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
    Booking.findByPk = jest.fn();
    Booking.findByPk.mockImplementation(() => {
      return booking1;
    });
  });

  it("Found booking : should return status 200 with the found booking", async () => {
    await getById(req, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(booking1);
  });

  it("Not found booking : should return status 404 with a specific message", async () => {
    Booking.findByPk.mockImplementation(() => {
      return null;
    });
    await getById(req, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Booking.findByPk.mockRejectedValue(new Error("Unexpected error"));
    await getById(req, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching booking",
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
    date: today,
    type: "Classée",
    format: 4,
  };
  const userMockedRequest = () => {
    return { body, user: { id: 1 } };
  };
  const userReq = userMockedRequest();
  const adminMockedRequest = () => {
    return { body: { ...body, PersonId: person1.id }, user: { role: "admin" } };
  };
  const adminReq = adminMockedRequest();

  beforeEach(() => {
    Booking.create = jest.fn();
    Booking.create.mockImplementation((args) => {
      return Booking.build({ ...args, id: 1 });
    });
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return foundPerson;
    });
  });

  it("Valid booking as user : should return status 201 and a confirmation message", async () => {
    await create(userReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Booking.create).toHaveBeenCalledTimes(1);
    expect(Booking.create).toHaveBeenCalledWith({
      ...userReq.body,
      PersonId: 1,
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking has been created",
      newBooking: { ...booking1, id: 1, PersonId: 1 },
    });
  });

  it("Valid booking as admin : should return status 201 and a confirmation message", async () => {
    await create(adminReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Booking.create).toHaveBeenCalledTimes(1);
    expect(Booking.create).toHaveBeenCalledWith(adminReq.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking has been created",
      newBooking: { ...booking1, id: 1 },
    });
  });

  it("Not found self person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await create(userReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Booking.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Not found other person as admin : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await create(adminReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Booking.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Booking.create.mockRejectedValue(new Error("Unexpected error"));
    await create(userReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(Booking.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in creating booking",
    });
  });
});

/**
 * UPDATE
 */
describe("Tests for updateById", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const toUpdateObject = { format: 3 };

  const userMockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject, user: { id: 1 } };
  };
  const userReq = userMockedRequest();
  const adminMockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject, user: { role: "admin" } };
  };
  const adminReq = adminMockedRequest();
  const wrongUserMockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject, user: { id: 2 } };
  };
  const wrongUserReq = wrongUserMockedRequest();

  beforeEach(() => {
    Booking.findByPk = jest.fn();
    Booking.findByPk.mockImplementation((args) => {
      return foundBooking1;
    });
    foundBooking1.update = jest.fn();
    foundBooking1.update.mockImplementation(() => {
      return foundBooking1;
    });
  });

  it("Found booking and edit as self user : should return status 200 with the updated booking", async () => {
    await updateById(userReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).toHaveBeenCalledWith(userReq.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking has been updated",
      updatedBooking: foundBooking1,
    });
  });

  it("Found booking and edit as admin : should return status 200 with the updated booking", async () => {
    await updateById(adminReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).toHaveBeenCalledWith(adminReq.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking has been updated",
      updatedBooking: foundBooking1,
    });
  });

  it("Not found booking : should return status 404 with a specific message", async () => {
    Booking.findByPk.mockImplementation(() => {
      return null;
    });
    await updateById(userReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Booking not found" });
  });

  it("Not booking user : should return status 401 with a specific message", async () => {
    await updateById(wrongUserReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unable to update booking with your privilege",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundBooking1.update.mockRejectedValue(new Error("Unexpected error"));
    await updateById(userReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).toHaveBeenCalledTimes(1);
    expect(foundBooking1.update).toHaveBeenCalledWith(toUpdateObject);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in updating booking",
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
    return { params: { id: 1 }, user: { id: 1 } };
  };
  const userReq = userMockedRequest();
  const adminMockedRequest = () => {
    return { params: { id: 1 }, user: { role: "admin" } };
  };
  const adminReq = adminMockedRequest();
  const wrongUserMockedRequest = () => {
    return { params: { id: 1 }, user: { id: 2 } };
  };
  const wrongUserReq = wrongUserMockedRequest();

  beforeEach(() => {
    Booking.findByPk = jest.fn();
    Booking.findByPk.mockImplementation(() => {
      return foundBooking1;
    });
    foundBooking1.destroy = jest.fn();
  });

  it("Deleted booking as user : should return status 200 with a message", async () => {
    await deleteById(userReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking has been deleted",
    });
  });

  it("Deleted booking as admin : should return status 200 with a message", async () => {
    await deleteById(adminReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking has been deleted",
    });
  });

  it("Not found booking : should return status 404 with a specific message", async () => {
    Booking.findByPk.mockImplementation(() => {
      return null;
    });
    await deleteById(userReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Booking not found",
    });
  });

  it("Not booking user : should return status 401 with a specific message", async () => {
    await deleteById(wrongUserReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unable to delete booking with your privilege",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundBooking1.destroy.mockRejectedValue(new Error("Unexpected error"));
    await deleteById(userReq, res);
    expect(Booking.findByPk).toHaveBeenCalledTimes(1);
    expect(foundBooking1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in deleting booking",
    });
  });
});
