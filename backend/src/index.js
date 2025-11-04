require('dotenv').config();
const express = require('express');
const cors = require('cors');
const treeRoutes = require('./routes/treeRoutes');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/api/tree', treeRoutes);

app.get('/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.listen(PORT, () => logger.info(`✅ Backend running at http://localhost:${PORT}`));
