import { Member, WinningHand, Round, Game } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const winningHands = await WinningHand.findAll({
      include: [
        {
          model: Round,
          include: Game,
        },
        {
          model: Member,
          attributes: ["firstname", "lastname", "email", "licenceEMA"],
        },
      ],
    });

    res.status(200).json(winningHands);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching winningHand" });
  }
};

export const getByIdRAndIdM = async (req, res) => {
  try {
    const { idR, idM } = req.params;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const winningHand = await WinningHand.findOne({
      where: { RoundId: idR, MemberId: idM },
      include: [
        {
          model: Round,
          include: Game,
        },
        {
          model: Member,
          attributes: ["firstname", "lastname", "email", "licenceEMA"],
        },
      ],
    });

    if (!winningHand) {
      return res.status(404).json({ message: "WinningHand not found" });
    }

    res.status(200).json(winningHand);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching winningHand" });
  }
};

export const getByIdG = async (req, res) => {
  try {
    const { idG } = req.params;

    const game = await Game.findByPk(idG);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const winningHands = await WinningHand.findAll({
      include: [
        {
          model: Round,
          where: { GameId: idG },
          include: {
            model: Game,
          },
        },
        {
          model: Member,
          attributes: ["firstname", "lastname", "email", "licenceEMA"],
        },
      ],
    });

    res.status(200).json(winningHands);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching winningHands" });
  }
};

export const getByIdGAndIdR = async (req, res) => {
  try {
    const { idG, idR } = req.params;

    const game = await Game.findByPk(idG);

    if (!game) {
      return res.status(404).json({ message: "Game not found" });
    }

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const winningHands = await WinningHand.findAll({
      where: { RoundId: idR },
      include: [
        {
          model: Round,
          where: { GameId: idG },
          include: Game,
        },
        {
          model: Member,
          attributes: ["firstname", "lastname", "email", "licenceEMA"],
        },
      ],
    });

    res.status(200).json(winningHands);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in fetching winningHands" });
  }
};

export const getByIdM = async (req, res) => {
  try {
    const { idM } = req.params;

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const winningHands = await WinningHand.findAll({
      where: { MemberId: idM },
      include: [
        {
          model: Round,
          include: Game,
        },
        {
          model: Member,
          attributes: ["firstname", "lastname", "email", "licenceEMA"],
        },
      ],
    });

    res.status(200).json(winningHands);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching winningHands" });
  }
};

export const create = async (req, res) => {
  try {
    const { RoundId, MemberId } = req.body;

    const round = await Round.findByPk(RoundId);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const member = await Member.findByPk(MemberId);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const winningHand = await WinningHand.create(req.body);
    res
      .status(201)
      .json({ message: "WinningHand has been created", winningHand });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error in sending winningHand" });
  }
};

export const updateByIdRAndIdM = async (req, res) => {
  try {
    const { idR, idM } = req.params;
    const { han, fu, yaku, value } = req.body;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const winningHand = await WinningHand.findOne({
      where: { RoundId: idR, MemberId: idM },
    });

    if (!winningHand) {
      return res.status(404).json({ message: "WinningHand not found" });
    }

    await winningHand.update({ han, fu, yaku, value });

    res
      .status(200)
      .json({ message: "WinningHand has been updated", winningHand });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in updating winningHand" });
  }
};

export const deleteByIdRAndIdM = async (req, res) => {
  try {
    const { idR, idM } = req.params;

    const round = await Round.findByPk(idR);

    if (!round) {
      return res.status(404).json({ message: "Round not found" });
    }

    const member = await Member.findByPk(idM);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    const winningHand = await WinningHand.findOne({
      where: { RoundId: idR, MemberId: idM },
    });

    if (!winningHand) {
      return res.status(404).json({ message: "WinningHand not found" });
    }

    await winningHand.destroy();
    res.status(200).json({ message: "WinningHand has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting winningHand" });
  }
};
