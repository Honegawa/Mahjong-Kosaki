import {
  Game,
  Member,
  PlayerRound,
  Round,
  Tournament,
} from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const tournaments = await Tournament.findAll({
      include: {
        model: Member,
        as: "members",
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
        model: Member,
        as: "members",
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
              model: Member,
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
    const tournament = await Tournament.create(req.body);

    res
      .status(201)
      .json({ message: "Tournament has been created", tournament });
  } catch (error) {
    res.status(500).json({ error: "Error in sending tournament" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, startDate, endDate, entryFee } = req.body;

    const tournament = await Tournament.findByPk(id);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    await tournament.update({
      name,
      description,
      startDate,
      endDate,
      entryFee,
    });

    res
      .status(200)
      .json({ message: "Tournament has been updated", tournament });
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
