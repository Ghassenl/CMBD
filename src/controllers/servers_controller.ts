import { getDatabaseConnection } from "../connections";
import { IServerOmit, ServerModel } from "../models";

const getServer = async (id: number): Promise<ServerModel | null> => {
  try {
    const server = await getDatabaseConnection().servers.getServer(id);

    if (server) {
      return new ServerModel(server);
    }

    return null;
  } catch (err) {
    console.error("ServersController(getServer) error: ", err);
    throw err;
  }
};

const getServers = async (): Promise<ServerModel[] | null> => {
  try {
    const servers = await getDatabaseConnection().servers.getServers();

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

const addServer = async (server: IServerOmit): Promise<ServerModel | null> => {
  try {
    const serverRes = await getDatabaseConnection().servers.addServer(server);

    if (serverRes) {
      return new ServerModel(serverRes);
    }
    if (server.type !== "virtual" && server.type !== "physical") {
      return null;
    }
    if (server.ram > 256) {
      return null;
    }
    if (server.cpu_count > 64) {
      return null;
    }

    return null;
  } catch (err) {
    console.error("ServersController(addServer) error: ", err);
    throw err;
  }
};

const addServers = async (
  servers: IServerOmit[],
): Promise<ServerModel[] | null> => {
  try {
    const serverRes = await getDatabaseConnection().servers.addServers(servers);

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

const deleteServer = async (id: number): Promise<boolean> => {
  try {
    const server = await getDatabaseConnection().servers.deleteServer(id);

    if (server) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("ServersController(deleteServer) error: ", err);
    throw err;
  }
};

const deleteServers = async (ids: number[]): Promise<boolean> => {
  try {
    const serversDeleted = await getDatabaseConnection().servers.deleteServers(
      ids,
    );

    if (serversDeleted && serversDeleted === ids.length) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("ServersController(deleteServers) error: ", err);
    throw err;
  }
};

const updateServer = async (
  id: number,
  server: IServerOmit,
): Promise<boolean> => {
  try {
    const serverRes = await getDatabaseConnection().servers.updateServer(
      id,
      server,
    );

    if (serverRes) {
      return true;
    }
    if (server.type !== "virtual" && server.type !== "physical") {
      return false;
    }
    if (server.ram > 256) {
      return false;
    }
    if (server.cpu_count > 64) {
      return false;
    }

    return false;
  } catch (err) {
    console.error("ServersController(updateServer) error: ", err);
    throw err;
  }
};

const updateServers = async (
  ids: number[],
  server: IServerOmit,
): Promise<boolean> => {
  try {
    const serversUpdated = await getDatabaseConnection().servers.updateServers(
      ids,
      server,
    );

    if (serversUpdated && serversUpdated === ids.length) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("ServersController(updateServers) error: ", err);
    throw err;
  }
};

export {
  getServer,
  getServers,
  addServer,
  deleteServer,
  updateServer,
  addServers,
  updateServers,
  deleteServers,
};
