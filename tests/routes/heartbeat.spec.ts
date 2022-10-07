import { describe, it } from "mocha";
import { expect } from "chai";
import supertest from "supertest";
import { ExpressAppFactory } from "../../src/app";
import { routes } from "../../src/routes";

describe("Test /heartbeat", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: routes,
  });

  it("heartbeat should be current date", async () => {
    const currentDate = new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());

    const actualResult = await supertest(app)
      .get("/heartbeat")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    expect(actualResult)
      .to.have.property("date")
      .that.match(new RegExp("^" + currentDate.toString() + ".*", "g"));
  });
});
