// backend/src/services/salesService.js
const Sale = require('../models/Sale');
const buildSalesQuery = require('../utils/buildSalesQuery');

exports.fetchSales = async (queryParams) => {
  const {
    page = 1,
    pageSize = 10,
    sortBy = 'date',
    sortOrder = 'desc',
  } = queryParams;

  const { mongoFilter, sortConfig } = buildSalesQuery(queryParams);

  const pageNum = Number(page);
  const sizeNum = Number(pageSize);

  const [data, totalItems] = await Promise.all([
    Sale.find(mongoFilter)
      .sort(sortConfig)
      .skip((pageNum - 1) * sizeNum)
      .limit(sizeNum),
    Sale.countDocuments(mongoFilter),
  ]);

  const totalPages = Math.ceil(totalItems / sizeNum);

  return {
    data,
    pagination: { page: pageNum, pageSize: sizeNum, totalPages, totalItems },
  };
};
