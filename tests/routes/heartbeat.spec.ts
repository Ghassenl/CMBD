import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { heartbeatRouter } from "../../src/routes/heartbeat";
import express from "express";

describe("Test /heartbeat", () => {
  const app = express();
  app.use(heartbeatRouter);

  it("heartbeat should be current date", async () => {
    const currentDate = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const actualResult = await supertest(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    expect(actualResult)
      .to.have.property("date")
      .that.match(new RegExp("^" + currentDate.toString() + ".*", "g"));
  });
});
