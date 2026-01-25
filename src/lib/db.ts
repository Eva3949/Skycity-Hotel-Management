import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "../db/schema";
import 'dotenv/config';
import "server-only";
const connectionString = process.env.DATABASE_URL!;

// Prevent multiple pools in development
const globalForDb = global as unknown as { pool: mysql.Pool | undefined };

const poolConnection = globalForDb.pool ?? mysql.createPool({
  uri: connectionString,
  connectionLimit: 1,
  maxIdle: 1,
  idleTimeout: 30000, // Reduced from 60s to 30s
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000, // 10s delay
  waitForConnections: true,
  queueLimit: 0,
});

if (process.env.NODE_ENV !== "production") globalForDb.pool = poolConnection;

export const db = drizzle(poolConnection, { schema, mode: 'default' });
