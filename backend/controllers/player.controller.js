import { Member, Player, Game, Person } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const players = await Player.findAll({
      include: [
        Game,
        {
          model: Member,
          attributes: ["EMANumber"],
          include: {
            model: Person,
            attributes: ["firstname", "lastname"]
          }
        },
      ],
    });

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching player" });
  }
};

export const getByIdG = async (req, res) => {
  try {
    const { idG } = req.params;

    const game = await Game.findByPk(idG);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const players = await Player.findAll({
      where: { GameId: idG },
      include: [
        Game,
        {
          model: Member,
          attributes: ["EMANumber"],
          include: {
            model: Person,
            attributes: ["firstname", "lastname"]
          }
        },
      ],
    });

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching players" });
  }
};

export const getByIdM = async (req, res) => {
  try {
    const { idM } = req.params;

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const players = await Player.findAll({
      where: { MemberId: idM },
      include: [
        Game,
        {
          model: Member,
          attributes: ["EMANumber"],
          include: {
            model: Person,
            attributes: ["firstname", "lastname"]
          }
        },
      ],
    });

    res.status(200).json(players);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching players" });
  }
};

export const getByIdMAndIdG = async (req, res) => {
  try {
    const { idG, idM } = req.params;

    const game = await Game.findByPk(idG);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const player = await Player.findOne({
      where: { GameId: idG, MemberId: idM },
      include: [
        Game,
        {
          model: Member,
          attributes: ["EMANumber"],
          include: {
            model: Person,
            attributes: ["firstname", "lastname"]
          }
        },
      ],
    });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching player" });
  }
};

export const create = async (req, res) => {
  try {
    const { GameId, MemberId } = req.body;

    const game = await Game.findByPk(GameId);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const member = await Member.findByPk(MemberId);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const playersByIdG = await Player.findAll({ where: { GameId: GameId } });

    if (playersByIdG.length >= game.format) {
      return res
        .status(400)
        .json({ message: "Player limit reached for this game" });
    }

    const player = await Player.create({ GameId, MemberId });

    res.status(201).json({ message: "Player has been created", player });
  } catch (error) {
    res.status(500).json({ error: "Error in sending player" });
  }
};

export const deleteByIdMAndIdG = async (req, res) => {
  try {
    const { idG, idM } = req.params;

    const game = await Game.findByPk(idG);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const player = await Player.findOne({
      where: { GameId: idG, MemberId: idM },
    });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    await player.destroy();
    res.status(200).json({ message: "Player has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting player" });
  }
};
