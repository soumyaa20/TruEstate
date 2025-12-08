// backend/src/controllers/salesController.js
const salesService = require('../services/salesService');

exports.getSales = async (req, res) => {
  try {
    const { data, pagination } = await salesService.fetchSales(req.query);
    res.json({ data, pagination });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid request', error: err.message });
  }
};
