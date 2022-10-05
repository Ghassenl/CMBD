import { PrismaClient } from "@prisma/client";
import { IServer, IServerCreateDTO, IServerPatchDTO } from "../models";
import { CRUDService } from "./types";

class ServersService
  implements CRUDService<IServer, IServerCreateDTO, IServerPatchDTO>
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: IServerCreateDTO) => {
    return this.prisma.server
      .create({
        data: resource,
      })
      .then((res) => res);
  };

  readById = (id: number) => {
    return this.prisma.server
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res);
  };

  deleteById = (id: number) => {
    return this.prisma.server
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: IServerPatchDTO) => {
    return this.prisma.server
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: IServerCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = () => {
    return this.prisma.server.findMany().then((res) => res);
  };

  deleteList = (ids: number[]) => {
    return this.prisma.server
      .deleteMany({
        where: {
          id: {
            in: ids,
          },
        },
      })
      .then((res) => {
        if (res.count > 0) {
          return res.count;
        }

        return null;
      });
  };

  patchList = (ids: number[], resource: IServerPatchDTO) => {
    return this.prisma.server
      .updateMany({
        where: {
          id: {
            in: ids,
          },
        },
        data: resource,
      })
      .then((res) => {
        if (res.count > 0) {
          return res.count;
        }

        return null;
      });
  };
}

export default new ServersService();
