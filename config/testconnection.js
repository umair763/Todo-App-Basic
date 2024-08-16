import sql from 'mssql';
import dotenv from 'dotenv';

dotenv.config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT, 10) || 1433,
    options: {
        encrypt: true,
        trustServerCertificate: false,
    },
};

sql.connect(config)
    .then((pool) => {
        if (pool.connected) {
            console.log('Connected to SQL Server');
        }
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });
