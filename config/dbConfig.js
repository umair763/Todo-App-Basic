import dotenv from 'dotenv';
import sql from 'mssql';

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST, // Ensure this is a valid string
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: true, // Use encryption for Azure SQL Database
        trustServerCertificate: false, // Set to true if you encounter certificate issues
    },
};

// Log configuration to verify values
console.log('Database Configuration:', config);

const poolPromise = sql
    .connect(config)
    .then((pool) => {
        console.log('Database connected successfully.');
        return pool;
    })
    .catch((err) => {
        console.error('Error connecting to the database:', err);
    });

export default poolPromise;
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
