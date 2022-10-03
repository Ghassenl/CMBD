import http from "http";
import { app } from "./app";
import config from "./configs";
import { DatabaseFactory } from "./connections";

const server = http.createServer(app);

server.addListener("listening", () => {
  console.info("The server is running!");
});

const databaseConnection = DatabaseFactory.getConnection();

try {
  databaseConnection.connect().then(async () => {
    console.info("Database connection initialized!");
  });
} catch (databaseError) {
  console.error("Database connection Error: ", databaseError);
  throw databaseError;
}

server.listen({
  port: config.port,
});
