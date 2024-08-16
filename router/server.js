import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import sql from '../config/dbConfig.js'; // Adjust the path if necessary

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Test DB connection
app.get('/test-db', async (req, res) => {
    try {
        await sql.query('SELECT 1 AS test');
        res.send('Database connection successful');
    } catch (err) {
        res.status(500).send('Database connection failed');
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../public/dist')));

// Catch-all to serve the React app on any route not handled by your API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dist', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
