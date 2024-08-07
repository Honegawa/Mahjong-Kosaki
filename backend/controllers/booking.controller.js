import { Booking, Person } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const bookings = await Booking.findAll();

    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching booking" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching booking" });
  }
};

export const create = async (req, res) => {
  try {
    const { date, type, format } = req.body;
    const booking = await Booking.create({
      date,
      type,
      format,
      PersonId: req.user.id,
    });

    res.status(201).json({ message: "Booking has been created", booking });
  } catch (error) {
    res.status(500).json({ error: "Error in sending booking" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, type, format } = req.body;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      (req.user && req.user.id === booking.PersonId) ||
      (req.user && req.user.role === "admin")
    ) {
      await booking.update({ date, type, format });
      return res
        .status(200)
        .json({ message: "Booking has been updated", booking });
    }

    res
      .status(401)
      .json({ message: "Unable to update booking with your privilege" });
  } catch (error) {
    res.status(500).json({ error: "Error in updating booking" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (
      (req.user && req.user.id === booking.PersonId)||
      (req.user && req.user.role === "admin")
    ) {
      await booking.destroy();
      return res.status(200).json({ message: "Booking has been deleted" });
    }

    res
      .status(401)
      .json({ message: "Unable to delete booking with your privilege" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting booking" });
  }
};
