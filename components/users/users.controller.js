const { pool } = require("../../lib/db");

// @desc    GET data produk
exports.getProducts = async (req, res, next) => {
  const query = `SELECT * FROM products`;

  try {
    const result = await pool.query(query);
    res.status(200).json({
      success: true,
      count: result.rows.length,
      data: result.rows,
      code: 200
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getProduct = async (req, res, next) => {
  const { id } = req.params;
  const query = `SELECT * FROM products WHERE id=${id}`;

  try {
    const result = await pool.query(query);
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
};