import "dotenv/config";
import { hash } from "bcryptjs";
import { prisma } from "../lib/prisma";

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.warn("ADMIN_PASSWORD is not set. Skipping admin seed.");
  } else {
    const passwordHash = await hash(password, 12);
    await prisma.adminUser.upsert({
      where: { username },
      update: { passwordHash },
      create: { username, passwordHash }
    });
  }

  const count = await prisma.website.count();
  if (count === 0) {
    await prisma.website.createMany({
      data: [
        {
          name: "Vercel",
          url: "https://vercel.com",
          note: "Next.js application deployment platform.",
          sortOrder: 10
        },
        {
          name: "Neon",
          url: "https://neon.tech",
          note: "Serverless PostgreSQL database for this project.",
          sortOrder: 20
        }
      ]
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
