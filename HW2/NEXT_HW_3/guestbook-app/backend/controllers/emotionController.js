// constant, 미들웨어 설정
const EMOTION_TYPES = {
    HEART: 'HEART',
    LIKE: 'LIKE',
    CHECK: 'CHECK',
    LAUGH: 'LAUGH',
    WOW: 'WOW',
    SAD: 'SAD',
};

// POST: 감정표현 남기기
const addEmotion = async (req, res) => {
    const { message_id, emotion_type } = req.body;

    try {
        // emotions 등록
        const result = await pool.query('INSERT INTO emotions (message_id, emotion_type) VALUES ($1, $2) RETURNING *', [
            message_id,
            emotion_type,
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
        const result = await pool.query('SELECT emotion_type FROM emotions WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            const updateResult = await pool.query('UPDATE emotions SET emotion_type = $1 WHERE id = $2 RETURNING *', [
                emotion_type,
                id,
            ]);
            res.json(updateResult.rows[0]);
        } else {
            res.status(403).json({ error: '존재하지 않는 감정표현입니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE: 감정표현 삭제하기
const deleteEmotion = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT emotion_type FROM emotions WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            const updateResult = await pool.query('DELETE FROM emotions WHERE id = $1', [id]);
            res.json(updateResult.rows[0]);
        } else {
            res.status(403).json({ error: '이미 삭제된 감정표현입니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addEmotion, updateEmotion, deleteEmotion };
