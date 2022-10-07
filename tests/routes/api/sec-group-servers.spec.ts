import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { SecGroupServersService } from "../../../src/services";
import {
  ErrorStatusCode,
  ISecGroupServer,
  ISecGroupServerCreateDTO,
  ISecGroupServerPatchDTO,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /sec-group-servers", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) secGroupServer [/sec-group-servers/1]", async () => {
    const items: ISecGroupServer[] = [
      {
        id: 1,
        id_sec_group: 1,
        id_server: 1,
      },
    ];

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/sec-group-servers/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) secGroupServer [/sec-group-servers/1]", async () => {
    const items: ISecGroupServer[] = [
      {
        id: 2,
        id_sec_group: 1,
        id_server: 1,
      },
    ];

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/sec-group-servers/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "SecGroupServer not found !",
    });
  });

  it("should get (GET) secGroupServers List [/sec-group-servers]", async () => {
    const items: ISecGroupServer[] = [
      {
        id: 1,
        id_sec_group: 1,
        id_server: 1,
      },
    ];

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "readList",
    ).callsFake(async () => {
      return items;
    });

    const actualResult = await supertest(app)
      .get("/sec-group-servers")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should add (POST) secGroupServer [/sec-group-servers]", async () => {
    const toSave = {
        id_sec_group: 1,
        id_server: 1,
      },
      expectedResult: ISecGroupServer = {
        id: 1,
        id_sec_group: 1,
        id_server: 1,
      };

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "create",
    ).callsFake(async (secGroupServer: ISecGroupServerCreateDTO) => {
      return {
        id: 1,
        ...secGroupServer,
      } as unknown as ISecGroupServer;
    });

    const actualResult = await supertest(app)
      .post("/sec-group-servers")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecGroupServer successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) secGroupServers List [/sec-group-servers]", async () => {
    const toSave: ISecGroupServerCreateDTO[] = [
        {
          id_sec_group: 1,
          id_server: 1,
        },
        {
          id_sec_group: 1,
          id_server: 1,
        },
      ],
      expectedResult: ISecGroupServer[] = [
        {
          id: 1,
          id_sec_group: 1,
          id_server: 1,
        },
        {
          id: 2,
          id_sec_group: 1,
          id_server: 1,
        },
      ];

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "createList",
    ).callsFake(async (items: ISecGroupServerCreateDTO[]) => {
      const toAdd = items.map((item, idx) => {
        const itemToAdd = {
          id: idx + 1,
          ...item,
        };

        return itemToAdd;
      });

      return toAdd as ISecGroupServer[];
    });

    const actualResult = await supertest(app)
      .post("/sec-group-servers")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecGroupServers list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) secGroupServer [/sec-group-servers/1]", async () => {
    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "deleteById",
    ).callsFake(async (id: number) => {
      if (id === 1) {
        return {
          id: 1,
          id_sec_group: 1,
          id_server: 1,
        };
      }

      return null;
    });

    const actualResult = await supertest(app)
      .delete("/sec-group-servers/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: `SecGroupServer(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) secGroupServers List [/sec-group-servers]", async () => {
    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "deleteList",
    ).callsFake(async (ids: number[]) => {
      return ids.join() === [1, 2].join() ? ids.length : null;
    });

    const actualResult = await supertest(app)
      .delete("/sec-group-servers")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: "SecGroupServers list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) secGroupServer [/sec-group-servers/1]", async () => {
    let itemToUpdate: ISecGroupServer = {
      id: 1,
      id_sec_group: 1,
      id_server: 1,
    };
    const expectedResult: ISecGroupServer = {
        id: 1,
        id_sec_group: 1,
        id_server: 2,
      },
      updateBody: ISecGroupServerPatchDTO = {
        id_server: 2,
      };

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "patchById",
    ).callsFake(async (id: number, secGroupServer: ISecGroupServerPatchDTO) => {
      if (id === 1) {
        itemToUpdate = {
          ...itemToUpdate,
          ...secGroupServer,
        } as ISecGroupServer;

        return itemToUpdate;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/sec-group-servers/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `SecGroupServer(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) secGroupServers List [/sec-group-servers]", async () => {
    const itemsToUpdate: ISecGroupServer[] = [
        {
          id: 1,
          id_sec_group: 1,
          id_server: 1,
        },
        {
          id: 2,
          id_sec_group: 1,
          id_server: 1,
        },
      ],
      expectedResult: ISecGroupServer[] = [
        {
          id: 1,
          id_sec_group: 1,
          id_server: 2,
        },
        {
          id: 2,
          id_sec_group: 1,
          id_server: 2,
        },
      ],
      updateBody: ISecGroupServerPatchDTO = {
        id_server: 2,
      };

    const databaseSecGroupServerStub = Sinon.stub(
      SecGroupServersService,
      "patchList",
    ).callsFake(
      async (ids: number[], secGroupServer: ISecGroupServerPatchDTO) => {
        if (ids.join() === [1, 2].join()) {
          itemsToUpdate.forEach((item, idx) => {
            if (ids.includes(item.id)) {
              itemsToUpdate[idx] = {
                ...item,
                ...secGroupServer,
              } as ISecGroupServer;
            }
          });

          return ids.length;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/sec-group-servers")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseSecGroupServerStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `SecGroupServers successfully updated!`,
      success: true,
    });
  });
});
