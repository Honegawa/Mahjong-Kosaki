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
