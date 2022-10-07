import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { ServersController } from "../../src/controllers";
import { ServersService } from "../../src/services";
import { ServerModel, IServer } from "../../src/models";

describe("Test ServersController", () => {
  it("'addServer' should return instanceOf 'ServerModel'", async () => {
    const serviceStub = Sinon.stub(ServersService, "create").callsFake(
      async (item) => {
        return new ServerModel(item);
      },
    );

    const actualResult = await ServersController.addServer({
      id: 1,
    } as IServer);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(ServerModel);
  });

  it("'addServer' should return null", async () => {
    const serviceStub = Sinon.stub(ServersService, "create").callsFake(
      async () => null,
    );

    const actualResult = await ServersController.addServer({
      id: 1,
    } as IServer);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addServers' should return List of instanceOf 'ServerModel'", async () => {
    const serviceStub = Sinon.stub(ServersService, "createList").callsFake(
      async (items) => {
        return items.map((item) => new ServerModel(item));
      },
    );

    const actualResult = await ServersController.addServers([
      {
        id: 1,
      } as IServer,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(ServerModel);
    });
  });

  it("'addServers' should return null", async () => {
    const serviceStub = Sinon.stub(ServersService, "createList").callsFake(
      async () => [],
    );

    const actualResult = await ServersController.addServers([
      {
        id: 1,
      } as IServer,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteServer' should delete & return instanceOf 'ServerModel'", async () => {
    const serviceStub = Sinon.stub(ServersService, "deleteById").callsFake(
      async (id) => {
        return new ServerModel({ id });
      },
    );

    const actualResult = await ServersController.deleteServer(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteServer' should false", async () => {
    const serviceStub = Sinon.stub(ServersService, "deleteById").callsFake(
      async () => null,
    );

    const actualResult = await ServersController.deleteServer(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteServers' should return true", async () => {
    const serviceStub = Sinon.stub(ServersService, "deleteList").callsFake(
      async () => 2,
    );

    const actualResult = await ServersController.deleteServers([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteServers' should return false", async () => {
    const serviceStub = Sinon.stub(ServersService, "deleteList").callsFake(
      async () => null,
    );

    const actualResult = await ServersController.deleteServers([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateServer' should return true", async () => {
    const serviceStub = Sinon.stub(ServersService, "patchById").callsFake(
      async (id) => {
        return { id } as IServer;
      },
    );

    const actualResult = await ServersController.updateServer(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateServer' should return false", async () => {
    const serviceStub = Sinon.stub(ServersService, "patchById").callsFake(
      async () => null,
    );

    const actualResult = await ServersController.updateServer(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateServers' should return true", async () => {
    const serviceStub = Sinon.stub(ServersService, "patchList").callsFake(
      async () => 2,
    );

    const actualResult = await ServersController.updateServers([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateServers' should return false", async () => {
    const serviceStub = Sinon.stub(ServersService, "patchList").callsFake(
      async () => null,
    );

    const actualResult = await ServersController.updateServers([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getServer' should return instanceOf 'ServerModel'", async () => {
    const serviceStub = Sinon.stub(ServersService, "readById").callsFake(
      async (id) => ({ id } as IServer),
    );

    const actualResult = await ServersController.getServer(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(ServerModel);
  });

  it("'getServer' should return null", async () => {
    const serviceStub = Sinon.stub(ServersService, "readById").callsFake(
      async () => null,
    );

    const actualResult = await ServersController.getServer(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getServers' should return List of instanceOf 'ServerModel'", async () => {
    const serviceStub = Sinon.stub(ServersService, "readList").callsFake(
      async () => [{ id: 1 }] as IServer[],
    );

    const actualResult = await ServersController.getServers();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(ServerModel);
    });
  });

  it("'getServers' should return null", async () => {
    const serviceStub = Sinon.stub(ServersService, "readList").callsFake(
      async () => [],
    );

    const actualResult = await ServersController.getServers();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
