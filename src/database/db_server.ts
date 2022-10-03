import { DatabaseFactory } from "../connections";
import { IServer } from "../models";

class DatabaseServer {
  getServer = (id: number): Promise<IServer | null> => {
    return DatabaseFactory.getConnection()
      .getClient()
      .server.findUnique({
        where: {
          id: id,
        },
      });
  };

  addServer = (server: Omit<IServer, "id">): Promise<IServer | null> => {
    return DatabaseFactory.getConnection().getClient().server.create({
      data: server,
    });
  };

  deleteServer = (id: number): Promise<IServer | null> => {
    return DatabaseFactory.getConnection()
      .getClient()
      .server.delete({
        where: {
          id: id,
        },
      });
  };

  updateServer = (
    id: number,
    server: Omit<IServer, "id">,
  ): Promise<IServer | null> => {
    return DatabaseFactory.getConnection()
      .getClient()
      .server.update({
        where: {
          id: id,
        },
        data: server,
      });
  };

  getServers = (): Promise<IServer[]> => {
    return DatabaseFactory.getConnection().getClient().server.findMany();
  };
}

export { DatabaseServer };
