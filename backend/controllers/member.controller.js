import bcrypt from "bcrypt";
import { Member } from "../models/index.js";

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

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password, phone, subscription, licenceEMA } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const member = await Member.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      subscription,
      licenceEMA
    });

    res.status(201).json({ message: "member has been created.", member });
  } catch (error) {
    res.status(500).json({error: "Error in creating member"})
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstname, lastname, email, password, phone, subscription, licenceEMA } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const member = await Member.findByPk(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
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
    res.status(500).json({error: "Error in updating member"})
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
