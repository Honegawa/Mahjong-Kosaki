import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Game, Member, Person, PlayerRound, Round } from "../models/index.js";
import { env } from "../configs/config.js";

export const getAll = async (req, res) => {
  try {
    const members = await Member.findAll({
      include: {
        model: Person,
        attributes: ["firstname", "lastname", "email", "phone"],
      },
    });

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching member" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id, {
      include: {
        model: Person,
        attributes: ["firstname", "lastname", "email", "phone"],
      },
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.status(200).json(member);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching member" });
  }
};

export const getGamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id, {
      include: [
        {
          model: Game,
          as: "games",
          through: {
            attributes: [],
          },
          include: {
            model: Round,
            as: "rounds",
            include: {
              model: PlayerRound,
              as: "playerRounds",
            },
          },
        },
      ],
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const games = member.games;

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching member games" });
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

    const member = await Member.findOne({
      where: {
        PersonId: person.id,
      },
    });

    if (!member) {
      return res.status(404).json({ message: "User not found" });
    }

    const comparePassword = await bcrypt.compare(
      req.body.password,
      member.password
    );

    if (!comparePassword) {
      return res.status(400).json({ message: "Wrong Credentials" });
    }

    const token = jwt.sign({ id: member.id, role: member.role }, env.TOKEN, {
      expiresIn: "24h",
    });
    const { password, ...other } = member.dataValues;

    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(other);
  } catch (error) {
    res.status(500).json({ error: "Error in logging member" });
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
    const hashedPassword = await bcrypt.hash(password, 10);

    const person = await Person.findOne({
      where: {
        email: email,
      },
    });

    if (!person) {
      const newPerson = await Person.create({
        firstname,
        lastname,
        email,
        phone,
      });

      const member = await Member.create({
        password: hashedPassword,
        subscription,
        EMANumber,
        PersonId: newPerson.id,
      });

      res.status(201).json({ message: "Member has been created.", member });
    } else {
      const member = await Member.create({
        password: hashedPassword,
        subscription,
        EMANumber,
        PersonId: person.id,
      });

      res.status(201).json({ message: "Member has been created.", member });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in creating member" });
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
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const person = await Person.findByPk(member.PersonId);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    if (member.id !== req.user.id) {
      return res.status(403).json({ message: "Token not valid" });
    }

    const updatedPerson = await person.update({
      firstname,
      lastname,
      email,
      phone,
    });

    const updatedMember = await member.update(
      {
        password: hashedPassword,
        subscription,
        EMANumber,
      },
      {
        new: true,
      },
      {
        include: Person,
      }
    );

    res.status(200).json({
      message: "Member has been updated",
      updatedMember,
      updatedPerson,
    });
  } catch (error) {
    res.status(500).json({ error: "Error in updating member" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    await member.destroy();
    res.status(200).json({ message: "Member has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting member" });
  }
};
