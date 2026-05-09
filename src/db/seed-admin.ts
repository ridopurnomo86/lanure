import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { hash } from "bcrypt-ts";
import * as dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });

  console.log("⏳ Seeding admin user...");

  const email = "admin@lanure.com";
  const password = "admin123_password"; // Change this!
  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(schema.admin).values({
      email,
      password: hashedPassword,
      username: "admin",
      fullName: "System Admin",
    }).onConflictDoNothing();

    console.log(`✅ Admin user seeded!`);
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
  } catch (error) {
    console.error("❌ Seeding failed");
    console.error(error);
  }

  process.exit(0);
};

seedAdmin().catch((err) => {
  console.error("❌ Script failed");
  console.error(err);
  process.exit(1);
});
