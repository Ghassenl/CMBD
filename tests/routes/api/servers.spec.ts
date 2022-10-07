import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { ServersService } from "../../../src/services";
import {
  ErrorStatusCode,
  IDisk,
  INetworkInterface,
  ISecGroupServer,
  IServer,
  IServerCreateDTO,
  IServerPatchDTO,
  ServerModel,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /servers", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) server [/servers/1]", async () => {
    const items: IServer[] = [
      {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
      },
    ];

    const databaseServerStub = Sinon.stub(ServersService, "readById").callsFake(
      async (id) => {
        return items.find((item) => item.id === id) ?? null;
      },
    );

    const actualResult = await supertest(app)
      .get("/servers/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) server [/servers/1]", async () => {
    const items: IServer[] = [
      {
        id: 5,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
      },
    ];

    const databaseServerStub = Sinon.stub(ServersService, "readById").callsFake(
      async (id) => {
        return items.find((item) => item.id === id) ?? null;
      },
    );

    const actualResult = await supertest(app)
      .get("/servers/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "Server not found !",
    });
  });

  it("should get (GET) servers List [/servers]", async () => {
    const items: IServer[] = [
      {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
      },
    ];

    const databaseServerStub = Sinon.stub(ServersService, "readList").callsFake(
      async () => {
        return items;
      },
    );

    const actualResult = await supertest(app)
      .get("/servers")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should get (GET) server disks List [/servers/1/disks]", async () => {
    const server: IServer & {
        disks: IDisk[];
      } = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
        disks: [
          {
            id: 2,
            type: "ssd",
            size: 8,
            id_raid: 2,
            id_server: 2,
          },
        ],
      },
      expectedResult = new ServerModel(server)
        .getDisks()
        ?.map((disk) => disk.toJson());

    const databaseServerStub = Sinon.stub(
      ServersService,
      "readByIdWithDisks",
    ).callsFake(async () => server);

    const actualResult = await supertest(app)
      .get("/servers/1/disks")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) server disk [/servers/1/disks/1]", async () => {
    const server: IServer & {
        disks: IDisk[];
      } = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
        disks: [
          {
            id: 1,
            type: "ssd",
            size: 8,
            id_raid: 2,
            id_server: 2,
          },
        ],
      },
      expectedResult = new ServerModel(server).getDisks()?.shift()?.toJson();

    const databaseServerStub = Sinon.stub(
      ServersService,
      "readByIdWithDisks",
    ).callsFake(async () => server);

    const actualResult = await supertest(app)
      .get("/servers/1/disks/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) server networkInterfaces List [/servers/1/network-interfaces]", async () => {
    const server: IServer & {
        networkInterfaces: INetworkInterface[];
      } = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
        networkInterfaces: [
          {
            id: 1,
            ip: "192.168.1.1",
            mask: "255.0.0.0",
            id_gateway: 1,
          },
        ],
      },
      expectedResult = new ServerModel(server)
        .getNetworkInterfaces()
        ?.map((disk) => disk.toJson());

    const databaseServerStub = Sinon.stub(
      ServersService,
      "readByIdWithNetworkInterfaces",
    ).callsFake(async () => server);

    const actualResult = await supertest(app)
      .get("/servers/1/network-interfaces")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) server networInterface [/servers/1/network-interfaces/1]", async () => {
    const server: IServer & {
        networkInterfaces: INetworkInterface[];
      } = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
        networkInterfaces: [
          {
            id: 1,
            ip: "192.168.1.1",
            mask: "255.0.0.0",
            id_gateway: 1,
          },
        ],
      },
      expectedResult = new ServerModel(server)
        .getNetworkInterfaces()
        ?.shift()
        ?.toJson();

    const databaseServerStub = Sinon.stub(
      ServersService,
      "readByIdWithNetworkInterfaces",
    ).callsFake(async () => server);

    const actualResult = await supertest(app)
      .get("/servers/1/network-interfaces/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) server secGroupServers List [/servers/1/sec-group-servers]", async () => {
    const server: IServer & {
        secGroupServers: ISecGroupServer[];
      } = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
        secGroupServers: [
          {
            id: 1,
            id_sec_group: 1,
            id_server: 1,
          },
        ],
      },
      expectedResult = new ServerModel(server)
        .getSecGroupServers()
        ?.map((disk) => disk.toJson());

    const databaseServerStub = Sinon.stub(
      ServersService,
      "readByIdWithSecGroupServers",
    ).callsFake(async () => server);

    const actualResult = await supertest(app)
      .get("/servers/1/sec-group-servers")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) server secGroupServer [/servers/1/sec-group-servers/1]", async () => {
    const server: IServer & {
        secGroupServers: ISecGroupServer[];
      } = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 5,
        cpu_count: 5,
        secGroupServers: [
          {
            id: 1,
            id_sec_group: 1,
            id_server: 1,
          },
        ],
      },
      expectedResult = new ServerModel(server)
        .getSecGroupServers()
        ?.shift()
        ?.toJson();

    const databaseServerStub = Sinon.stub(
      ServersService,
      "readByIdWithSecGroupServers",
    ).callsFake(async () => server);

    const actualResult = await supertest(app)
      .get("/servers/1/sec-group-servers/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should add (POST) server [/servers]", async () => {
    const toSave: IServerCreateDTO = {
        type: "virtual",
        hostname: "local.addtest",
        ram: 8,
        cpu_count: 8,
      },
      expectedResult: IServer = {
        id: 1,
        type: "virtual",
        hostname: "local.addtest",
        ram: 8,
        cpu_count: 8,
      };
    const databaseServerStub = Sinon.stub(ServersService, "create").callsFake(
      async (server: IServerCreateDTO) => {
        return {
          id: 1,
          ...server,
        } as IServer;
      },
    );

    const actualResult = await supertest(app)
      .post("/servers")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Server successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) servers List [/servers]", async () => {
    const toSave: IServerCreateDTO[] = [
        {
          type: "virtual",
          hostname: "local.test2",
          ram: 4,
          cpu_count: 4,
        },
        {
          type: "physical",
          hostname: "local.test3",
          ram: 7,
          cpu_count: 7,
        },
      ],
      expectedResult: IServer[] = [
        {
          id: 1,
          type: "virtual",
          hostname: "local.test2",
          ram: 4,
          cpu_count: 4,
        },
        {
          id: 2,
          type: "physical",
          hostname: "local.test3",
          ram: 7,
          cpu_count: 7,
        },
      ];

    const databaseServerStub = Sinon.stub(
      ServersService,
      "createList",
    ).callsFake(async (items: IServerCreateDTO[]) => {
      const toAdd = items.map((item, idx) => {
        const itemToAdd = {
          id: idx + 1,
          ...item,
        };

        return itemToAdd;
      });

      return toAdd as IServer[];
    });

    const actualResult = await supertest(app)
      .post("/servers")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Servers list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) server [/servers/1]", async () => {
    const databaseServerStub = Sinon.stub(
      ServersService,
      "deleteById",
    ).callsFake(async (id: number) => {
      if (id === 1) {
        return {
          id: 1,
          type: "physical",
          hostname: "local.test",
          ram: 5,
          cpu_count: 5,
        };
      }

      return null;
    });

    const actualResult = await supertest(app)
      .delete("/servers/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Server(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) servers List [/servers]", async () => {
    const databaseServerStub = Sinon.stub(
      ServersService,
      "deleteList",
    ).callsFake(async (ids: number[]) => {
      return ids.join() === [1, 2].join() ? ids.length : null;
    });

    const actualResult = await supertest(app)
      .delete("/servers")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(actualResult).to.deep.equal({
      message: "Servers list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) server [/servers/1]", async () => {
    let itemToUpdate: IServer = {
      id: 1,
      type: "physical",
      hostname: "local.test",
      ram: 5,
      cpu_count: 5,
    };
    const expectedResult: IServer = {
        id: 1,
        type: "physical",
        hostname: "local.test",
        ram: 8,
        cpu_count: 8,
      },
      updateBody: IServerPatchDTO = {
        type: "physical",
        hostname: "local.test",
        ram: 8,
        cpu_count: 8,
      };

    const databaseServerStub = Sinon.stub(
      ServersService,
      "patchById",
    ).callsFake(async (id: number, server: IServerPatchDTO) => {
      if (id === 1) {
        itemToUpdate = {
          ...itemToUpdate,
          ...server,
        } as IServer;

        return itemToUpdate;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/servers/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Server(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) servers List [/servers]", async () => {
    const itemsToUpdate: IServer[] = [
        {
          id: 1,
          type: "physical",
          hostname: "local.test",
          ram: 5,
          cpu_count: 5,
        },
        {
          id: 2,
          type: "physical",
          hostname: "local.test",
          ram: 5,
          cpu_count: 5,
        },
      ],
      expectedResult: IServer[] = [
        {
          id: 1,
          type: "virtual",
          hostname: "local.test2",
          ram: 8,
          cpu_count: 8,
        },
        {
          id: 2,
          type: "virtual",
          hostname: "local.test2",
          ram: 8,
          cpu_count: 8,
        },
      ],
      updateBody: IServerPatchDTO = {
        type: "virtual",
        hostname: "local.test2",
        ram: 8,
        cpu_count: 8,
      };

    const databaseServerStub = Sinon.stub(
      ServersService,
      "patchList",
    ).callsFake(async (ids: number[], server: IServerPatchDTO) => {
      if (ids.join() === [1, 2].join()) {
        itemsToUpdate.forEach((item, idx) => {
          if (ids.includes(item.id)) {
            itemsToUpdate[idx] = {
              ...item,
              ...server,
            } as IServer;
          }
        });

        return ids.length;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/servers")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseServerStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Servers successfully updated!`,
      success: true,
    });
  });
});
