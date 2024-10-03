const pool = require('../config/db');

// 방명록 항목 추가
const addGuestbook = async (req, res) => {
    const { name, message, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO guestbook (name, message, password) VALUES ($1, $2, $3) RETURNING *',
            [name, message, password]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 방명록 항목 가져오기
const getGuestbook = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                g.id, 
                g.name, 
                g.message, 
                g.created_at, 
                COUNT(CASE WHEN e.emotion_type = 'HEART' THEN 1 END) AS heart_count,
                COUNT(CASE WHEN e.emotion_type = 'LIKE' THEN 1 END) AS like_count,
                COUNT(CASE WHEN e.emotion_type = 'CHECK' THEN 1 END) AS check_count,
                COUNT(CASE WHEN e.emotion_type = 'LAUGH' THEN 1 END) AS laugh_count,
                COUNT(CASE WHEN e.emotion_type = 'WOW' THEN 1 END) AS wow_count,
                COUNT(CASE WHEN e.emotion_type = 'SAD' THEN 1 END) AS sad_count,
                (SELECT json_agg(r) FROM replies r WHERE r.guestbook_id = g.id) AS replies
            FROM 
                guestbook g
            LEFT JOIN 
                emotions e ON g.id = e.message_id
            GROUP BY 
                g.id
            ORDER BY 
                g.id DESC
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 방명록 항목 수정
const updateGuestbook = async (req, res) => {
    const { id } = req.params;
    const { message, password } = req.body;
    try {
        const result = await pool.query('SELECT password FROM guestbook WHERE id = $1', [id]);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            const updateResult = await pool.query('UPDATE guestbook SET message = $1 WHERE id = $2 RETURNING *', [
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

// 방명록 항목 삭제
const deleteGuestbook = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const result = await pool.query('SELECT password FROM guestbook WHERE id = $1', [id]);
        if (result.rows.length > 0 && result.rows[0].password === password) {
            await pool.query('DELETE FROM guestbook WHERE id = $1', [id]);
            res.json({ message: '삭제되었습니다.' });
        } else {
            res.status(403).json({ error: '비밀번호가 일치하지 않습니다.' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addGuestbook, getGuestbook, updateGuestbook, deleteGuestbook };
