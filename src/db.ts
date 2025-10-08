// src/db.ts

import dotenv from "dotenv";
import type { Pool } from "mysql2/promise";
import mysql from "mysql2/promise";

dotenv.config();

// Extensão do escopo global para evitar recriação do pool no Vercel
declare global {
  // Permite armazenar o pool globalmente (sem erro de tipo)
  // Isso evita o "connection closed" no ambiente serverless
  // eslint-disable-next-line no-var
  var _pool: Pool | undefined;
}

let pool: Pool;

if (!global._pool) {
  global._pool = mysql.createPool({
    host: process.env.DB_HOST!,
    user: process.env.DB_USER!,
    password: process.env.DB_PASS!,
    database: process.env.DB_NAME!,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  });
  console.log("✅ Novo pool de conexão MySQL criado");
}

pool = global._pool;

export const db = pool;
