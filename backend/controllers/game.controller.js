import {
  Tournament,
  Game,
  Round,
  PlayerRound,
  Person,
} from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const games = await Game.findAll({
      include: {
        model: Round,
        as: "rounds",
        include: {
          model: PlayerRound,
          as: "playerRounds",
          include: {
            model: Person,
            attributes: ["firstname", "lastname", "EMANumber"],
          },
        },
      },
    });

    res.status(200).json(games);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in fetching game" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await Game.findByPk(id, {
      include: {
        model: Round,
        as: "rounds",
        include: {
          model: PlayerRound,
          as: "playerRounds",
          include: {
            model: Person,
            attributes: ["firstname", "lastname", "EMANumber"],
          },
        },
      },
    });

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching game" });
  }
};

export const getByIdT = async (req, res) => {
  try {
    const { idT } = req.params;

    const tournament = await Tournament.findByPk(idT);

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }

    const game = await Game.findAll({
      where: { TournamentId: idT },
      include: {
        model: Round,
        as: "rounds",
        include: {
          model: PlayerRound,
          as: "playerRounds",
          include: {
            model: Person,
            attributes: ["firstname", "lastname", "EMANumber"],
          },
        },
      },
    });

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching game" });
  }
};

// check toutes les games d'un persone
export const getByIdP = async (req, res) => {
  try {
    const { idP } = req.params;

    const person = await Person.findByPk(idP);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const game = await Game.findAll({
      include: {
        model: Round,
        as: "rounds",
        include: {
          model: PlayerRound,
          as: "playerRounds",
          include: {
            model: Person,
            attributes: ["firstname", "lastname", "EMANumber"],
          },
        },
      },
    });

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching game" });
  }
};

export const create = async (req, res) => {
  try {
    const { date, type, format, length, TournamentId } = req.body;

    if (TournamentId) {
      const tournament = await Tournament.findByPk(TournamentId);

      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
    }

    const game = await Game.create({
      date,
      type,
      format,
      length,
      TournamentId,
    });

    res.status(201).json({ message: "Game has been created", game });
  } catch (error) {
    res.status(500).json({ error: "Error in creating game" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { date, type, format, length, TournamentId } = req.body;
    const { id } = req.params;

    if (TournamentId) {
      const tournament = await Tournament.findByPk(TournamentId);

      if (!tournament) {
        return res.status(404).json({ message: "Tournament not found" });
      }
    }

    const game = await Game.findByPk(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    await game.update({ date, type, format, length, TournamentId });

    res.status(200).json({ message: "Game has been updated", game });
  } catch (error) {
    res.status(500).json({ error: "Error in updating game" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await Game.findByPk(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    await game.destroy();
    res.status(200).json({ message: "Game has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting game" });
  }
};
