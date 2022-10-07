import { SecRulesService } from "../services";
import { ISecRuleCreateDTO, ISecRulePatchDTO, SecRuleModel } from "../models";

class SecRulesController {
  getSecRule = async (id: number): Promise<SecRuleModel | null> => {
    try {
      const secRule = await SecRulesService.readById(id);

      if (secRule) {
        return new SecRuleModel(secRule);
      }

      return null;
    } catch (err) {
      console.error("SecRulesController(getSecRule) error: ", err);
      throw err;
    }
  };

  getSecRules = async (): Promise<SecRuleModel[] | null> => {
    try {
      const secRules = await SecRulesService.readList();

      if (secRules.length) {
        return secRules.map((secRule) => {
          return new SecRuleModel(secRule);
        });
      }

      return null;
    } catch (err) {
      console.error("SecRulesController(getSecRules) error: ", err);
      throw err;
    }
  };

  addSecRule = async (
    secRule: ISecRuleCreateDTO,
  ): Promise<SecRuleModel | null> => {
    try {
      const secRuleRes = await SecRulesService.create(secRule);

      if (secRuleRes) {
        return new SecRuleModel(secRuleRes);
      }

      return null;
    } catch (err) {
      console.error("SecRulesController(addSecRule) error: ", err);
      throw err;
    }
  };

  addSecRules = async (
    secRules: ISecRuleCreateDTO[],
  ): Promise<SecRuleModel[] | null> => {
    try {
      const secRuleRes = await SecRulesService.createList(secRules);

      if (secRuleRes.length) {
        const res: SecRuleModel[] = [];
        for (const secRule of secRuleRes) {
          if (secRule) {
            res.push(new SecRuleModel(secRule));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error("SecRulesController(addSecRules) error: ", err);
      throw err;
    }
  };

  deleteSecRule = async (id: number): Promise<boolean> => {
    try {
      const secRule = await SecRulesService.deleteById(id);

      if (secRule) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecRulesController(deleteSecRule) error: ", err);
      throw err;
    }
  };

  deleteSecRules = async (ids: number[]): Promise<boolean> => {
    try {
      const secRulesDeleted = await SecRulesService.deleteList(ids);

      if (secRulesDeleted && secRulesDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecRulesController(deleteSecRules) error: ", err);
      throw err;
    }
  };

  updateSecRule = async (
    id: number,
    secRule: ISecRulePatchDTO,
  ): Promise<boolean> => {
    try {
      const secRuleRes = await SecRulesService.patchById(id, secRule);

      if (secRuleRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecRulesController(updateSecRule) error: ", err);
      throw err;
    }
  };

  updateSecRules = async (
    ids: number[],
    secRule: ISecRulePatchDTO,
  ): Promise<boolean> => {
    try {
      const secRulesUpdated = await SecRulesService.patchList(ids, secRule);

      if (secRulesUpdated && secRulesUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecRulesController(updateSecRules) error: ", err);
      throw err;
    }
  };
}

export default new SecRulesController();
