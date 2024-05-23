import { Tournament, Game } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const games = await Game.findAll();

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching game" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const game = await Game.findByPk(id);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json(game);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching game" });
  }
};

export const create = async (req, res) => {
  try {
    const { date, type, format, TournamentId } = req.body;

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
      TournamentId,
    });

    res.status(201).json({ message: "Game has been created", game });
  } catch (error) {
    res.status(500).json({ error: "Error in creating game" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { date, type, format, TournamentId } = req.body;
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

    await game.update({ date, type, format, TournamentId }, { where: { id: id } });

    res.status(200).json({ message: "Game has been updated", game });
  } catch (error) {
    console.log(error);
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
