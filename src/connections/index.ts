import { SQLiteDatabase } from "../database";

class getDatabaseConnection {
  private static database = new SQLiteDatabase();

  public static getConnection(): SQLiteDatabase {
    return this.database;
  }
}

export { getDatabaseConnection };
