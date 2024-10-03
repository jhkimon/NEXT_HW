const express = require('express');
const router = express.Router();
const { addGuestbook, getGuestbook, updateGuestbook, deleteGuestbook } = require('../controllers/guestbookController');

router.post('/', addGuestbook);
router.get('/', getGuestbook);
router.put('/:id', updateGuestbook);
router.delete('/:id', deleteGuestbook);

module.exports = router;
