const express = require('express');
const router = express.Router();
const { addReply, getReply, updateReply, deleteReply } = require('../controllers/replyController');

router.post('/', addReply);
router.get('/:guestbook_id', getReply);
router.put('/:id', updateReply);
router.delete('/:id', deleteReply);

module.exports = router;
