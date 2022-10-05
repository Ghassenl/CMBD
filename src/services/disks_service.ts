import { PrismaClient } from "@prisma/client";
import { IDisk, IDiskCreateDTO, IDiskPatchDTO } from "../models";
import { CRUDService } from "./types";

class DisksService
  implements CRUDService<IDisk, IDiskCreateDTO, IDiskPatchDTO>
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: IDiskCreateDTO) => {
    return this.prisma.disk
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.disk
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  readByIdWithPartitions = (id: number, partitionId?: number) => {
    return this.prisma.disk
      .findUnique({
        include: {
          partitions: partitionId
            ? {
                where: {
                  id: {
                    equals: partitionId,
                  },
                },
                take: partitionId ? 1 : undefined,
              }
            : true,
        },
        where: {
          id: id,
        },
      })
      .then((res) => res);
  };

  deleteById = (id: number) => {
    return this.prisma.disk
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: IDiskPatchDTO) => {
    return this.prisma.disk
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: IDiskCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = () => {
    return this.prisma.disk.findMany().then((res) => res);
  };

  deleteList = (ids: number[]) => {
    return this.prisma.disk
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

  patchList = (ids: number[], resource: IDiskPatchDTO) => {
    return this.prisma.disk
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

export default new DisksService();
