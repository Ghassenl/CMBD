import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { RaidsController } from "../../src/controllers";
import { RaidsService } from "../../src/services";
import { RaidModel, IRaid } from "../../src/models";

describe("Test RaidsController", () => {
  it("'addRaid' should return instanceOf 'RaidModel'", async () => {
    const serviceStub = Sinon.stub(RaidsService, "create").callsFake(
      async (item) => {
        return new RaidModel(item);
      },
    );

    const actualResult = await RaidsController.addRaid({ id: 1 } as IRaid);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(RaidModel);
  });

  it("'addRaid' should return null", async () => {
    const serviceStub = Sinon.stub(RaidsService, "create").callsFake(
      async () => null,
    );

    const actualResult = await RaidsController.addRaid({ id: 1 } as IRaid);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addRaids' should return List of instanceOf 'RaidModel'", async () => {
    const serviceStub = Sinon.stub(RaidsService, "createList").callsFake(
      async (items) => {
        return items.map((item) => new RaidModel(item));
      },
    );

    const actualResult = await RaidsController.addRaids([
      {
        id: 1,
      } as IRaid,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(RaidModel);
    });
  });

  it("'addRaids' should return null", async () => {
    const serviceStub = Sinon.stub(RaidsService, "createList").callsFake(
      async () => [],
    );

    const actualResult = await RaidsController.addRaids([
      {
        id: 1,
      } as IRaid,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteRaid' should delete & return instanceOf 'RaidModel'", async () => {
    const serviceStub = Sinon.stub(RaidsService, "deleteById").callsFake(
      async (id) => {
        return new RaidModel({ id });
      },
    );

    const actualResult = await RaidsController.deleteRaid(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteRaid' should false", async () => {
    const serviceStub = Sinon.stub(RaidsService, "deleteById").callsFake(
      async () => null,
    );

    const actualResult = await RaidsController.deleteRaid(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteRaids' should return true", async () => {
    const serviceStub = Sinon.stub(RaidsService, "deleteList").callsFake(
      async () => 2,
    );

    const actualResult = await RaidsController.deleteRaids([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteRaids' should return false", async () => {
    const serviceStub = Sinon.stub(RaidsService, "deleteList").callsFake(
      async () => null,
    );

    const actualResult = await RaidsController.deleteRaids([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateRaid' should return true", async () => {
    const serviceStub = Sinon.stub(RaidsService, "patchById").callsFake(
      async (id) => {
        return { id } as IRaid;
      },
    );

    const actualResult = await RaidsController.updateRaid(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateRaid' should return false", async () => {
    const serviceStub = Sinon.stub(RaidsService, "patchById").callsFake(
      async () => null,
    );

    const actualResult = await RaidsController.updateRaid(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateRaids' should return true", async () => {
    const serviceStub = Sinon.stub(RaidsService, "patchList").callsFake(
      async () => 2,
    );

    const actualResult = await RaidsController.updateRaids([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateRaids' should return false", async () => {
    const serviceStub = Sinon.stub(RaidsService, "patchList").callsFake(
      async () => null,
    );

    const actualResult = await RaidsController.updateRaids([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getRaid' should return instanceOf 'RaidModel'", async () => {
    const serviceStub = Sinon.stub(RaidsService, "readById").callsFake(
      async (id) => ({ id } as IRaid),
    );

    const actualResult = await RaidsController.getRaid(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(RaidModel);
  });

  it("'getRaid' should return null", async () => {
    const serviceStub = Sinon.stub(RaidsService, "readById").callsFake(
      async () => null,
    );

    const actualResult = await RaidsController.getRaid(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getRaids' should return List of instanceOf 'RaidModel'", async () => {
    const serviceStub = Sinon.stub(RaidsService, "readList").callsFake(
      async () => [{ id: 1 }] as IRaid[],
    );

    const actualResult = await RaidsController.getRaids();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(RaidModel);
    });
  });

  it("'getRaids' should return null", async () => {
    const serviceStub = Sinon.stub(RaidsService, "readList").callsFake(
      async () => [],
    );

    const actualResult = await RaidsController.getRaids();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
