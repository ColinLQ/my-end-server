const pool = require('../lib');

async function getPlates({ page, per_page, offset }) {
  const sql = `SELECT * FROM plates WHERE id = ${id}`
  const data = await pool.query(sql);
  return data;
}

async function create(values) {
  console.log(values);
  const sql = 'INSERT INTO plates set title = ?, `desc` = ?, author = ?'
  const plate = await pool.query(sql, values);
  return plate;
}

module.exports = {
  getPlates,
  create,
}

