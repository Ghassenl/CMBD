import { describe, it } from "mocha";
import { expect } from "chai";
import Sinon from "sinon";
import { SecRulesController } from "../../src/controllers";
import { SecRulesService } from "../../src/services";
import { SecRuleModel, ISecRule } from "../../src/models";

describe("Test SecRulesController", () => {
  it("'addSecRule' should return instanceOf 'SecRuleModel'", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "create").callsFake(
      async (item) => {
        return new SecRuleModel(item);
      },
    );

    const actualResult = await SecRulesController.addSecRule({
      id: 1,
    } as ISecRule);

    serviceStub.restore();

    expect(actualResult).to.be.instanceOf(SecRuleModel);
  });

  it("'addSecRule' should return null", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "create").callsFake(
      async () => null,
    );

    const actualResult = await SecRulesController.addSecRule({
      id: 1,
    } as ISecRule);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'addSecRules' should return List of instanceOf 'SecRuleModel'", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "createList").callsFake(
      async (items) => {
        return items.map((item) => new SecRuleModel(item));
      },
    );

    const actualResult = await SecRulesController.addSecRules([
      {
        id: 1,
      } as ISecRule,
    ]);

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(SecRuleModel);
    });
  });

  it("'addSecRules' should return null", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "createList").callsFake(
      async () => [],
    );

    const actualResult = await SecRulesController.addSecRules([
      {
        id: 1,
      } as ISecRule,
    ]);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'deleteSecRule' should delete & return instanceOf 'SecRuleModel'", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "deleteById").callsFake(
      async (id) => {
        return new SecRuleModel({ id });
      },
    );

    const actualResult = await SecRulesController.deleteSecRule(1);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteSecRule' should false", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "deleteById").callsFake(
      async () => null,
    );

    const actualResult = await SecRulesController.deleteSecRule(1);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'deleteSecRules' should return true", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "deleteList").callsFake(
      async () => 2,
    );

    const actualResult = await SecRulesController.deleteSecRules([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'deleteSecRules' should return false", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "deleteList").callsFake(
      async () => null,
    );

    const actualResult = await SecRulesController.deleteSecRules([1, 2]);

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateSecRule' should return true", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "patchById").callsFake(
      async (id) => {
        return { id } as ISecRule;
      },
    );

    const actualResult = await SecRulesController.updateSecRule(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateSecRule' should return false", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "patchById").callsFake(
      async () => null,
    );

    const actualResult = await SecRulesController.updateSecRule(1, {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'updateSecRules' should return true", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "patchList").callsFake(
      async () => 2,
    );

    const actualResult = await SecRulesController.updateSecRules([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.true;
  });

  it("'updateSecRules' should return false", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "patchList").callsFake(
      async () => null,
    );

    const actualResult = await SecRulesController.updateSecRules([1, 2], {});

    serviceStub.restore();

    expect(actualResult).to.be.false;
  });

  it("'getSecRule' should return instanceOf 'SecRuleModel'", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "readById").callsFake(
      async (id) => ({ id } as ISecRule),
    );

    const actualResult = await SecRulesController.getSecRule(1);

    serviceStub.restore();

    expect(actualResult).instanceOf(SecRuleModel);
  });

  it("'getSecRule' should return null", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "readById").callsFake(
      async () => null,
    );

    const actualResult = await SecRulesController.getSecRule(1);

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });

  it("'getSecRules' should return List of instanceOf 'SecRuleModel'", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "readList").callsFake(
      async () => [{ id: 1 }] as ISecRule[],
    );

    const actualResult = await SecRulesController.getSecRules();

    serviceStub.restore();

    actualResult?.forEach((result) => {
      expect(result).instanceOf(SecRuleModel);
    });
  });

  it("'getSecRules' should return null", async () => {
    const serviceStub = Sinon.stub(SecRulesService, "readList").callsFake(
      async () => [],
    );

    const actualResult = await SecRulesController.getSecRules();

    serviceStub.restore();

    expect(actualResult).to.be.null;
  });
});
