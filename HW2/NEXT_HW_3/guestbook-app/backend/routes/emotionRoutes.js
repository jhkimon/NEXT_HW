const express = require('express');
const router = express.Router();
const { addEmotion, updateEmotion, deleteEmotion } = require('../controllers/emotionController');

router.post('/', addEmotion);
router.put('/:id', updateEmotion);
router.delete('/:id', deleteEmotion);

module.exports = router;
