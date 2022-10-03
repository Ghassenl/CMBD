import { PrismaClient } from "@prisma/client";
import { DatabaseServer } from "./db_server";

interface ISQLiteDatabase {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  getClient(): PrismaClient;
}

class SQLiteDatabase implements ISQLiteDatabase {
  private prisma: PrismaClient = new PrismaClient();

  servers: DatabaseServer = new DatabaseServer();

  async connect(): Promise<void> {
    try {
      return this.prisma.$connect();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  getClient(): PrismaClient {
    try {
      return this.prisma;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export { SQLiteDatabase };
