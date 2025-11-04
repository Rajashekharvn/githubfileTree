const express = require('express');
const router = express.Router();
const { getTree } = require('../controllers/treeController');

router.post('/', getTree);

module.exports = router;
