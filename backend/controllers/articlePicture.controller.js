import { Article, ArticlePicture } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const articlePictures = await ArticlePicture.findAll();

    res.status(200).json(articlePictures);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching articlePicture" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;

    const articlePicture = await ArticlePicture.findByPk(id);

    if (!articlePicture) {
      return res.status(404).json({ message: "ArticlePicture not found" });
    }

    res.status(200).json(articlePicture);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching articlePicture" });
  }
};

export const create = async (req, res) => {
  try {
    const articleId = req.body.ArticleId;

    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const { picture } = req.body;
    const articlePicture = await article.createPicture({ picture });

    res
      .status(201)
      .json({ message: "ArticlePicture has been created", articlePicture });
  } catch (error) {
    res.status(500).json({ error: "Error in sending articlePicture" });
  }
};

export const updateById = async (req, res) => {
  try {
    const articleId = req.body.ArticleId;
    const { id } = req.params;

    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const { picture } = req.body;

    const articlePictures = await article.getPictures({ where: { id: id } });
    const articlePicture = articlePictures[0];

    if (!articlePicture) {
      return res.status(404).json({ message: "ArticlePicture not found" });
    }

    await articlePicture.update({ picture }, { where: { id: id } });

    res
      .status(200)
      .json({ message: "ArticlePicture has been updated", articlePicture });
  } catch (error) {
    res.status(500).json({ error: "Error in updating articlePicture" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const articleId = req.body.ArticleId;
    const { id } = req.params;

    const article = await Article.findByPk(articleId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const articlePicture = await ArticlePicture.findByPk(id);

    if (!articlePicture) {
      return res.status(404).json({ message: "ArticlePicture not found" });
    }

    await articlePicture.destroy();
    res.status(200).json({ message: "ArticlePicture has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting articlePicture" });
  }
};
