import { PrismaClient } from "@prisma/client";
import {
  INetworkInterface,
  INetworkInterfaceCreateDTO,
  INetworkInterfacePatchDTO,
} from "../models";
import { CRUDService } from "./types";

class NetworkInterfacesService
  implements
    CRUDService<
      INetworkInterface,
      INetworkInterfaceCreateDTO,
      INetworkInterfacePatchDTO
    >
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: INetworkInterfaceCreateDTO) => {
    return this.prisma.networkInterface
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.networkInterface
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  deleteById = (id: number) => {
    return this.prisma.networkInterface
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: INetworkInterfacePatchDTO) => {
    return this.prisma.networkInterface
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: INetworkInterfaceCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = () => {
    return this.prisma.networkInterface.findMany().then((res) => res);
  };

  deleteList = (ids: number[]) => {
    return this.prisma.networkInterface
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

  patchList = (ids: number[], resource: INetworkInterfacePatchDTO) => {
    return this.prisma.networkInterface
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

export default new NetworkInterfacesService();
