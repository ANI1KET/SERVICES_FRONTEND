import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient({
    log: ["query", "info", "warn", "error"],
  });
} else {
  // @ts-expect-error: This is to prevent TypeScript errors about the global variable
  if (!global.prisma) {
    // @ts-expect-error: This is to prevent TypeScript errors about the global variable
    global.prisma = new PrismaClient({
      log: ["query", "info", "warn", "error"],
    });
  }
  // @ts-expect-error: This is to prevent TypeScript errors about the global variable
  prisma = global.prisma;
}

export default prisma;
