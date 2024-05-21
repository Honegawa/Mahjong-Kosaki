import { Article } from "../models/index.js";

export const getAll = async (req, res) => {
  try {
    const articles = await Article.findAll();

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching article" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching article" });
  }
};

export const create = async (req, res) => {
  try {
    const article = await Article.create(req.body);

    res.status(201).json({ message: "Article has been created", article });
  } catch (error) {
    res.status(500).json({ error: "Error in sending article" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.update(
      {
        title,
        content,
      },
      {
        where: {
          id: id,
        },
      }
    );

    res.status(200).json({ message: "Article has been updated", article });
  } catch (error) {
    res.status(500).json({ error: "Error in updating article" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.destroy();
    res.status(200).json({ message: "Article has been deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error in deleting article" });
  }
};
