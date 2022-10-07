import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { SecGroupsService } from "../../../src/services";
import {
  SecGroupModel,
  ErrorStatusCode,
  ISecGroup,
  ISecGroupCreateDTO,
  ISecGroupPatchDTO,
  ISecRule,
  ISecGroupServer,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /sec-groups", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) secGroup [/sec-groups/1]", async () => {
    const items: ISecGroup[] = [
      {
        id: 1,
        name: "hacked",
      },
    ];

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/sec-groups/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) secGroup [/sec-groups/1]", async () => {
    const items: ISecGroup[] = [
      {
        id: 2,
        name: "hacked",
      },
    ];

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/sec-groups/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "SecGroup not found !",
    });
  });

  it("should get (GET) secGroups List [/sec-groups]", async () => {
    const items: ISecGroup[] = [
      {
        id: 1,
        name: "hacked",
      },
    ];

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readList",
    ).callsFake(async () => {
      return items;
    });

    const actualResult = await supertest(app)
      .get("/sec-groups")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should get (GET) secGroup secRules List [/sec-groups/1/sec-rules]", async () => {
    const secGroup: ISecGroup & {
        secRules: ISecRule[];
      } = {
        id: 1,
        name: "hacked",
        secRules: [
          {
            id: 1,
            port: 80,
            direction: "IN",
            destination: "dunno",
            policy: "ACCEPT",
            id_sec_group: 1,
          },
        ],
      },
      expectedResult = new SecGroupModel(secGroup)
        .getSecRules()
        ?.map((partiton) => partiton.toJson());

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readByIdWithSecRules",
    ).callsFake(async () => secGroup);

    const actualResult = await supertest(app)
      .get("/sec-groups/1/sec-rules")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) secGroup secRules [/sec-groups/1/sec-rules/1]", async () => {
    const secGroup: ISecGroup & {
        secRules: ISecRule[];
      } = {
        id: 1,
        name: "hacked",
        secRules: [
          {
            id: 1,
            port: 80,
            direction: "IN",
            destination: "dunno",
            policy: "ACCEPT",
            id_sec_group: 1,
          },
        ],
      },
      expectedResult = new SecGroupModel(secGroup)
        .getSecRules()
        ?.shift()
        ?.toJson();

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readByIdWithSecRules",
    ).callsFake(async () => secGroup);

    const actualResult = await supertest(app)
      .get("/sec-groups/1/sec-rules/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) secGroup secGroupServers List [/sec-groups/1/sec-group-servers]", async () => {
    const secRule: ISecGroup & {
        secGroupServers: ISecGroupServer[];
      } = {
        id: 1,
        name: "hacked",
        secGroupServers: [
          {
            id: 1,
            id_sec_group: 1,
            id_server: 1,
          },
        ],
      },
      expectedResult = new SecGroupModel(secRule)
        .getSecGroupServers()
        ?.map((disk) => disk.toJson());

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readByIdWithSecGroupServers",
    ).callsFake(async () => secRule);

    const actualResult = await supertest(app)
      .get("/sec-groups/1/sec-group-servers")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) secGroup secGroupServer [/sec-groups/1/sec-group-servers/1]", async () => {
    const secRule: ISecGroup & {
        secGroupServers: ISecGroupServer[];
      } = {
        id: 1,
        name: "hacked",
        secGroupServers: [
          {
            id: 1,
            id_sec_group: 1,
            id_server: 1,
          },
        ],
      },
      expectedResult = new SecGroupModel(secRule)
        .getSecGroupServers()
        ?.shift()
        ?.toJson();

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "readByIdWithSecGroupServers",
    ).callsFake(async () => secRule);

    const actualResult = await supertest(app)
      .get("/sec-groups/1/sec-group-servers/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should add (POST) secGroup [/sec-groups]", async () => {
    const toSave: ISecGroupCreateDTO = {
        name: "hacked",
      },
      expectedResult: ISecGroup = {
        id: 1,
        name: "hacked",
      };

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "create",
    ).callsFake(async (secGroup: ISecGroupCreateDTO) => {
      return {
        id: 1,
        ...secGroup,
      } as unknown as ISecGroup;
    });

    const actualResult = await supertest(app)
      .post("/sec-groups")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecGroup successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) secGroups List [/sec-groups]", async () => {
    const toSave: ISecGroupCreateDTO[] = [
        {
          name: "hacked",
        },
        {
          name: "hacked",
        },
      ],
      expectedResult: ISecGroup[] = [
        {
          id: 1,
          name: "hacked",
        },
        {
          id: 2,
          name: "hacked",
        },
      ];

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "createList",
    ).callsFake(async (items: ISecGroupCreateDTO[]) => {
      const toAdd = items.map((item, idx) => {
        const itemToAdd = {
          id: idx + 1,
          ...item,
        };

        return itemToAdd;
      });

      return toAdd as ISecGroup[];
    });

    const actualResult = await supertest(app)
      .post("/sec-groups")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecGroups list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) secGroup [/sec-groups/1]", async () => {
    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "deleteById",
    ).callsFake(async (id: number) => {
      if (id === 1) {
        return {
          id: 1,
          name: "hacked",
        };
      }

      return null;
    });

    const actualResult = await supertest(app)
      .delete("/sec-groups/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecGroup(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) secGroups List [/sec-groups]", async () => {
    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "deleteList",
    ).callsFake(async (ids: number[]) => {
      return ids.join() === [1, 2].join() ? ids.length : null;
    });

    const actualResult = await supertest(app)
      .delete("/sec-groups")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(actualResult).to.deep.equal({
      message: "SecGroups list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) secGroup [/sec-groups/1]", async () => {
    let itemToUpdate: ISecGroup = {
      id: 1,
      name: "hacked",
    };
    const expectedResult: ISecGroup = {
        id: 1,
        name: "secure",
      },
      updateBody: ISecGroupPatchDTO = {
        name: "secure",
      };

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "patchById",
    ).callsFake(async (id: number, secGroup: ISecGroupPatchDTO) => {
      if (id === 1) {
        itemToUpdate = {
          ...itemToUpdate,
          ...secGroup,
        } as ISecGroup;

        return itemToUpdate;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/sec-groups/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `SecGroup(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) secGroups List [/sec-groups]", async () => {
    const itemsToUpdate: ISecGroup[] = [
        {
          id: 1,
          name: "hacked",
        },
        {
          id: 2,
          name: "hacked",
        },
      ],
      expectedResult: ISecGroup[] = [
        {
          id: 1,
          name: "secure",
        },
        {
          id: 2,
          name: "secure",
        },
      ],
      updateBody: ISecGroupPatchDTO = {
        name: "secure",
      };

    const databaseSecGroupStub = Sinon.stub(
      SecGroupsService,
      "patchList",
    ).callsFake(async (ids: number[], secGroup: ISecGroupPatchDTO) => {
      if (ids.join() === [1, 2].join()) {
        itemsToUpdate.forEach((item, idx) => {
          if (ids.includes(item.id)) {
            itemsToUpdate[idx] = {
              ...item,
              ...secGroup,
            } as ISecGroup;
          }
        });

        return ids.length;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/sec-groups")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseSecGroupStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `SecGroups successfully updated!`,
      success: true,
    });
  });
});
