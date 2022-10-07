import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { SecGroupsController } from "../../src/controllers";
import { SecGroupsService } from "../../src/services";
import { SecGroupModel, ISecGroup } from "../../src/models";

describe("Test SecGroupsController", () => {
  it("'addSecGroup' should return instanceOf 'SecGroupModel'", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "create").callsFake(
      async (item) => {
        return new SecGroupModel(item);
      },
    );

    const actualResult = await SecGroupsController.addSecGroup({
      id: 1,
    } as ISecGroup);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(SecGroupModel);
  });

  it("'addSecGroup' should return null", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "create").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupsController.addSecGroup({
      id: 1,
    } as ISecGroup);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addSecGroups' should return List of instanceOf 'SecGroupModel'", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "createList").callsFake(
      async (items) => {
        return items.map((item) => new SecGroupModel(item));
      },
    );

    const actualResult = await SecGroupsController.addSecGroups([
      {
        id: 1,
      } as ISecGroup,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(SecGroupModel);
    });
  });

  it("'addSecGroups' should return null", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "createList").callsFake(
      async () => [],
    );

    const actualResult = await SecGroupsController.addSecGroups([
      {
        id: 1,
      } as ISecGroup,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteSecGroup' should delete & return instanceOf 'SecGroupModel'", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "deleteById").callsFake(
      async (id) => {
        return new SecGroupModel({ id });
      },
    );

    const actualResult = await SecGroupsController.deleteSecGroup(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteSecGroup' should false", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "deleteById").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupsController.deleteSecGroup(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteSecGroups' should return true", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "deleteList").callsFake(
      async () => 2,
    );

    const actualResult = await SecGroupsController.deleteSecGroups([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteSecGroups' should return false", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "deleteList").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupsController.deleteSecGroups([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateSecGroup' should return true", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "patchById").callsFake(
      async (id) => {
        return { id } as ISecGroup;
      },
    );

    const actualResult = await SecGroupsController.updateSecGroup(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateSecGroup' should return false", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "patchById").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupsController.updateSecGroup(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateSecGroups' should return true", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "patchList").callsFake(
      async () => 2,
    );

    const actualResult = await SecGroupsController.updateSecGroups([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateSecGroups' should return false", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "patchList").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupsController.updateSecGroups([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getSecGroup' should return instanceOf 'SecGroupModel'", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "readById").callsFake(
      async (id) => ({ id } as ISecGroup),
    );

    const actualResult = await SecGroupsController.getSecGroup(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(SecGroupModel);
  });

  it("'getSecGroup' should return null", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "readById").callsFake(
      async () => null,
    );

    const actualResult = await SecGroupsController.getSecGroup(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getSecGroups' should return List of instanceOf 'SecGroupModel'", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "readList").callsFake(
      async () => [{ id: 1 }] as ISecGroup[],
    );

    const actualResult = await SecGroupsController.getSecGroups();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(SecGroupModel);
    });
  });

  it("'getSecGroups' should return null", async () => {
    const serviceStub = Sinon.stub(SecGroupsService, "readList").callsFake(
      async () => [],
    );

    const actualResult = await SecGroupsController.getSecGroups();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
