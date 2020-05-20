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

  if (!input || !input.src) {
    res.json({})
    return
  }

  res.json(msgDecode(input.src))

  // console.log('--- req.method: ', req.method)
  // console.log('--- req.query:', req.query)
  // console.log('--- req.body:', req.body)
})

module.exports = router;
