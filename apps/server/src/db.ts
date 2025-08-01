import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();


async function main() {
  try {
    await prisma.$connect();
    console.log("Database connected successfully");
  } catch (e) {
    console.error("Error connecting to DB:", e);
  }
}

main();