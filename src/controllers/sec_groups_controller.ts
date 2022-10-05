import { SecGroupsService } from "../services";
import {
  ISecGroupCreateDTO,
  ISecGroupPatchDTO,
  SecGroupModel,
} from "../models";

class SecGroupsController {
  getSecGroup = async (id: number): Promise<SecGroupModel | null> => {
    try {
      const secGroup = await SecGroupsService.readById(id);

      if (secGroup) {
        return new SecGroupModel(secGroup);
      }

      return null;
    } catch (err) {
      console.error("SecGroupsController(getSecGroup) error: ", err);
      throw err;
    }
  };

  getSecGroupWithSecRules = async (
    id: number,
    secRuleId?: number,
  ): Promise<SecGroupModel | null> => {
    try {
      const secGroup = await SecGroupsService.readByIdWithSecRules(
        id,
        secRuleId,
      );

      if (secGroup) {
        return new SecGroupModel(secGroup);
      }

      return null;
    } catch (err) {
      console.error("SecGroupsController(getSecGroupWithRules) error: ", err);
      throw err;
    }
  };

  getSecGroupWithSecGroupServers = async (
    id: number,
    secGroupServerId?: number,
  ): Promise<SecGroupModel | null> => {
    try {
      const secGroup = await SecGroupsService.readByIdWithSecGroupServers(
        id,
        secGroupServerId,
      );

      if (secGroup) {
        return new SecGroupModel(secGroup);
      }

      return null;
    } catch (err) {
      console.error(
        "SecGroupsController(getSecGroupWithSecGroupServers) error: ",
        err,
      );
      throw err;
    }
  };

  getSecGroups = async (): Promise<SecGroupModel[] | null> => {
    try {
      const secGroups = await SecGroupsService.readList();

      if (secGroups.length) {
        return secGroups.map((secGroup) => {
          return new SecGroupModel(secGroup);
        });
      }

      return null;
    } catch (err) {
      console.error("SecGroupsController(getSecGroups) error: ", err);
      throw err;
    }
  };

  addSecGroup = async (
    secGroup: ISecGroupCreateDTO,
  ): Promise<SecGroupModel | null> => {
    try {
      const secGroupRes = await SecGroupsService.create(secGroup);

      if (secGroupRes) {
        return new SecGroupModel(secGroupRes);
      }

      return null;
    } catch (err) {
      console.error("SecGroupsController(addSecGroup) error: ", err);
      throw err;
    }
  };

  addSecGroups = async (
    secGroups: ISecGroupCreateDTO[],
  ): Promise<SecGroupModel[] | null> => {
    try {
      const secGroupRes = await SecGroupsService.createList(secGroups);

      if (secGroupRes) {
        const res: SecGroupModel[] = [];
        for (const secGroup of secGroupRes) {
          if (secGroup) {
            res.push(new SecGroupModel(secGroup));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error("SecGroupsController(addSecGroups) error: ", err);
      throw err;
    }
  };

  deleteSecGroup = async (id: number): Promise<boolean> => {
    try {
      const secGroup = await SecGroupsService.deleteById(id);

      if (secGroup) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecGroupsController(deleteSecGroup) error: ", err);
      throw err;
    }
  };

  deleteSecGroups = async (ids: number[]): Promise<boolean> => {
    try {
      const secGroupsDeleted = await SecGroupsService.deleteList(ids);

      if (secGroupsDeleted && secGroupsDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecGroupsController(deleteSecGroups) error: ", err);
      throw err;
    }
  };

  updateSecGroup = async (
    id: number,
    secGroup: ISecGroupPatchDTO,
  ): Promise<boolean> => {
    try {
      const secGroupRes = await SecGroupsService.patchById(id, secGroup);

      if (secGroupRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecGroupsController(updateSecGroup) error: ", err);
      throw err;
    }
  };

  updateSecGroups = async (
    ids: number[],
    secGroup: ISecGroupPatchDTO,
  ): Promise<boolean> => {
    try {
      const secGroupsUpdated = await SecGroupsService.patchList(ids, secGroup);

      if (secGroupsUpdated && secGroupsUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("SecGroupsController(updateSecGroups) error: ", err);
      throw err;
    }
  };
}

export default new SecGroupsController();
