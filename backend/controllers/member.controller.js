import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Game, Member, PlayerRound, Round } from "../models/index.js";
import { env } from "../configs/config.js";

export const getAll = async (req, res) => {
  try {
    const members = await Member.findAll();

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching member" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByPk(id);

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
      include: {
        model: Game,
        as: "games",
        through: {
          attributes: []
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
    });

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const games = member.games;

    res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in fetching member games" });
  }
};

export const signin = async (req, res) => {
  try {
    const member = await Member.findOne({
      where: {
        email: req.body.email,
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
      licenceEMA,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const member = await Member.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      subscription,
      licenceEMA,
    });

    res.status(201).json({ message: "member has been created.", member });
  } catch (error) {
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
      licenceEMA,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    if (member.id !== req.user.id) {
      return res.status(403).json({ message: "Token not valid" });
    }

    await member.update(
      {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone,
        subscription,
        licenceEMA,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({ message: "Member has been updated", member });
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
