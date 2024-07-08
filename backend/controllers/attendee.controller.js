import { Attendee, Booking, Person } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const attendees = await Attendee.findAll({
      include: [
        {
          model: Person,
          attributes: ["firstname", "lastname", "email", "phone"],
        },
        {
          model: Booking,
        },
      ],
    });

    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching attendee" });
  }
};

export const getByIdB = async (req, res) => {
  try {
    const { idB } = req.params;

    const booking = await Booking.findByPk(idB);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const attendees = await Attendee.findAll({
      where: { BookingId: idB },
      include: [
        {
          model: Person,
          attributes: ["firstname", "lastname", "email", "phone"],
        },
        {
          model: Booking,
        },
      ],
    });

    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching attendee" });
  }
};

export const getByIdBAndIdP = async (req, res) => {
  try {
    const { idB, idP } = req.params;

    const booking = await Booking.findByPk(idB);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const person = await Person.findByPk(idP);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const attendee = await Attendee.findOne({
      where: { BookingId: idB, PersonId: idP },
      include: [
        {
          model: Person,
          attributes: ["firstname", "lastname", "email", "phone"],
        },
        {
          model: Booking,
        },
      ],
    });

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching attendee" });
  }
};

export const create = async (req, res) => {
  try {
    const attendee = await Attendee.create(req.body);

    res.status(201).json({ message: "Attendee has been created", attendee });
  } catch (error) {
    res.status(500).json({ error: "Error in sending attendee" });
  }
};

export const deleteByIdBAndIdP = async (req, res) => {
  try {
    const { idB, idP } = req.params;

    const booking = await Booking.findByPk(idB);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    const person = await Person.findByPk(idP);
    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const attendee = await Attendee.findOne({
      where: { BookingId: idB, PersonId: idP },
    });

    if (!attendee) {
      return res.status(404).json({ message: "Attendee not found" });
    }

    await attendee.destroy();
    res.status(200).json({ message: "Attendee has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting attendee" });
  }
};
