import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../configs/config.js";
import { Person } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const persons = await Person.findAll();

    res.status(200).json(persons);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching person" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching person" });
  }
};

export const signin = async (req, res) => {
  try {
    const person = await Person.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    if (!req.body.password) {
      return res.status(400).json({ message: "Empty password" });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      person.password
    );

    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: person.id, role: person.role }, env.TOKEN, {
      expiresIn: "24h",
    });
    const { password, ...other } = person.dataValues;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in logging person" });
  }
};

export const signup = async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      subscription,
      EMANumber,
    } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Empty password." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const person = await Person.findOne({
      where: {
        email: email,
      },
    });

    if (person) {
      return res.status(400).json({ message: "Email is already used." });
    }

    const newPerson = await Person.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      subscription,
      EMANumber,
    });

    res.status(201).json({ message: "Person has been created.", newPerson });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in creating person" });
  }
};

export const create = async (req, res) => {
  try {
    const { firstname, lastname, email, phone, subscription, EMANumber, role } =
      req.body;
    const hashedPassword = await bcrypt.hash(env.DEFAULT_USER_PASSWORD, 10);

    const person = await Person.findOne({
      where: {
        email: email,
      },
    });

    if (person) {
      return res.status(400).json({ message: "Email is already used" });
    }

    const newPerson = await Person.create({
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      subscription,
      EMANumber,
      role,
    });

    res.status(201).json({ message: "Person has been created.", newPerson });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in creating person" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      firstname,
      lastname,
      email,
      password,
      phone,
      subscription,
      EMANumber,
      role,
    } = req.body;

    let hashedPassword;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    if (email) {
      const emailPerson = await Person.findOne({ where: { email: email } });
      if (emailPerson) {
        return res.status(400).json({ message: "Email is already used" });
      }
    }

    const data = {
      firstname,
      lastname,
      email,
      phone,
      password: hashedPassword,
      subscription,
      EMANumber,
    };

    let updatedPerson;
    if (person.id === req.user.id) {
      updatedPerson = await person.update(data, {
        new: true,
      });
      const { password, ...other } = updatedPerson.dataValues;

      return res.status(200).json({
        message: "Person has been updated",
        updatedPerson: other,
      });
    } else if (req.user.role === "admin") {
      updatedPerson = await person.update({ ...data, role }, { new: true });
      const { password, ...other } = updatedPerson.dataValues;

      return res.status(200).json({
        message: "Person has been updated",
        updatedPerson: other,
      });
    }

    res.status(403).json({ message: "Unauthorized to update person" });
  } catch (error) {
    res.status(500).json({ error: "Error in updating person" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const person = await Person.findByPk(id);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    await person.destroy();
    res.status(200).json({ message: "Person has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting person" });
  }
};
