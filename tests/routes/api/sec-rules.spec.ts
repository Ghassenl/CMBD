import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { SecRulesService } from "../../../src/services";
import {
  ErrorStatusCode,
  ISecRule,
  ISecRuleCreateDTO,
  ISecRulePatchDTO,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /sec-rules", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) secRule [/sec-rules/1]", async () => {
    const items: ISecRule[] = [
      {
        id: 1,
        port: 80,
        direction: "IN",
        destination: "dunno",
        policy: "ACCEPT",
        id_sec_group: 1,
      },
    ];

    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/sec-rules/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) secRule [/sec-rules/1]", async () => {
    const items: ISecRule[] = [
      {
        id: 2,
        port: 80,
        direction: "IN",
        destination: "dunno",
        policy: "ACCEPT",
        id_sec_group: 1,
      },
    ];

    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/sec-rules/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "SecRule not found !",
    });
  });

  it("should get (GET) secRules List [/sec-rules]", async () => {
    const items: ISecRule[] = [
      {
        id: 1,
        port: 80,
        direction: "IN",
        destination: "dunno",
        policy: "ACCEPT",
        id_sec_group: 1,
      },
    ];

    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "readList",
    ).callsFake(async () => {
      return items;
    });

    const actualResult = await supertest(app)
      .get("/sec-rules")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should add (POST) secRule [/sec-rules]", async () => {
    const toSave = {
        port: 80,
        direction: "IN",
        destination: "dunno",
        policy: "ACCEPT",
      },
      expectedResult: ISecRule = {
        id: 1,
        port: 80,
        direction: "IN",
        destination: "dunno",
        policy: "ACCEPT",
        id_sec_group: 1,
      };

    const databaseSecRuleStub = Sinon.stub(SecRulesService, "create").callsFake(
      async (secRule: ISecRuleCreateDTO) => {
        return {
          id: 1,
          ...secRule,
        } as unknown as ISecRule;
      },
    );

    const actualResult = await supertest(app)
      .post("/sec-rules")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecRule successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) secRules List [/sec-rules]", async () => {
    const toSave: ISecRuleCreateDTO[] = [
        {
          port: 80,
          direction: "IN",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        },
        {
          port: 80,
          direction: "IN",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        },
      ],
      expectedResult: ISecRule[] = [
        {
          id: 1,
          port: 80,
          direction: "IN",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        },
        {
          id: 2,
          port: 80,
          direction: "IN",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        },
      ];

    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "createList",
    ).callsFake(async (items: ISecRuleCreateDTO[]) => {
      const toAdd = items.map((item, idx) => {
        const itemToAdd = {
          id: idx + 1,
          ...item,
        };

        return itemToAdd;
      });

      return toAdd as ISecRule[];
    });

    const actualResult = await supertest(app)
      .post("/sec-rules")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecRules list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) secRule [/sec-rules/1]", async () => {
    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "deleteById",
    ).callsFake(async (id: number) => {
      if (id === 1) {
        return {
          id: 1,
          port: 80,
          direction: "IN",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        };
      }

      return null;
    });

    const actualResult = await supertest(app)
      .delete("/sec-rules/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecRule(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) secRules List [/sec-rules]", async () => {
    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "deleteList",
    ).callsFake(async (ids: number[]) => {
      return ids.join() === [1, 2].join() ? ids.length : null;
    });

    const actualResult = await supertest(app)
      .delete("/sec-rules")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(actualResult).to.deep.equal({
      message: "SecRules list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) secRule [/sec-rules/1]", async () => {
    let itemToUpdate: ISecRule = {
      id: 1,
      port: 80,
      direction: "IN",
      destination: "dunno",
      policy: "ACCEPT",
      id_sec_group: 1,
    };
    const expectedResult: ISecRule = {
        id: 1,
        port: 80,
        direction: "IN",
        destination: "dunno",
        policy: "REJECT",
        id_sec_group: 1,
      },
      updateBody: ISecRulePatchDTO = {
        policy: "REJECT",
      };

    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "patchById",
    ).callsFake(async (id: number, secRule: ISecRulePatchDTO) => {
      if (id === 1) {
        itemToUpdate = {
          ...itemToUpdate,
          ...secRule,
        } as ISecRule;

        return itemToUpdate;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/sec-rules/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `SecRule(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) secRules List [/sec-rules]", async () => {
    const itemsToUpdate: ISecRule[] = [
        {
          id: 1,
          port: 80,
          direction: "IN",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        },
        {
          id: 2,
          port: 80,
          direction: "OUT",
          destination: "dunno",
          policy: "ACCEPT",
          id_sec_group: 1,
        },
      ],
      expectedResult: ISecRule[] = [
        {
          id: 1,
          port: 80,
          direction: "OUT",
          destination: "dunno",
          policy: "DESTROY",
          id_sec_group: 1,
        },
        {
          id: 2,
          port: 80,
          direction: "OUT",
          destination: "dunno",
          policy: "DESTROY",
          id_sec_group: 1,
        },
      ],
      updateBody: ISecRulePatchDTO = {
        direction: "OUT",
        policy: "DESTROY",
      };

    const databaseSecRuleStub = Sinon.stub(
      SecRulesService,
      "patchList",
    ).callsFake(async (ids: number[], secRule: ISecRulePatchDTO) => {
      if (ids.join() === [1, 2].join()) {
        itemsToUpdate.forEach((item, idx) => {
          if (ids.includes(item.id)) {
            itemsToUpdate[idx] = {
              ...item,
              ...secRule,
            } as ISecRule;
          }
        });

        return ids.length;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/sec-rules")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseSecRuleStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `SecRules successfully updated!`,
      success: true,
    });
  });
});
