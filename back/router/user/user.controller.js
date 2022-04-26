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

exports.score = async (req, res) => {
  const { idx, score } = req.body;

  const conn = await pool.getConnection();
  try {
    const selectSql = `SELECT bestScore FROM user WHERE u_id=${idx}`;
    const updateSql = `UPDATE user SET bestScore=${score} WHERE u_id=${idx}`;
    const [[{ bestScore }]] = await conn.query(selectSql);
    const curScore = Number(bestScore);
    if (curScore === 0 || curScore > score) {
      await conn.query(updateSql);
    }
    res.send(true);
  } catch (err) {
    res.status(500).send(false);
  } finally {
    conn.release();
  }
};
