const express = require('express');
const router = express.Router();
const msgDecode = require('../msg')


router.all('/encode', (req, res) => {
  res.json({
    code: 0,
    hex: 'msgpack encoded string'
  })
})

// input: { src: '\xNN hex string' }
router.all('/decode', (req, res) => {
  let input
  if (req.method == 'GET') {
    input = req.query
  } else {
    input = req.body
  }

  // console.log(JSON.stringify(input))

  if (!input || !input.src) {
    res.json({})
    return
  }

  res.json(msgDecode(input.src))
})

module.exports = router;
