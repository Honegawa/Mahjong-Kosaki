import { Game, Round } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const rounds = await Round.findAll();

    res.status(200).json(rounds);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching round" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const round = await Round.findByPk(id);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    res.status(200).json(round);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching round" });
  }
};

export const create = async (req, res) => {
  try {
    const { wind, roundNb, homba, draw, GameId } = req.body;

    const game = await Game.findByPk(GameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const round = await Round.create({
      wind,
      roundNb,
      homba,
      draw,
      GameId,
    });

    res.status(201).json({ message: "Round has been created", round });
  } catch (error) {
    res.status(500).json({ error: "Error in creating round" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { wind, roundNb, homba, draw } = req.body;
    const { id } = req.params;

    const round = await Round.findByPk(id);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    await round.update({ wind, roundNb, homba, draw }, { where: { id: id } });

    res.status(200).json({ message: "Round has been updated", round });
  } catch (error) {
    res.status(500).json({ error: "Error in updating round" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const round = await Round.findByPk(id);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    await round.destroy();
    res.status(200).json({ message: "Round has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting round" });
  }
};
