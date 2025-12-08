// backend/src/utils/buildSalesQuery.js
module.exports = function buildSalesQuery(params) {
  const {
    search,
    region,
    gender,
    ageMin,
    ageMax,
    category,
    tags,
    paymentMethods,
    startDate,
    endDate,
    sortBy,
    sortOrder,
  } = params;

  const mongoFilter = {};

  // 🔍 Search in name or phone (case-insensitive)
  if (search) {
    const regex = new RegExp(search, "i");
    mongoFilter.$or = [{ customerName: regex }, { phoneNumber: regex }];
  }

  // 🌍 Region (multi-select)
  if (region) {
    mongoFilter.customerRegion = { $in: region.split(",") };
  }

  // 🚻 Gender (multi-select)
  if (gender) {
    mongoFilter.gender = { $in: gender.split(",") };
  }

  // 🏷 Product Category (multi-select)
  if (category) {
    mongoFilter.productCategory = { $in: category.split(",") };
  }

  // 🏷 Tags (multi-select)
  if (tags) {
    mongoFilter.tags = { $in: tags.split(",") };
  }

  // 💳 Payment Method (multi-select)
  if (paymentMethods) {
    mongoFilter.paymentMethod = { $in: paymentMethods.split(",") };
  }

  // 👤 Age range
  if (ageMin || ageMax) {
    mongoFilter.age = {};
    if (ageMin) mongoFilter.age.$gte = Number(ageMin);
    if (ageMax) mongoFilter.age.$lte = Number(ageMax);
  }

  // 📅 Date range
  if (startDate || endDate) {
    mongoFilter.date = {};
    if (startDate) mongoFilter.date.$gte = new Date(startDate);
    if (endDate) mongoFilter.date.$lte = new Date(endDate);
  }

  // ↕ Sorting
  const sortFieldMap = {
    date: "date",
    quantity: "quantity",
    customerName: "customerName",
  };

  const field = sortFieldMap[sortBy] || "date";
  const direction = sortOrder === "asc" ? 1 : -1;
  const sortConfig = { [field]: direction };

  return { mongoFilter, sortConfig };
};
