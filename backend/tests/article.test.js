process.env.NODE_ENV = "test";

import { jest } from "@jest/globals";
import {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
} from "../controllers/article.controller.js";
import fs from "fs";
import { Article, ArticlePicture } from "../models/index.js";

/***
 *
 * This file doesn't include file related tests
 *
 */
const articlePicture = {
  id: 1,
  picture: "http://mahjong-kosaki/images/image.webp",
  ArticleId: 1,
};

const article1 = {
  title: "Titre 1",
  content: "Lorem ipsum dolor sit amet",
  pictures: [articlePicture],
};
const foundArticle1 = Article.build(
  { ...article1, id: 1 },
  {
    include: {
      model: ArticlePicture,
      as: "pictures",
    },
  }
);
const article2 = {
  title: "Titre 2",
  content: "Lorem ipsum dolor sit amet",
  pictures: [],
};
const foundArticle2 = Article.build(
  { ...article2, id: 2 },
  {
    include: {
      model: ArticlePicture,
      as: "pictures",
    },
  }
);

const allArticles = [foundArticle1, foundArticle2];

/**
 * GETALL
 */

describe("Tests for getAll", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  beforeEach(() => {
    Article.findAll = jest.fn();
    Article.findAll.mockImplementation(() => {
      return allArticles;
    });
  });

  it("Found articles : should return status 200 with an array", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    await getAll(req, res);
    expect(Article.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(allArticles);
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    const mockedRequest = () => {
      return {};
    };
    const req = mockedRequest();
    Article.findAll.mockRejectedValue(new Error("Unexpected error"));
    await getAll(req, res);
    expect(Article.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching article",
    });
  });
});

/**
 * GETBYID
 */

describe("Tests for getById", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const mockedRequest = () => {
    return { params: { id: 1 } };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Article.findByPk = jest.fn();
    Article.findByPk.mockImplementation(() => {
      return article1;
    });
  });

  it("Found article : should return status 200 with the found article", async () => {
    await getById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(article1);
  });

  it("Not found article : should return status 404 with a specific message", async () => {
    Article.findByPk.mockImplementation(() => {
      return null;
    });
    await getById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Article not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Article.findByPk.mockRejectedValue(new Error("Unexpected error"));
    await getById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in fetching article",
    });
  });
});

/**
 * CREATE
 */
describe("Tests for create", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const body = { title: article1.title, content: article1.content };
  const noImgMockedRequest = () => {
    return { body };
  };
  const noImgReq = noImgMockedRequest();

  beforeEach(() => {
    Article.create = jest.fn();
    Article.create.mockImplementation((args) => {
      return Article.build(
        { ...args, id: 1 },
        {
          include: {
            model: ArticlePicture,
            as: "pictures",
          },
        }
      ).dataValues;
    });
    Article.findOne = jest.fn();
  });

  it("Valid article without image : should return status 201 and a confirmation message", async () => {
    await create(noImgReq, res);
    expect(Article.create).toHaveBeenCalledTimes(1);
    expect(Article.create).toHaveBeenCalledWith(
      { ...noImgReq.body, pictures: [] },
      {
        include: {
          model: ArticlePicture,
          as: "pictures",
        },
      }
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Article has been created",
      newArticle: { ...noImgReq.body, id: 1, pictures: [] },
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    Article.create.mockRejectedValue(new Error("Unexpected error"));
    await create(noImgReq, res);
    expect(Article.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in creating article",
    });
  });
});

/**
 * UPDATE
 */
describe("Tests for update", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const toUpdateObject = { title: "update" };
  const mockedRequest = () => {
    return { params: { id: 1 }, body: toUpdateObject };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Article.findByPk = jest.fn();
    Article.findByPk.mockImplementation(() => {
      return foundArticle1;
    });
    foundArticle1.update = jest.fn();
    foundArticle1.update.mockImplementation(() => {
      return foundArticle1;
    });
    foundArticle1.reload = jest.fn();
    fs.unlink = jest.fn();
  });

  it("Found article and edit with unchanged pictures : should return status 200 with the updated article", async () => {
    await updateById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(foundArticle1.update).toHaveBeenCalledTimes(1);
    expect(foundArticle1.update).toHaveBeenCalledWith({
      title: toUpdateObject.title,
    });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Article has been updated",
      updatedArticle: foundArticle1,
    });
  });

  it("Not found article : should return status 404 with a specific message", async () => {
    Article.findByPk.mockImplementation(() => {
      return null;
    });
    await updateById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(foundArticle1.update).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Article not found" });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundArticle1.update.mockRejectedValue(new Error("Unexpected error"));
    await updateById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(foundArticle1.update).toHaveBeenCalledTimes(1);
    expect(foundArticle1.update).toHaveBeenCalledWith(toUpdateObject);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in updating article",
    });
  });
});

/**
 * DELETE
 */
describe("Tests for delete", () => {
  const mockedResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const res = mockedResponse();

  const mockedRequest = () => {
    return { params: { id: 1 } };
  };
  const req = mockedRequest();

  beforeEach(() => {
    Article.findByPk = jest.fn();
    Article.findByPk.mockImplementation(() => {
      return foundArticle1;
    });
    foundArticle1.destroy = jest.fn();
    foundArticle2.destroy = jest.fn();
    fs.unlink = jest.fn();
  });

  it("Deleted article with pictures : should return status 200 with a message", async () => {
    await deleteById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(fs.unlink).toHaveBeenCalledTimes(1);
    expect(foundArticle1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Article has been deleted",
    });
  });

  it("Deleted article without pictures : should return status 200 with a message", async () => {
    Article.findByPk.mockImplementation(() => {
      return foundArticle2;
    });
    await deleteById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(fs.unlink).not.toHaveBeenCalled();
    expect(foundArticle2.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Article has been deleted",
    });
  });

  it("Not found article : should return status 404 with a specific message", async () => {
    Article.findByPk.mockImplementation(() => {
      return null;
    });
    await deleteById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(foundArticle1.destroy).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Article not found",
    });
  });

  it("Unexpected error : should return status 500 with a specific message", async () => {
    foundArticle1.destroy.mockRejectedValue(new Error("Unexpected error"));
    await deleteById(req, res);
    expect(Article.findByPk).toHaveBeenCalledTimes(1);
    expect(foundArticle1.destroy).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error in deleting article",
    });
  });
});
