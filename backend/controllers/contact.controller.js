import { Contact } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const contacts = await Contact.findAll();

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching contact" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching contact" });
  }
};

export const create = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);

    res.status(201).json({ message: "Contact has been created", contact });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error in sending contact" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await contact.destroy();
    res.status(200).json({ message: "Contact has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting contact" });
  }
};
