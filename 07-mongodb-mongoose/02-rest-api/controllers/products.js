const Product = require('../models/Product');
const mongoose = require('mongoose');

const mapProduct = (product) => {
  return {
    id: product.id,
    title: product.title,
    images: product.images,
    category: product.category,
    subcategory: product.subcategory,
    price: product.price,
    description: product.description
  }
};

module.exports.productsBySubcategory = async function productsBySubcategory(ctx, next) {
  const subcategoryId = ctx.request.query.subcategory;

  if (!subcategoryId) return next();
  
  if (!mongoose.Types.ObjectId.isValid(subcategoryId)) {
    ctx.status = 400;
    ctx.body = {error: 'invalid id'};
    return;
  }

  const products = await Product.find({subcategory: subcategoryId});

  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productList = async function productList(ctx, next) {
  const products = await Product.find();

  ctx.body = {products: products.map(mapProduct)};
};

module.exports.productById = async function productById(ctx, next) {
  const product = await Product.findById(ctx.params.id);

  if(!product) {
    ctx.status = 404;
    ctx.body = {};
    return;
  }

  ctx.body = {product: mapProduct(product)};
};

