const express = require('express');
const router = express.Router();
const { addGuestbook, getGuestbook, updateGuestbook, deleteGuestbook } = require('../controllers/guestbookController');
const { updatePinned, getPinned } = require('../controllers/pinnedController');
const { addEmotion, updateEmotion, deleteEmotion } = require('../controllers/emotionController');

router.post('/', addGuestbook);
router.get('/', getGuestbook);
router.put('/:id', updateGuestbook);
router.delete('/:id', deleteGuestbook);

router.get('/pin', getPinned);
router.put('/pin/:id', updatePinned);

router.post('/emotion/', addEmotion);
router.put('/emotion/:id', updateEmotion);
router.delete('/emotion/:id', deleteEmotion);

module.exports = router;
