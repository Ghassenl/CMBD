import { SecGroupServersService } from "../services";
import {
  ISecGroupServerCreateDTO,
  ISecGroupServerPatchDTO,
  SecGroupServerModel,
} from "../models";

class SecGroupServersController {
  getSecGroupServer = async (
    id: number,
  ): Promise<SecGroupServerModel | null> => {
    try {
      const secGroupServer = await SecGroupServersService.readById(id);

      if (secGroupServer) {
        return new SecGroupServerModel(secGroupServer);
      }

      return null;
    } catch (err) {
      console.error(
        "SecGroupServersController(getSecGroupServer) error: ",
        err,
      );
      throw err;
    }
  };

  getSecGroupServers = async (): Promise<SecGroupServerModel[] | null> => {
    try {
      const secGroupServers = await SecGroupServersService.readList();

      if (secGroupServers.length) {
        return secGroupServers.map((secGroupServer) => {
          return new SecGroupServerModel(secGroupServer);
        });
      }

      return null;
    } catch (err) {
      console.error(
        "SecGroupServersController(getSecGroupServers) error: ",
        err,
      );
      throw err;
    }
  };

  addSecGroupServer = async (
    secGroupServer: ISecGroupServerCreateDTO,
  ): Promise<SecGroupServerModel | null> => {
    try {
      const secGroupServerRes = await SecGroupServersService.create(
        secGroupServer,
      );

      if (secGroupServerRes) {
        return new SecGroupServerModel(secGroupServerRes);
      }

      return null;
    } catch (err) {
      console.error(
        "SecGroupServersController(addSecGroupServer) error: ",
        err,
      );
      throw err;
    }
  };

  addSecGroupServers = async (
    secGroupServers: ISecGroupServerCreateDTO[],
  ): Promise<SecGroupServerModel[] | null> => {
    try {
      const secGroupServerRes = await SecGroupServersService.createList(
        secGroupServers,
      );

      if (secGroupServerRes.length) {
        const res: SecGroupServerModel[] = [];
        for (const secGroupServer of secGroupServerRes) {
          if (secGroupServer) {
            res.push(new SecGroupServerModel(secGroupServer));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error(
        "SecGroupServersController(addSecGroupServers) error: ",
        err,
      );
      throw err;
    }
  };

  deleteSecGroupServer = async (id: number): Promise<boolean> => {
    try {
      const secGroupServer = await SecGroupServersService.deleteById(id);

      if (secGroupServer) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "SecGroupServersController(deleteSecGroupServer) error: ",
        err,
      );
      throw err;
    }
  };

  deleteSecGroupServers = async (ids: number[]): Promise<boolean> => {
    try {
      const secGroupServersDeleted = await SecGroupServersService.deleteList(
        ids,
      );

      if (secGroupServersDeleted && secGroupServersDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "SecGroupServersController(deleteSecGroupServers) error: ",
        err,
      );
      throw err;
    }
  };

  updateSecGroupServer = async (
    id: number,
    secGroupServer: ISecGroupServerPatchDTO,
  ): Promise<boolean> => {
    try {
      const secGroupServerRes = await SecGroupServersService.patchById(
        id,
        secGroupServer,
      );

      if (secGroupServerRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "SecGroupServersController(updateSecGroupServer) error: ",
        err,
      );
      throw err;
    }
  };

  updateSecGroupServers = async (
    ids: number[],
    secGroupServer: ISecGroupServerPatchDTO,
  ): Promise<boolean> => {
    try {
      const secGroupServersUpdated = await SecGroupServersService.patchList(
        ids,
        secGroupServer,
      );

      if (secGroupServersUpdated && secGroupServersUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "SecGroupServersController(updateSecGroupServers) error: ",
        err,
      );
      throw err;
    }
  };
}

export default new SecGroupServersController();
