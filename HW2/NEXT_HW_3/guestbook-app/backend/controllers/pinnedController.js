const pool = require('../config/db');

// GET: 상단고정 게시물 가져오기
const getPinned = async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT 
                g.id,
                g.message
            FROM 
                guestbook g
            WHERE
                g.is_pinned = TRUE
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// UPDATE: 상단 고정 추가 및 해제
const updatePinned = async (req, res) => {
    const { id } = req.params;
    const { is_pinned } = req.body;

    try {
        // 트랜잭션 시작
        await pool.query('BEGIN');

        if (is_pinned) {
            // 다른 상단 고정 게시물이 있는지 확인 후 해제
            await pool.query('UPDATE guestbook SET is_pinned = false WHERE is_pinned = true');
        }

        // 현재 게시물의 상단 고정 상태 업데이트
        const updateResult = await pool.query('UPDATE guestbook SET is_pinned = $1 WHERE id = $2 RETURNING *', [
            is_pinned,
            id,
        ]);

        // 트랜잭션 커밋
        await pool.query('COMMIT');

        res.json(updateResult.rows[0]);
    } catch (err) {
        // 에러 발생 시 롤백
        await pool.query('ROLLBACK');
        res.status(500).json({ error: '상단 고정을 처리하는 중에 에러가 발생했습니다.' });
    }
};

module.exports = { getPinned, updatePinned };
