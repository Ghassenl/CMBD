import { SQLiteDatabase } from "../database";

class DatabaseFactory {
  private static database = new SQLiteDatabase();

  public static getConnection(): SQLiteDatabase {
    return this.database;
  }
}

export { DatabaseFactory };
