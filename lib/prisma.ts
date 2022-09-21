import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  let prismaGlobal = global as typeof globalThis & {
    prisma: PrismaClient;
  };
  if (!prismaGlobal.prisma) {
    prismaGlobal.prisma = new PrismaClient();
  }
  prisma = prismaGlobal.prisma;
}

export default prisma;
