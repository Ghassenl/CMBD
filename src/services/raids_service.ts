import { PrismaClient } from "@prisma/client";
import { IRaid, IRaidCreateDTO, IRaidPatchDTO } from "../models";
import { CRUDService } from "./types";

class RaidsService
  implements CRUDService<IRaid, IRaidCreateDTO, IRaidPatchDTO>
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: IRaidCreateDTO) => {
    return this.prisma.raid
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.raid
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  readByIdWithDisks = (id: number, diskId?: number) => {
    return this.prisma.raid
      .findUnique({
        include: {
          disks: diskId
            ? {
                where: {
                  id: {
                    equals: diskId,
                  },
                },
                take: diskId ? 1 : undefined,
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
    return this.prisma.raid
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: IRaidPatchDTO) => {
    return this.prisma.raid
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: IRaidCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = (): Promise<IRaid[]> => {
    return this.prisma.raid.findMany();
  };

  deleteList = (ids: number[]) => {
    return this.prisma.raid
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

  patchList = (ids: number[], resource: IRaidPatchDTO) => {
    return this.prisma.raid
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

export default new RaidsService();
