const pool = require('../config/db');

// POST: 답글 달기
const addReply = async (req, res) => {
    const { guestbook_id, name, message, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO replies (guestbook_id, name, message, password) VALUES ($1, $2, $3, $4) RETURNING *',
            [guestbook_id, name, message, password]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// GET: 답글 조회
const getReply = async (req, res) => {
    const { guestbook_id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM replies WHERE guestbook_id = $1 ORDER BY created_at ASC', [
            guestbook_id,
        ]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUT: 답글 수정
const updateReply = async (req, res) => {
    const { id } = req.params;
    const { message, password } = req.body;
    try {
        const result = await pool.query('SELECT password FROM replies WHERE id = $1', [id]);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            const updateResult = await pool.query('UPDATE replies SET message = $1 WHERE id = $2 RETURNING *', [
                message,
                id,
            ]);
            res.json(updateResult.rows[0]);
        } else {
            res.status(403).json({ error: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// DELETE: 답글 삭제
const deleteReply = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const result = await pool.query('SELECT password FROM replies WHERE id = $1', [id]);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            await pool.query('DELETE FROM replies WHERE id = $1', [id]);
            res.json({ message: '삭제되었습니다.' });
        } else {
            res.status(403).json({ error: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addReply, getReply, updateReply, deleteReply };
