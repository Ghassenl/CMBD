import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { NetworkInterfacesService } from "../../../src/services";
import {
  ErrorStatusCode,
  INetworkInterface,
  INetworkInterfaceCreateDTO,
  INetworkInterfacePatchDTO,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /network-interfaces", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) networkInterface [/network-interfaces/1]", async () => {
    const items: INetworkInterface[] = [
      {
        id: 1,
        ip: "192.168.1.1",
        mask: "255.0.0.0",
        id_gateway: 1,
      },
    ];

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/network-interfaces/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) networkInterface [/network-interfaces/1]", async () => {
    const items: INetworkInterface[] = [
      {
        id: 2,
        ip: "192.168.1.1",
        mask: "255.0.0.0",
        id_gateway: 1,
      },
    ];

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/network-interfaces/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "NetworkInterface not found !",
    });
  });

  it("should get (GET) networkInterfaces List [/network-interfaces]", async () => {
    const items: INetworkInterface[] = [
      {
        id: 1,
        ip: "192.168.1.1",
        mask: "255.0.0.0",
        id_gateway: 1,
      },
    ];

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "readList",
    ).callsFake(async () => {
      return items;
    });

    const actualResult = await supertest(app)
      .get("/network-interfaces")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should add (POST) networkInterface [/network-interfaces]", async () => {
    const toSave: INetworkInterfaceCreateDTO = {
        ip: "192.168.1.1",
        mask: "255.0.0.0",
        id_gateway: 1,
      },
      expectedResult: INetworkInterface = {
        id: 1,
        ip: "192.168.1.1",
        mask: "255.0.0.0",
        id_gateway: 1,
      };

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "create",
    ).callsFake(async (networkInterface: INetworkInterfaceCreateDTO) => {
      return {
        id: 1,
        ...networkInterface,
      } as unknown as INetworkInterface;
    });

    const actualResult = await supertest(app)
      .post("/network-interfaces")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal({
      message: `NetworkInterface successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) networkInterfaces List [/network-interfaces]", async () => {
    const toSave: INetworkInterfaceCreateDTO[] = [
        {
          ip: "192.168.1.1",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
        {
          ip: "192.168.1.2",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
      ],
      expectedResult: INetworkInterface[] = [
        {
          id: 1,
          ip: "192.168.1.1",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
        {
          id: 2,
          ip: "192.168.1.2",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
      ];

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "createList",
    ).callsFake(async (items: INetworkInterfaceCreateDTO[]) => {
      const toAdd = items.map((item, idx) => {
        const itemToAdd = {
          id: idx + 1,
          ...item,
        };

        return itemToAdd;
      });

      return toAdd as INetworkInterface[];
    });

    const actualResult = await supertest(app)
      .post("/network-interfaces")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal({
      message: `NetworkInterfaces list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) networkInterface [/network-interfaces/1]", async () => {
    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "deleteById",
    ).callsFake(async (id: number) => {
      if (id === 1) {
        return {
          id: 1,
          ip: "192.168.1.1",
          mask: "255.0.0.0",
          id_gateway: 1,
        };
      }

      return null;
    });

    const actualResult = await supertest(app)
      .delete("/network-interfaces/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal({
      message: `NetworkInterface(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) networkInterfaces List [/network-interfaces]", async () => {
    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "deleteList",
    ).callsFake(async (ids: number[]) => {
      return ids.join() === [1, 2].join() ? ids.length : null;
    });

    const actualResult = await supertest(app)
      .delete("/network-interfaces")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(actualResult).to.deep.equal({
      message: "NetworkInterfaces list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) networkInterface [/network-interfaces/1]", async () => {
    let itemToUpdate: INetworkInterface = {
      id: 1,
      ip: "192.168.1.1",
      mask: "255.0.0.0",
      id_gateway: 1,
    };
    const expectedResult: INetworkInterface = {
        id: 1,
        ip: "192.168.1.2",
        mask: "255.0.0.0",
        id_gateway: 1,
      },
      updateBody: INetworkInterfacePatchDTO = {
        ip: "192.168.1.2",
      };

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "patchById",
    ).callsFake(
      async (id: number, networkInterface: INetworkInterfacePatchDTO) => {
        if (id === 1) {
          itemToUpdate = {
            ...itemToUpdate,
            ...networkInterface,
          } as INetworkInterface;

          return itemToUpdate;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/network-interfaces/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `NetworkInterface(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) networkInterfaces List [/network-interfaces]", async () => {
    const itemsToUpdate: INetworkInterface[] = [
        {
          id: 1,
          ip: "192.168.1.2",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
        {
          id: 2,
          ip: "192.168.1.2",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
      ],
      expectedResult: INetworkInterface[] = [
        {
          id: 1,
          ip: "192.168.1.1",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
        {
          id: 2,
          ip: "192.168.1.1",
          mask: "255.0.0.0",
          id_gateway: 1,
        },
      ],
      updateBody: INetworkInterfacePatchDTO = {
        ip: "192.168.1.1",
      };

    const databaseNetworkInterfaceStub = Sinon.stub(
      NetworkInterfacesService,
      "patchList",
    ).callsFake(
      async (ids: number[], networkInterface: INetworkInterfacePatchDTO) => {
        if (ids.join() === [1, 2].join()) {
          itemsToUpdate.forEach((item, idx) => {
            if (ids.includes(item.id)) {
              itemsToUpdate[idx] = {
                ...item,
                ...networkInterface,
              } as INetworkInterface;
            }
          });

          return ids.length;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/network-interfaces")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseNetworkInterfaceStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `NetworkInterfaces successfully updated!`,
      success: true,
    });
  });
});
