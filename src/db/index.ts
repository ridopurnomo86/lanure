/* eslint-disable @typescript-eslint/no-explicit-any */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  if (process.env.NODE_ENV === "production") {
    console.error("❌ DATABASE_URL is not set!");
  }
}

let sql: any;
if (databaseUrl) {
  sql = neon(databaseUrl);
}

export const db = sql ? drizzle(sql, { schema }) : (null as any);
