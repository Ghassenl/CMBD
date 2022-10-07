import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { PartitionsController } from "../../src/controllers";
import { PartitionsService } from "../../src/services";
import { PartitionModel, IPartition } from "../../src/models";

describe("Test PartitionsController", () => {
  it("'addPartition' should return instanceOf 'PartitionModel'", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "create").callsFake(
      async (item) => {
        return new PartitionModel(item);
      },
    );

    const actualResult = await PartitionsController.addPartition({
      id: 1,
    } as IPartition);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(PartitionModel);
  });

  it("'addPartition' should return null", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "create").callsFake(
      async () => null,
    );

    const actualResult = await PartitionsController.addPartition({
      id: 1,
    } as IPartition);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addPartitions' should return List of instanceOf 'PartitionModel'", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "createList").callsFake(
      async (items) => {
        return items.map((item) => new PartitionModel(item));
      },
    );

    const actualResult = await PartitionsController.addPartitions([
      {
        id: 1,
      } as IPartition,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(PartitionModel);
    });
  });

  it("'addPartitions' should return null", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "createList").callsFake(
      async () => [],
    );

    const actualResult = await PartitionsController.addPartitions([
      {
        id: 1,
      } as IPartition,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deletePartition' should delete & return instanceOf 'PartitionModel'", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "deleteById").callsFake(
      async (id) => {
        return new PartitionModel({ id });
      },
    );

    const actualResult = await PartitionsController.deletePartition(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deletePartition' should false", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "deleteById").callsFake(
      async () => null,
    );

    const actualResult = await PartitionsController.deletePartition(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deletePartitions' should return true", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "deleteList").callsFake(
      async () => 2,
    );

    const actualResult = await PartitionsController.deletePartitions([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deletePartitions' should return false", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "deleteList").callsFake(
      async () => null,
    );

    const actualResult = await PartitionsController.deletePartitions([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updatePartition' should return true", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "patchById").callsFake(
      async (id) => {
        return { id } as IPartition;
      },
    );

    const actualResult = await PartitionsController.updatePartition(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updatePartition' should return false", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "patchById").callsFake(
      async () => null,
    );

    const actualResult = await PartitionsController.updatePartition(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updatePartitions' should return true", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "patchList").callsFake(
      async () => 2,
    );

    const actualResult = await PartitionsController.updatePartitions(
      [1, 2],
      {},
    );

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updatePartitions' should return false", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "patchList").callsFake(
      async () => null,
    );

    const actualResult = await PartitionsController.updatePartitions(
      [1, 2],
      {},
    );

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getPartition' should return instanceOf 'PartitionModel'", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "readById").callsFake(
      async (id) => ({ id } as IPartition),
    );

    const actualResult = await PartitionsController.getPartition(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(PartitionModel);
  });

  it("'getPartition' should return null", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "readById").callsFake(
      async () => null,
    );

    const actualResult = await PartitionsController.getPartition(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getPartitions' should return List of instanceOf 'PartitionModel'", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "readList").callsFake(
      async () => [{ id: 1 }] as IPartition[],
    );

    const actualResult = await PartitionsController.getPartitions();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(PartitionModel);
    });
  });

  it("'getPartitions' should return null", async () => {
    const serviceStub = Sinon.stub(PartitionsService, "readList").callsFake(
      async () => [],
    );

    const actualResult = await PartitionsController.getPartitions();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
