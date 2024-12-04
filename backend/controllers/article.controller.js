import { Article, ArticlePicture } from "../models/index.js";
import sharp from "sharp";
import fs from "fs";

export const getAll = async (req, res) => {
  try {
    const articles = await Article.findAll({ include: "pictures" });

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ error: "Error in fetching article" });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, { include: "pictures" });

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
    const { title, content } = req.body;
    const { files } = req;

    const newPictures = [];
    if (files && files.length > 0) {
      files.map((file) => {
        const { buffer } = file;
        const outputFile = `images/${crypto.randomUUID()}.webp`;
        const outputUrl = `${req.protocol}://${req.get("host")}/${outputFile}`;

        sharp(buffer)
          .resize(800, 800, { fit: "inside" })
          .webp({ lossless: true })
          .toFile(outputFile);

        newPictures.push({ picture: outputUrl });
      });
    }

    const article = await Article.create(
      {
        title,
        content,
        pictures: newPictures,
      },
      {
        include: {
          model: ArticlePicture,
          as: "pictures",
        },
      }
    );

    res
      .status(201)
      .json({ message: "Article has been created", newArticle: article });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in sending article" });
  }
};

export const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, removedPictures } = req.body;
    const { files } = req;

    const parsedRemovedPictures = removedPictures
      ? JSON.parse(JSON.stringify(removedPictures))
      : [];

    // Add pictures
    const newPictures = [];
    if (files && files.length > 0) {
      files.map((file) => {
        const { buffer } = file;
        const outputFile = `images/${crypto.randomUUID()}.webp`;
        const outputUrl = `${req.protocol}://${req.get("host")}/${outputFile}`;

        sharp(buffer)
          .resize(800, 800, { fit: "inside" })
          .webp({ lossless: true })
          .toFile(outputFile);

        newPictures.push({ picture: outputUrl });
      });
    }

    // Remove pictures
    parsedRemovedPictures.map((pic) => {
      const filename = pic.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () =>
        console.log(`${filename} has been deleted.`)
      );
    });

    const article = await Article.findByPk(id, {
      include: {
        model: ArticlePicture,
        as: "pictures",
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    await article.update({ title, content });

    // Create association records
    await Promise.all(
      newPictures.map((pic) => article.createPicture({ picture: pic.picture }))
    );

    // Delete association records
    const removedIds = parsedRemovedPictures.map((pic) => Number(pic.id));
    const filteredPictures = article.pictures.filter((pic) => {
      return removedIds.includes(pic.id);
    });
    await Promise.all(filteredPictures.map((pic) => pic.destroy()));

    // Refresh instance
    await article.reload();

    res.status(200).json({
      message: "Article has been updated",
      updatedArticle: article,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in updating article" });
  }
};

export const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id, {
      include: {
        model: ArticlePicture,
        as: "pictures",
      },
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    article.pictures.map((pic) => {
      const filename = pic.picture.split("/images/")[1];
      fs.unlink(`images/${filename}`, () =>
        console.log(`${filename} has been deleted.`)
      );
    });

    await article.destroy();
    res.status(200).json({ message: "Article has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error in deleting article" });
  }
};
