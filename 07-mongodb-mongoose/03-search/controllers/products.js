const Product = require('../models/Product');

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

module.exports.productsByQuery = async function productsByQuery(ctx, next) {
  const query = ctx.request.query.query;

  const products = await Product.find(
    { $text: { $search: query } }
  );

  ctx.body = {products: products.map(mapProduct)};
};
