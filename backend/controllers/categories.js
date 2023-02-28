const { Category } = require("../models/categories");
const { ErrorResponse } = require("../utils/ErrorResponse");

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({})
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    req.json(category);
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const { name, description, picture } = req.body;
    const category = await Category.create({
      name,
      description,
      picture,
    });
    res.json(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, picture } = req.body;

    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        picture,
      },
      { new: true }
    );

    res.json(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
