import { PrismaClient } from "@prisma/client";
import {
  ISecGroupServer,
  ISecGroupServerCreateDTO,
  ISecGroupServerPatchDTO,
} from "../models";
import { CRUDService } from "./types";

class SecGroupServersService
  implements
    CRUDService<
      ISecGroupServer,
      ISecGroupServerCreateDTO,
      ISecGroupServerPatchDTO
    >
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: ISecGroupServerCreateDTO) => {
    return this.prisma.secGroupServer
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.secGroupServer
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  deleteById = (id: number) => {
    return this.prisma.secGroupServer
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: ISecGroupServerPatchDTO) => {
    return this.prisma.secGroupServer
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: ISecGroupServerCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = () => {
    return this.prisma.secGroupServer.findMany().then((res) => res);
  };

  deleteList = (ids: number[]) => {
    return this.prisma.secGroupServer
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

  patchList = (ids: number[], resource: ISecGroupServerPatchDTO) => {
    return this.prisma.secGroupServer
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

export default new SecGroupServersService();
