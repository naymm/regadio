import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const dbConfig: any = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'regadio_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
};

// Adicionar SSL se necessário (para PlanetScale, Railway, etc)
if (process.env.DB_SSL === 'true') {
    dbConfig.ssl = {
        rejectUnauthorized: true,
    };
}

const pool = mysql.createPool(dbConfig);

// Test connection
pool.getConnection()
    .then((connection) => {
        console.log('✅ MySQL connected successfully');
        console.log(`📍 Host: ${dbConfig.host}`);
        connection.release();
    })
    .catch((error) => {
        console.error('❌ MySQL connection error:', error.message);
    });

export default pool;
