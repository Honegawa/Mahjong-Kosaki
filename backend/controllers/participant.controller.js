import { Participant, Person, Tournament } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const participants = await Participant.findAll({
      include: [
        {
          model: Tournament,
          attributes: ["name", "startDate", "endDate"],
        },
        {
          model: Person,
          attributes: ["firstname", "lastname", "email"],
        },
      ],
    });

    res.status(200).json(participants);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in fetching participant" });
  }
};

export const getByIdTAndIdP = async (req, res) => {
  try {
    const { idT, idP } = req.params;

    const tournament = await Tournament.findByPk(idT);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const person = await Person.findByPk(idP);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const participant = await Participant.findOne({
      where: { TournamentId: idT, PersonId: idP },
      include: [
        {
          model: Tournament,
          attributes: ["name", "startDate", "endDate"],
        },
        {
          model: Person,
          attributes: ["firstname", "lastname", "email"],
        },
      ],
    });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    res.status(200).json(participant);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching participant" });
  }
};

export const getByTournamentId = async (req, res) => {
  try {
    const { idT } = req.params;

    const tournament = await Tournament.findByPk(idT);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const participants = await Participant.findAll({
      where: { TournamentId: idT },
      include: [
        {
          model: Tournament,
          attributes: ["name", "startDate", "endDate"],
        },
        {
          model: Person,
          attributes: ["firstname", "lastname", "email"],
        },
      ],
    });

    res.status(200).json(participants);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching participants" });
  }
};

export const create = async (req, res) => {
  try {
    const { TournamentId, PersonId } = req.body;

    const tournament = await Tournament.findByPk(TournamentId);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const person = await Person.findByPk(PersonId);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    if (person.id === req.user.id || req.user.role === "admin") {
      const participant = await Participant.create(req.body);
      return res
        .status(201)
        .json({ message: "Participant has been created", participant });
    }

    res
      .status(403)
      .json({ message: "Unable to create participant with your privilege" });
  } catch (error) {
    res.status(500).json({ error: "Error in creating participant" });
  }
};

export const deleteByIdTAndIdP = async (req, res) => {
  try {
    const { idT, idP } = req.params;

    const tournament = await Tournament.findByPk(idT);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const person = await Person.findByPk(idP);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const participant = await Participant.findOne({
      where: { TournamentId: idT, PersonId: idP },
    });

    if (!participant) {
      return res.status(404).json({ message: "Participant not found" });
    }

    if (person.id === req.user.id || req.user.role === "admin") {
      await participant.destroy();
      return res.status(200).json({ message: "Participant has been deleted" });
    }

    res
      .status(403)
      .json({ message: "Unable to delete participant with your privilege" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting participant" });
  }
};
