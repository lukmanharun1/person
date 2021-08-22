const express = require('express')
const router = express.Router();

const person = require('./person');

router.get('/', (req, res) => {
    res.send({
        status: 'success',
        message: 'oke'

    })
})
module.exports = router;