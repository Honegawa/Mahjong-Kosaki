import { Contact, Person } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const contacts = await Contact.findAll({
      include: {
        model: Person,
        attributes: ["firstname", "lastname", "email", "phone"],
      },
    });

    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching contact" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id, {
      include: {
        model: Person,
        attributes: ["firstname", "lastname", "email", "phone"],
      },
    });

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
    const { firstname, lastname, email, phone, object, content } = req.body;

    const person = await Person.findOne({ where: { email: email } });
    if (!person) {
      const newPerson = await Person.create({
        firstname,
        lastname,
        email,
        phone,
      });

      const contact = await Contact.create({
        object,
        content,
        PersonId: newPerson.id,
      });
      res.status(201).json({ message: "Contact has been created", contact });
    } else {
      const contact = await Contact.create({
        object,
        content,
        PersonId: person.id,
      });
      res.status(201).json({ message: "Contact has been created", contact });
    }
  } catch (error) {
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

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Unauthorized to delete contact" });
    }

    await contact.destroy();
    res.status(200).json({ message: "Contact has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting contact" });
  }
};
