process.env.NODE_ENV = "test";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { jest } from "@jest/globals";
import {
  getAll,
  getById,
  signup,
  signin,
  create,
  updateById,
  deleteById,
} from "../controllers/person.controller.js";
import { env } from "../configs/config";
import { Person } from "../models";

const validPerson = {
  firstname: "firstname",
  lastname: "lastname",
  email: "email@email.email",
  phone: "0123456789",
  password: env.DEFAULT_USER_PASSWORD,
  subscription: new Date(),
  EMANumber: "01234567",
  role: "user",
};
const foundPerson = Person.build({ ...validPerson, id: 1 });

const validPersonOptionnalFields = {
  firstname: "firstname2",
  lastname: "lastname2",
  email: "email2@email.email",
  password: env.DEFAULT_USER_PASSWORD,
  role: "user",
};
const foundPersonOptionnalFields = Person.build({
  ...validPersonOptionnalFields,
  id: 2,
});

const invalidPersonPassword = {
  firstname: "firstname3",
  lastname: "lastname3",
  email: "email3@email.email",
  phone: "0123456789",
  password: "",
  subscription: new Date().toISOString(),
  EMANumber: "01234567",
  role: "user",
};

const invalidPerson = {
  firstname: "firstname3",
  lastname: "lastname3",
  email: "email3@email.email",
  phone: "0123456789",
  password: env.DEFAULT_USER_PASSWORD,
  subscription: new Date().toISOString(),
  EMANumber: "0123456",
  role: "user",
};

const allPersons = [foundPerson, foundPersonOptionnalFields];

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
    Person.findAll = jest.fn();
    Person.findAll.mockImplementation(() => {
      return allPersons;
    });
  });

  it("Found persons : should return status 200 with an array", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    await getAll(req, res);
    expect(Person.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allPersons);
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    Person.findAll.mockRejectedValue(new Error("Unexpected error"));
    await getAll(req, res);
    expect(Person.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching person",
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
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return validPerson;
    });
  });

  it("Found person : should return status 200 with the found person", async () => {
    await getById(req, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(validPerson);
  });

  it("Not found person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await getById(req, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Person.findByPk.mockRejectedValue(new Error("Unexpected error"));
    await getById(req, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching person",
    });
  });
});

/**
 * SIGNIN
 */
describe("Tests for signin", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.cookie = jest.fn().mockReturnValue(res);

    return res;
  };
  const res = mockedResponse();

  const validMockedRequest = () => {
    return {
      body: { email: validPerson.email, password: validPerson.password },
    };
  };
  const validReq = validMockedRequest();
  const invalidMockedRequest = () => {
    return {
      body: {
        email: invalidPersonPassword.email,
        password: invalidPersonPassword.password,
      },
    };
  };
  const invalidReq = invalidMockedRequest();

  beforeEach(() => {
    Person.findOne = jest.fn();
    Person.findOne.mockImplementation(() => {
      return foundPerson;
    });
    bcrypt.compare = jest.fn();
    jwt.sign = jest.fn();
  });

  it("Found person : should return status 200 with a cookie and person", async () => {
    bcrypt.compare.mockResolvedValue(true);
    const mockedJWToken = "mocked-jwt-token";
    jwt.sign.mockReturnValue(mockedJWToken);
    await signin(validReq, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(jwt.sign).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    const { password, ...person } = foundPerson.dataValues;
    expect(res.json).toHaveBeenCalledWith(person);
    expect(res.cookie).toHaveBeenCalledWith("access_token", mockedJWToken, {
      httpOnly: true,
    });
  });

  it("Not found pereson : should return status 404 with a specific message", async () => {
    Person.findOne.mockImplementation(() => {
      return null;
    });
    await signin(validReq, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Invalid password : should return status 400 with specific message", async () => {
    bcrypt.compare.mockResolvedValue(false);
    await signin(validReq, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Wrong Credentials",
    });
  });

  it("Invalid empty password : should return status 400 with specific message", async () => {
    await signin(invalidReq, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(bcrypt.compare).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Empty password",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Person.findOne.mockRejectedValue(new Error("Unexpected error"));
    await signin(validReq, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in logging person",
    });
  });
});

/**
 * SIGNUP
 */

describe("Tests for signup", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  beforeEach(() => {
    Person.create = jest.fn();
    Person.create.mockImplementation((args) => {
      args.id = 1;
      return Person.build(args).dataValues;
    });
    Person.findOne = jest.fn();
    bcrypt.hash = jest.fn();
    bcrypt.hash.mockResolvedValue("hashed-password");
  });

  it("Valid person with optionnal field : should return status 201 and a confirmation message", async () => {
    const { role, ...body } = validPersonOptionnalFields;
    const mockedRequest = () => {
      return { body: body };
    };
    const newPerson = {
      ...body,
      id: 1,
      password: "hashed-password",
    };
    const req = mockedRequest();
    await signup(req, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledWith({
      ...body,
      id: 1,
      password: "hashed-password",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    newPerson.role = role;

    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been created.",
      newPerson: newPerson,
    });
  });

  it("Valid person without optionnal fields : should return status 201 and a confirmation message", async () => {
    const { role, ...body } = validPerson;
    const mockedRequest = () => {
      return { body: body };
    };
    const newPerson = {
      ...body,
      id: 1,
      password: "hashed-password",
    };
    const req = mockedRequest();
    await signup(req, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledWith({
      ...body,
      id: 1,
      password: "hashed-password",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    newPerson.role = role;

    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been created.",
      newPerson: newPerson,
    });
  });

  it("Unvalid password : should return status 400 with a specific message", async () => {
    const mockedRequest = () => {
      return { body: invalidPersonPassword };
    };
    const req = mockedRequest();
    await signup(req, res);
    expect(Person.findOne).not.toHaveBeenCalled();
    expect(Person.create).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Empty password.",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return { body: invalidPerson };
    };
    const req = mockedRequest();
    Person.create.mockRejectedValue(new Error("Unexpected error"));
    await signup(req, res);
    expect(Person.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in creating person",
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
    Person.create = jest.fn();
    Person.create.mockImplementation((args) => {
      args.id = 1;
      return Person.build(args).dataValues;
    });
    Person.findOne = jest.fn();
    bcrypt.hash = jest.fn();
    bcrypt.hash.mockResolvedValue("hashed-password");
  });

  it("Valid person with optionnal field : should return status 201 and a confirmation message", async () => {
    const { role, ...body } = validPersonOptionnalFields;
    const mockedRequest = () => {
      return { body: body };
    };
    const newPerson = {
      ...body,
      id: 1,
      password: "hashed-password",
    };
    const req = mockedRequest();
    await create(req, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledWith({
      ...body,
      id: 1,
      password: "hashed-password",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    newPerson.role = role;

    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been created.",
      newPerson: newPerson,
    });
  });

  it("Valid person without optionnal fields : should return status 201 and a confirmation message", async () => {
    const { role, ...body } = validPerson;
    const mockedRequest = () => {
      return { body: body };
    };
    const newPerson = {
      ...body,
      id: 1,
      password: "hashed-password",
    };
    const req = mockedRequest();
    await create(req, res);
    expect(Person.findOne).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledTimes(1);
    expect(Person.create).toHaveBeenCalledWith({
      ...body,
      id: 1,
      password: "hashed-password",
    });
    expect(res.status).toHaveBeenCalledWith(201);
    newPerson.role = role;

    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been created.",
      newPerson: newPerson,
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return { body: invalidPerson };
    };
    const req = mockedRequest();
    Person.create.mockRejectedValue(new Error("Unexpected error"));
    await create(req, res);
    expect(Person.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in creating person",
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

  const toUpdateObject = { email: "update@email.email" };
  const userMockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject, user: { id: 1 } };
  };
  const userReq = userMockedRequest();
  const adminMockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject, user: { role: "admin" } };
  };
  const adminReq = adminMockedRequest();

  beforeEach(() => {
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return foundPerson;
    });
    foundPerson.update = jest.fn();
    foundPerson.update.mockImplementation(() => {
      return foundPerson;
    });
  });

  it("Found person and self edit : should return status 200 with the updated person", async () => {
    await updateById(userReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).toHaveBeenCalledWith(toUpdateObject, {
      new: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    const { password, ...updatedPerson } = foundPerson.dataValues;
    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been updated",
      updatedPerson,
    });
  });

  it("Found person and admin edit : should return status 200 with the updated person", async () => {
    await updateById(adminReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).toHaveBeenCalledWith(toUpdateObject, {
      new: true,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    const { password, ...updatedPerson } = foundPerson.dataValues;
    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been updated",
      updatedPerson,
    });
  });

  it("Not found person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await updateById(userReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Person not found" });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundPerson.update.mockRejectedValue(new Error("Unexpected error"));
    await updateById(userReq, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).toHaveBeenCalledTimes(1);
    expect(foundPerson.update).toHaveBeenCalledWith(toUpdateObject, {
      new: true,
    });
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in updating person",
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
    Person.findByPk = jest.fn();
    Person.findByPk.mockImplementation(() => {
      return foundPerson;
    });
    foundPerson.destroy = jest.fn();
  });

  it("Found person : should return status 200 with a message", async () => {
    await deleteById(req, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person has been deleted",
    });
  });

  it("Not found person : should return status 404 with a specific message", async () => {
    Person.findByPk.mockImplementation(() => {
      return null;
    });
    await deleteById(req, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Person not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundPerson.destroy.mockRejectedValue(new Error("Unexpected error"));
    await deleteById(req, res);
    expect(Person.findByPk).toHaveBeenCalledTimes(1);
    expect(foundPerson.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in deleting person",
    });
  });
});
