import { Person, PlayerRound, Round } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const playerRounds = await PlayerRound.findAll();

    res.status(200).json(playerRounds);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching playerRound" });
  }
};

export const getByIdR = async (req, res) => {
  try {
    const { idR } = req.params;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "round not found" });
    }

    const playerRounds = await PlayerRound.findAll({ where: { RoundId: idR } });

    res.status(200).json(playerRounds);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching playerRounds" });
  }
};

export const getByIdRAndIdP = async (req, res) => {
  try {
    const { idR, idP } = req.params;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const person = await Person.findByPk(idP);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const playerRound = await PlayerRound.findOne({
      where: { RoundId: idR, PersonId: idP },
    });

    res.status(200).json(playerRound);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching playerRounds" });
  }
};

export const create = async (req, res) => {
  try {
    const {
      seatWind,
      roundScore,
      tenpai,
      han,
      fu,
      yaku,
      handValue,
      RoundId,
      PersonId,
    } = req.body;

    const round = await Round.findByPk(RoundId);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const person = await Person.findByPk(PersonId);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const playerRound = await PlayerRound.create({
      seatWind,
      roundScore,
      tenpai,
      han,
      fu,
      yaku,
      handValue,
      RoundId,
      PersonId,
    });

    res
      .status(201)
      .json({ message: "PlayerRound has been created", playerRound });
  } catch (error) {
    res.status(500).json({ error: "Error in sending playerRound" });
  }
};

export const updateByIdRAndIdP = async (req, res) => {
  try {
    const { idR, idP } = req.params;
    const { seatWind, roundScore, tenpai, han, fu, yaku, handValue } = req.body;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const person = await Person.findByPk(idP);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const playerRound = await PlayerRound.findOne({
      where: { RoundId: idR, PersonId: idP },
    });

    if (!playerRound) {
      return res.status(404).json({ message: "PlayerRound not found" });
    }

    await playerRound.update({
      seatWind,
      roundScore,
      tenpai,
      han,
      fu,
      yaku,
      handValue,
    });

    res
      .status(200)
      .json({ message: "PlayerRound has been updated", playerRound });
  } catch (error) {
    res.status(500).json({ error: "Error in updating playerRound" });
  }
};

export const deleteByIdRAndIdP = async (req, res) => {
  try {
    const { idR, idP } = req.params;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const person = await Person.findByPk(idP);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    const playerRound = await PlayerRound.findOne({
      where: { RoundId: idR, PersonId: idP },
    });

    if (!playerRound) {
      return res.status(404).json({ message: "PlayerRound not found" });
    }

    await playerRound.destroy();
    res.status(200).json({ message: "PlayerRound has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting playerRound" });
  }
};
