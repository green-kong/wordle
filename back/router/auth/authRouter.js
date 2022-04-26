const express = require('express');

const router = express.Router();

router.get('/kakako', (req, res) => {
  res.send('check');
});

module.exports = router;
