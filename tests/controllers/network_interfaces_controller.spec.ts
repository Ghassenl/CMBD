import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { NetworkInterfacesController } from "../../src/controllers";
import { NetworkInterfacesService } from "../../src/services";
import { NetworkInterfaceModel, INetworkInterface } from "../../src/models";

describe("Test NetworkInterfacesController", () => {
  it("'addNetworkInterface' should return instanceOf 'NetworkInterfaceModel'", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "create",
    ).callsFake(async (item) => {
      return new NetworkInterfaceModel(item);
    });

    const actualResult = await NetworkInterfacesController.addNetworkInterface({
      id: 1,
    } as INetworkInterface);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(NetworkInterfaceModel);
  });

  it("'addNetworkInterface' should return null", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "create",
    ).callsFake(async () => null);

    const actualResult = await NetworkInterfacesController.addNetworkInterface({
      id: 1,
    } as INetworkInterface);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addNetworkInterfaces' should return List of instanceOf 'NetworkInterfaceModel'", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "createList",
    ).callsFake(async (items) => {
      return items.map((item) => new NetworkInterfaceModel(item));
    });

    const actualResult = await NetworkInterfacesController.addNetworkInterfaces(
      [
        {
          id: 1,
        } as INetworkInterface,
      ],
    );

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(NetworkInterfaceModel);
    });
  });

  it("'addNetworkInterfaces' should return null", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "createList",
    ).callsFake(async () => []);

    const actualResult = await NetworkInterfacesController.addNetworkInterfaces(
      [
        {
          id: 1,
        } as INetworkInterface,
      ],
    );

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteNetworkInterface' should delete & return instanceOf 'NetworkInterfaceModel'", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "deleteById",
    ).callsFake(async (id) => {
      return new NetworkInterfaceModel({ id });
    });

    const actualResult =
      await NetworkInterfacesController.deleteNetworkInterface(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteNetworkInterface' should false", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "deleteById",
    ).callsFake(async () => null);

    const actualResult =
      await NetworkInterfacesController.deleteNetworkInterface(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteNetworkInterfaces' should return true", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "deleteList",
    ).callsFake(async () => 2);

    const actualResult =
      await NetworkInterfacesController.deleteNetworkInterfaces([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteNetworkInterfaces' should return false", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "deleteList",
    ).callsFake(async () => null);

    const actualResult =
      await NetworkInterfacesController.deleteNetworkInterfaces([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateNetworkInterface' should return true", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "patchById",
    ).callsFake(async (id) => {
      return { id } as INetworkInterface;
    });

    const actualResult =
      await NetworkInterfacesController.updateNetworkInterface(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateNetworkInterface' should return false", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "patchById",
    ).callsFake(async () => null);

    const actualResult =
      await NetworkInterfacesController.updateNetworkInterface(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateNetworkInterfaces' should return true", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "patchList",
    ).callsFake(async () => 2);

    const actualResult =
      await NetworkInterfacesController.updateNetworkInterfaces([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateNetworkInterfaces' should return false", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "patchList",
    ).callsFake(async () => null);

    const actualResult =
      await NetworkInterfacesController.updateNetworkInterfaces([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getNetworkInterface' should return instanceOf 'NetworkInterfaceModel'", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "readById",
    ).callsFake(async (id) => ({ id } as INetworkInterface));

    const actualResult = await NetworkInterfacesController.getNetworkInterface(
      1,
    );

    serviceStub.restore();

    expect(actualResult).instanceOf(NetworkInterfaceModel);
  });

  it("'getNetworkInterface' should return null", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "readById",
    ).callsFake(async () => null);

    const actualResult = await NetworkInterfacesController.getNetworkInterface(
      1,
    );

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getNetworkInterfaces' should return List of instanceOf 'NetworkInterfaceModel'", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "readList",
    ).callsFake(async () => [{ id: 1 }] as INetworkInterface[]);

    const actualResult =
      await NetworkInterfacesController.getNetworkInterfaces();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(NetworkInterfaceModel);
    });
  });

  it("'getNetworkInterfaces' should return null", async () => {
    const serviceStub = Sinon.stub(
      NetworkInterfacesService,
      "readList",
    ).callsFake(async () => []);

    const actualResult =
      await NetworkInterfacesController.getNetworkInterfaces();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
