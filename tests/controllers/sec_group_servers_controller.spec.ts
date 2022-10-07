import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { SecGroupServersController } from "../../src/controllers";
import { SecGroupServersService } from "../../src/services";
import { SecGroupServerModel, ISecGroupServer } from "../../src/models";

describe("Test SecGroupServersController", () => {
  it("'addSecGroupServer' should return instanceOf 'SecGroupServerModel'", async () => {
    const serviceStub = Sinon.stub(SecGroupServersService, "create").callsFake(
      async (item) => {
        return new SecGroupServerModel(item);
      },
    );

    const actualResult = await SecGroupServersController.addSecGroupServer({
      id: 1,
    } as ISecGroupServer);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(SecGroupServerModel);
  });

  it("'addSecGroupServer' should return null", async () => {
    const serviceStub = Sinon.stub(SecGroupServersService, "create").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupServersController.addSecGroupServer({
      id: 1,
    } as ISecGroupServer);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addSecGroupServers' should return List of instanceOf 'SecGroupServerModel'", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "createList",
    ).callsFake(async (items) => {
      return items.map((item) => new SecGroupServerModel(item));
    });

    const actualResult = await SecGroupServersController.addSecGroupServers([
      {
        id: 1,
      } as ISecGroupServer,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(SecGroupServerModel);
    });
  });

  it("'addSecGroupServers' should return null", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "createList",
    ).callsFake(async () => []);

    const actualResult = await SecGroupServersController.addSecGroupServers([
      {
        id: 1,
      } as ISecGroupServer,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteSecGroupServer' should delete & return instanceOf 'SecGroupServerModel'", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "deleteById",
    ).callsFake(async (id) => {
      return new SecGroupServerModel({ id });
    });

    const actualResult = await SecGroupServersController.deleteSecGroupServer(
      1,
    );

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteSecGroupServer' should false", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "deleteById",
    ).callsFake(async () => null);

    const actualResult = await SecGroupServersController.deleteSecGroupServer(
      1,
    );

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteSecGroupServers' should return true", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "deleteList",
    ).callsFake(async () => 2);

    const actualResult = await SecGroupServersController.deleteSecGroupServers([
      1, 2,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteSecGroupServers' should return false", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "deleteList",
    ).callsFake(async () => null);

    const actualResult = await SecGroupServersController.deleteSecGroupServers([
      1, 2,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateSecGroupServer' should return true", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "patchById",
    ).callsFake(async (id) => {
      return { id } as ISecGroupServer;
    });

    const actualResult = await SecGroupServersController.updateSecGroupServer(
      1,
      {},
    );

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateSecGroupServer' should return false", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "patchById",
    ).callsFake(async () => null);

    const actualResult = await SecGroupServersController.updateSecGroupServer(
      1,
      {},
    );

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateSecGroupServers' should return true", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "patchList",
    ).callsFake(async () => 2);

    const actualResult = await SecGroupServersController.updateSecGroupServers(
      [1, 2],
      {},
    );

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateSecGroupServers' should return false", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "patchList",
    ).callsFake(async () => null);

    const actualResult = await SecGroupServersController.updateSecGroupServers(
      [1, 2],
      {},
    );

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getSecGroupServer' should return instanceOf 'SecGroupServerModel'", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "readById",
    ).callsFake(async (id) => ({ id } as ISecGroupServer));

    const actualResult = await SecGroupServersController.getSecGroupServer(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(SecGroupServerModel);
  });

  it("'getSecGroupServer' should return null", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "readById",
    ).callsFake(async () => null);

    const actualResult = await SecGroupServersController.getSecGroupServer(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getSecGroupServers' should return List of instanceOf 'SecGroupServerModel'", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "readList",
    ).callsFake(async () => [{ id: 1 }] as ISecGroupServer[]);

    const actualResult = await SecGroupServersController.getSecGroupServers();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(SecGroupServerModel);
    });
  });

  it("'getSecGroupServers' should return null", async () => {
    const serviceStub = Sinon.stub(
      SecGroupServersService,
      "readList",
    ).callsFake(async () => []);

    const actualResult = await SecGroupServersController.getSecGroupServers();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
