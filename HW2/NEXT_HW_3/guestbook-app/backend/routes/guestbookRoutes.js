const express = require('express');
const router = express.Router();
const { addGuestbook, getGuestbook, updateGuestbook, deleteGuestbook } = require('../controllers/guestbookController');
const { updatePinned, getPinned } = require('../controllers/pinnedController');
router.post('/', addGuestbook);
router.get('/', getGuestbook);
router.put('/:id', updateGuestbook);
router.delete('/:id', deleteGuestbook);

router.get('/pin', getPinned);
router.put('/pin/:id', updatePinned);

module.exports = router;
