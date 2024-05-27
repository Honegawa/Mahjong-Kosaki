import { Booking } from "../models/index.js";

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
    const bookingsByTable = await Booking.findAll({
      where: { table: req.body.table },
    });

    const bookingsByTableAndEmail = bookingsByTable.filter(
      (b) => b.dataValues.email === req.body.email
    ).length;
    if (bookingsByTableAndEmail > 0) {
      return res.status(400).json({
        message:
          "Booking already ready registered for this table with this email",
      });
    }

    if (bookingsByTable.length > 3) {
      return res
        .status(400)
        .json({ message: "Booking for this table is full" });
    }

    const booking = await Booking.create(req.body);

    res.status(201).json({ message: "Booking has been created", booking });
  } catch (error) {
    res.status(500).json({ error: "Error in sending booking" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, table, type, format, calendarLink } = req.body;

    const booking = await Booking.findByPk(id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await booking.update({ date, table, type, format, calendarLink });

    res.status(200).json({ message: "Booking has been updated", booking });
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
      booking.dataValues.email === req.body.email ||
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
