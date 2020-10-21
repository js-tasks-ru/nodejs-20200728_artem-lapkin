const Category = require('../models/Category');

const mapSubcategory = (subcategory) => {
  return {
    id: subcategory.id,
    title: subcategory.title
  }
};

const mapCategory = (category) => {
  return {
    id: category.id,
    title: category.title,
    subcategories: category.subcategories.map(mapSubcategory)
  }
};

module.exports.categoryList = async function categoryList(ctx, next) {
  const categories = await Category.find();

  ctx.body = {categories: categories.map(mapCategory)};
};