import { randomBytes } from "crypto";
import { DatabaseFactory } from "../connections";
import { IServer, ServerModel } from "../models";
import { serversRoutes } from "../routes/api/servers";

const getServer = async (id: number): Promise<ServerModel | null> => {
  try {
    const server = await DatabaseFactory.getConnection().servers.getServer(id);

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
    const servers = await DatabaseFactory.getConnection().servers.getServers();

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

const addServer = async (
  server: Omit<IServer, "id">,
): Promise<ServerModel | null> => {
  try {
    const serverRes = await DatabaseFactory.getConnection().servers.addServer(
      server,
    );

    if (serverRes && (server.type ==="physical" || server.type ==="Virtual") && server.cpu_count<64 && server.ram<256) {
      return null;
    }
    return null;
  } catch (err) {
    console.error("ServersController(addServer) error: ", err);
    throw err;
  }
};

const deleteServer = async (id: number): Promise<boolean> => {
  try {
    const server = await DatabaseFactory.getConnection().servers.deleteServer(
      id,
    );

    if (server) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("ServersController(deleteServer) error: ", err);
    throw err;
  }
};

const updateServer = async (
  id: number,
  server: Omit<IServer, "id">,
): Promise<boolean> => {
  try {
    const serverRes =
      await DatabaseFactory.getConnection().servers.updateServer(id, server);

    if (serverRes) {
      return true;
    }

    return false;
  } catch (err) {
    console.error("ServersController(updateServer) error: ", err);
    throw err;
  }
};

export { getServer, getServers, addServer, deleteServer, updateServer };
