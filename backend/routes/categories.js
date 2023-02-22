const express = require("express");

const {
  getCategory,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories");

// const { verifyToken } = require("../middlewares/verifyToken")

const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);
categoriesRouter.post("/", createCategory);
categoriesRouter.get("/:id", getCategory);
categoriesRouter.put("/:id", updateCategory);
categoriesRouter.delete("/:id", deleteCategory);

module.exports = {
    categoriesRouter,
};
