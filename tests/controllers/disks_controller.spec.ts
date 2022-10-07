import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { DisksController } from "../../src/controllers";
import { DisksService } from "../../src/services";
import { DiskModel, IDisk } from "../../src/models";

describe("Test DisksController", () => {
  it("'addDisk' should return instanceOf 'DiskModel'", async () => {
    const serviceStub = Sinon.stub(DisksService, "create").callsFake(
      async (item) => {
        return new DiskModel(item);
      },
    );

    const actualResult = await DisksController.addDisk({ id: 1 } as IDisk);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(DiskModel);
  });

  it("'addDisk' should return null", async () => {
    const serviceStub = Sinon.stub(DisksService, "create").callsFake(
      async () => null,
    );

    const actualResult = await DisksController.addDisk({ id: 1 } as IDisk);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addDisks' should return List of instanceOf 'DiskModel'", async () => {
    const serviceStub = Sinon.stub(DisksService, "createList").callsFake(
      async (items) => {
        return items.map((item) => new DiskModel(item));
      },
    );

    const actualResult = await DisksController.addDisks([
      {
        id: 1,
      } as IDisk,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(DiskModel);
    });
  });

  it("'addDisks' should return null", async () => {
    const serviceStub = Sinon.stub(DisksService, "createList").callsFake(
      async () => [],
    );

    const actualResult = await DisksController.addDisks([
      {
        id: 1,
      } as IDisk,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteDisk' should delete & return instanceOf 'DiskModel'", async () => {
    const serviceStub = Sinon.stub(DisksService, "deleteById").callsFake(
      async (id) => {
        return new DiskModel({ id });
      },
    );

    const actualResult = await DisksController.deleteDisk(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteDisk' should false", async () => {
    const serviceStub = Sinon.stub(DisksService, "deleteById").callsFake(
      async () => null,
    );

    const actualResult = await DisksController.deleteDisk(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteDisks' should return true", async () => {
    const serviceStub = Sinon.stub(DisksService, "deleteList").callsFake(
      async () => 2,
    );

    const actualResult = await DisksController.deleteDisks([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteDisks' should return false", async () => {
    const serviceStub = Sinon.stub(DisksService, "deleteList").callsFake(
      async () => null,
    );

    const actualResult = await DisksController.deleteDisks([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateDisk' should return true", async () => {
    const serviceStub = Sinon.stub(DisksService, "patchById").callsFake(
      async (id) => {
        return { id } as IDisk;
      },
    );

    const actualResult = await DisksController.updateDisk(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateDisk' should return false", async () => {
    const serviceStub = Sinon.stub(DisksService, "patchById").callsFake(
      async () => null,
    );

    const actualResult = await DisksController.updateDisk(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateDisks' should return true", async () => {
    const serviceStub = Sinon.stub(DisksService, "patchList").callsFake(
      async () => 2,
    );

    const actualResult = await DisksController.updateDisks([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateDisks' should return false", async () => {
    const serviceStub = Sinon.stub(DisksService, "patchList").callsFake(
      async () => null,
    );

    const actualResult = await DisksController.updateDisks([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getDisk' should return instanceOf 'DiskModel'", async () => {
    const serviceStub = Sinon.stub(DisksService, "readById").callsFake(
      async (id) => ({ id } as IDisk),
    );

    const actualResult = await DisksController.getDisk(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(DiskModel);
  });

  it("'getDisk' should return null", async () => {
    const serviceStub = Sinon.stub(DisksService, "readById").callsFake(
      async () => null,
    );

    const actualResult = await DisksController.getDisk(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getDisks' should return List of instanceOf 'DiskModel'", async () => {
    const serviceStub = Sinon.stub(DisksService, "readList").callsFake(
      async () => [{ id: 1 }] as IDisk[],
    );

    const actualResult = await DisksController.getDisks();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(DiskModel);
    });
  });

  it("'getDisks' should return null", async () => {
    const serviceStub = Sinon.stub(DisksService, "readList").callsFake(
      async () => [],
    );

    const actualResult = await DisksController.getDisks();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
