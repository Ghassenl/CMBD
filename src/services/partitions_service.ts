import { PrismaClient } from "@prisma/client";
import { IPartition, IPartitionCreateDTO, IPartitionPatchDTO } from "../models";
import { CRUDService } from "./types";

class PartitionsService
  implements CRUDService<IPartition, IPartitionCreateDTO, IPartitionPatchDTO>
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: IPartitionCreateDTO) => {
    return this.prisma.partition
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.partition
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  deleteById = (id: number) => {
    return this.prisma.partition
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: IPartitionPatchDTO) => {
    return this.prisma.partition
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: IPartitionCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = () => {
    return this.prisma.partition.findMany().then((res) => res);
  };

  deleteList = (ids: number[]) => {
    return this.prisma.partition
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

  patchList = (ids: number[], resource: IPartitionPatchDTO) => {
    return this.prisma.partition
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

export default new PartitionsService();
