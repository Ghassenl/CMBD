import { PrismaClient } from "@prisma/client";
import { ISecRule, ISecRuleCreateDTO, ISecRulePatchDTO } from "../models";
import { CRUDService } from "./types";

class SecRulesService
  implements CRUDService<ISecRule, ISecRuleCreateDTO, ISecRulePatchDTO>
{
  private prisma: PrismaClient = new PrismaClient();

  create = (resource: ISecRuleCreateDTO) => {
    return this.prisma.secRule
      .create({
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  readById = (id: number) => {
    return this.prisma.secRule
      .findUnique({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  deleteById = (id: number) => {
    return this.prisma.secRule
      .delete({
        where: {
          id: id,
        },
      })
      .then((res) => res)
      .catch(() => null);
  };

  patchById = (id: number, resource: ISecRulePatchDTO) => {
    return this.prisma.secRule
      .update({
        where: {
          id: id,
        },
        data: resource,
      })
      .then((res) => res)
      .catch(() => null);
  };

  createList = (resources: ISecRuleCreateDTO[]) => {
    return Promise.all(
      resources.map((resource) => {
        return this.create(resource);
      }),
    );
  };

  readList = (): Promise<ISecRule[]> => {
    return this.prisma.secRule.findMany();
  };

  deleteList = (ids: number[]) => {
    return this.prisma.secRule
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

  patchList = (ids: number[], resource: ISecRulePatchDTO) => {
    return this.prisma.secRule
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

export default new SecRulesService();
