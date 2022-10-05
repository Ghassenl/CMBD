import { PrismaClient } from "@prisma/client";
import { ISecGroup, ISecGroupCreateDTO, ISecGroupPatchDTO } from "../models";
import { CRUDService } from "./types";

class SecGroupsService
  implements CRUDService<ISecGroup, ISecGroupCreateDTO, ISecGroupPatchDTO>
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: ISecGroupCreateDTO) => {
    return this.prisma.secGroup
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.secGroup
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  readByIdWithSecRules = (id: number, secRuleId?: number) => {
    return this.prisma.secGroup
      .findUnique({
        include: {
          secRules: secRuleId
            ? {
                where: {
                  id: {
                    equals: secRuleId,
                  },
                },
                take: secRuleId ? 1 : undefined,
              }
            : true,
        },
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  readByIdWithSecGroupServers = (id: number, secGroupServerId?: number) => {
    return this.prisma.secGroup
      .findUnique({
        include: {
          secGroupServers: secGroupServerId
            ? {
                where: {
                  id: {
                    equals: secGroupServerId,
                  },
                },
                take: secGroupServerId ? 1 : undefined,
              }
            : true,
        },
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  deleteById = (id: number) => {
    return this.prisma.secGroup
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: ISecGroupPatchDTO) => {
    return this.prisma.secGroup
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: ISecGroupCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = (): Promise<ISecGroup[]> => {
    return this.prisma.secGroup.findMany();
  };

  deleteList = (ids: number[]) => {
    return this.prisma.secGroup
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

  patchList = (ids: number[], resource: ISecGroupPatchDTO) => {
    return this.prisma.secGroup
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

export default new SecGroupsService();
