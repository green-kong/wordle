const { decodePayload } = require('../../util/jwt/jwt.js');
const { pool } = require('../../model/db/db.js');

exports.login = async (req, res) => {
  const { token } = req.body;

  const { userid } = await decodePayload(token);

  const conn = await pool.getConnection();
  try {
    const sql = `SELECT * FROM user WHERE userid=${userid}`;
    const [[result]] = await conn.query(sql);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(false);
  } finally {
    conn.release();
  }
};
