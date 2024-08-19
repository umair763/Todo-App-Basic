import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import sql from 'mssql';
import dbConfig from '../config/dbConfig.js';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then((pool) => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch((err) => console.log('Database Connection Failed!', err));

// Message endpoint
app.get('/api/message', (req, res) => {
    res.json({ text: 'Hello, world!' });
});

// Add Task
app.post('/api/tasks', async (req, res) => {
    const { color, task, date, time, status } = req.body;
    try {
        const pool = await poolPromise;
        await pool
            .request()
            .input('Color', sql.NVarChar, color)
            .input('Task', sql.NVarChar, task)
            .input('Date', sql.NVarChar, date)
            .input('Time', sql.NVarChar, time)
            .input('Status', sql.Bit, status).query(`INSERT INTO tasks (color, task, date, time, status)
                    VALUES (@Color, @Task, @Date, @Time, @Status)`);
        res.json({ success: true });
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send(err.message);
    }
});

// Fetch Tasks
app.get('/api/tasks', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM tasks');
        res.json(result.recordset);
    } catch (err) {
        console.error('SQL error', err);
        res.status(500).send(err.message);
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
