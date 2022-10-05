import { ServersService } from "../services";
import { IServerCreateDTO, IServerPatchDTO, ServerModel } from "../models";

class ServersController {
  getServer = async (id: number): Promise<ServerModel | null> => {
    try {
      const server = await ServersService.readById(id);

      if (server) {
        return new ServerModel(server);
      }

      return null;
    } catch (err) {
      console.error("ServersController(getServer) error: ", err);
      throw err;
    }
  };

  getServerWithDisks = async (
    id: number,
    diskId?: number,
  ): Promise<ServerModel | null> => {
    try {
      const server = await ServersService.readByIdWithDisks(id, diskId);

      if (server) {
        return new ServerModel(server);
      }

      return null;
    } catch (err) {
      console.error("ServersController(getServerWithDisks) error: ", err);
      throw err;
    }
  };

  getServerWithSecGroupServers = async (
    id: number,
    secGroupServerId?: number,
  ): Promise<ServerModel | null> => {
    try {
      const server = await ServersService.readByIdWithSecGroupServers(
        id,
        secGroupServerId,
      );

      if (server) {
        return new ServerModel(server);
      }

      return null;
    } catch (err) {
      console.error(
        "ServersController(getServerWithSecGroupServers) error: ",
        err,
      );
      throw err;
    }
  };

  getServerWithNetworkInterfaces = async (
    id: number,
    networkInterfaceId?: number,
  ): Promise<ServerModel | null> => {
    try {
      const server = await ServersService.readByIdWithNetworkInterfaces(
        id,
        networkInterfaceId,
      );

      if (server) {
        return new ServerModel(server);
      }

      return null;
    } catch (err) {
      console.error(
        "ServersController(getServerWithNetworkInterfaces) error: ",
        err,
      );
      throw err;
    }
  };

  getServers = async (): Promise<ServerModel[] | null> => {
    try {
      const servers = await ServersService.readList();

      if (servers.length) {
        return servers.map((server) => {
          return new ServerModel(server);
        });
      }

      return null;
    } catch (err) {
      console.error("ServersController(getServers) error: ", err);
      throw err;
    }
  };

  addServer = async (server: IServerCreateDTO): Promise<ServerModel | null> => {
    try {
      const serverRes = await ServersService.create(server);

      if (serverRes) {
        return new ServerModel(serverRes);
      }

      return null;
    } catch (err) {
      console.error("ServersController(addServer) error: ", err);
      throw err;
    }
  };

  addServers = async (
    servers: IServerCreateDTO[],
  ): Promise<ServerModel[] | null> => {
    try {
      const serverRes = await ServersService.createList(servers);

      if (serverRes) {
        const res: ServerModel[] = [];
        for (const server of serverRes) {
          if (server) {
            res.push(new ServerModel(server));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error("ServersController(addServers) error: ", err);
      throw err;
    }
  };

  deleteServer = async (id: number): Promise<boolean> => {
    try {
      const server = await ServersService.deleteById(id);

      if (server) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("ServersController(deleteServer) error: ", err);
      throw err;
    }
  };

  deleteServers = async (ids: number[]): Promise<boolean> => {
    try {
      const serversDeleted = await ServersService.deleteList(ids);

      if (serversDeleted && serversDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("ServersController(deleteServers) error: ", err);
      throw err;
    }
  };

  updateServer = async (
    id: number,
    server: IServerPatchDTO,
  ): Promise<boolean> => {
    try {
      const serverRes = await ServersService.patchById(id, server);

      if (serverRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("ServersController(updateServer) error: ", err);
      throw err;
    }
  };

  updateServers = async (
    ids: number[],
    server: IServerPatchDTO,
  ): Promise<boolean> => {
    try {
      const serversUpdated = await ServersService.patchList(ids, server);

      if (serversUpdated && serversUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("ServersController(updateServers) error: ", err);
      throw err;
    }
  };
}

export default new ServersController();
