import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import poolPromise from '../config/dbConfig.js'; // Adjust path based on location

const app = express();

// Serve static files from the React app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../public/dist')));

// Catch-all to serve the React app on any route not handled by your API
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Test database connection
poolPromise
    .then((pool) => {
        console.log('Database connected successfully.');
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });
