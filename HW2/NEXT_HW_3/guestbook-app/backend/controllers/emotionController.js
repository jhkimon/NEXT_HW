const pool = require('../config/db');

const EMOTION_TYPES = {
    HEART: 'HEART',
    LIKE: 'LIKE',
    CHECK: 'CHECK',
    LAUGH: 'LAUGH',
    WOW: 'WOW',
    SAD: 'SAD',
};

// POST: 감정표현 남기기 (감정 추가)
const addEmotion = async (req, res) => {
    const { message_id, emotion_type } = req.body;

    try {
        const result = await pool.query('UPDATE guestbook SET emotion_type = $1 WHERE id = $2 RETURNING *', [
            emotion_type,
            message_id,
        ]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE: 감정표현 수정하기
const updateEmotion = async (req, res) => {
    const { id } = req.params;
    const { emotion_type } = req.body;

    try {
        const result = await pool.query('UPDATE guestbook SET emotion_type = $1 WHERE id = $2 RETURNING *', [
            emotion_type,
            id,
        ]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE: 감정표현 삭제하기 (감정 초기화)
const deleteEmotion = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query('UPDATE guestbook SET emotion_type = NULL WHERE id = $1 RETURNING *', [id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addEmotion, updateEmotion, deleteEmotion };
