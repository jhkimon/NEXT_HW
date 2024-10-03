const express = require('express');
const cors = require('cors');
require('dotenv').config();

const guestbookRoutes = require('./routes/guestbookRoutes');
const replyRoutes = require('./routes/replyRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// 라우터 연결
app.use('/api/guestbook', guestbookRoutes);
app.use('/api/reply', replyRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
