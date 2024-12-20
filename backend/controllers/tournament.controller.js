import {
  Game,
  Person,
  PlayerRound,
  Round,
  Tournament,
} from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const tournaments = await Tournament.findAll({
      include: {
        model: Person,
        as: "people",
        attributes: ["id", "firstname", "lastname", "email", "EMANumber"],
        through: { attributes: [] },
      },
    });

    res.status(200).json(tournaments);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching tournament" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByPk(id, {
      include: {
        model: Person,
        as: "people",
        attributes: ["id", "firstname", "lastname", "email", "EMANumber"],
        through: { attributes: [] },
      },
    });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    res.status(200).json(tournament);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching tournament" });
  }
};

export const getGamesById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByPk(id, {
      include: {
        model: Game,
        as: "games",
        include: {
          model: Round,
          as: "rounds",
          include: {
            model: PlayerRound,
            as: "playerRounds",
            include: {
              model: Person,
              attributes: ["id", "firstname", "lastname", "email", "EMANumber"],
            },
          },
        },
      },
    });

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const games = tournament.games;

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching tournament" });
  }
};

export const create = async (req, res) => {
  try {
    const {
      name,
      description,
      setup,
      startDate,
      endDate,
      entryFee,
      registerLimitDate,
      playerLimit,
      location,
    } = req.body;

    const tournament = await Tournament.create({
      name,
      description,
      setup,
      startDate,
      endDate,
      entryFee,
      registerLimitDate,
      playerLimit,
      location,
    });

    res.status(201).json({
      message: "Tournament has been created",
      newTournament: { ...tournament.dataValues, people: [] },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in creating tournament" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      setup,
      startDate,
      endDate,
      entryFee,
      registerLimitDate,
      playerLimit,
      location,
    } = req.body;

    const tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    await tournament.update({
      name,
      description,
      setup,
      startDate,
      endDate,
      entryFee,
      registerLimitDate,
      playerLimit,
      location,
    });

    res.status(200).json({
      message: "Tournament has been updated",
      updatedTournament: tournament,
    });
  } catch (error) {
    res.status(500).json({ error: "Error in updating tournament" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    await tournament.destroy();
    res.status(200).json({ message: "Tournament has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting tournament" });
  }
};
