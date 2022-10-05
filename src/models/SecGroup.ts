import { SecGroup as ISecGroup } from "@prisma/client";
import { ISecGroupServer, SecGroupServerModel } from "./SecGroupServer";
import { ISecRule, SecRuleModel } from "./SecRule";
import { JSONObject } from "./types";

type ISecGroupCreateDTO = Omit<ISecGroup, "id">;
type ISecGroupPatchDTO = Partial<ISecGroupCreateDTO>;

class SecGroupModel implements ISecGroup {
  id: number;
  name: string;
  secRules?: SecRuleModel[];
  secGroupServers?: SecGroupServerModel[];

  constructor(secGroup: ISecGroup | JSONObject) {
    const { secRules, secGroupServers, ...restArgs } = secGroup as JSONObject;

    Object.assign(this, restArgs);

    if (secRules) {
      this.secRules = [];
      (secRules as ISecRule[]).forEach((secRule) => {
        this.secRules?.push(new SecRuleModel(secRule));
      });
    }

    if (secGroupServers) {
      this.secGroupServers = [];
      (secGroupServers as ISecGroupServer[]).forEach((secGroupServer) => {
        this.secGroupServers?.push(new SecGroupServerModel(secGroupServer));
      });
    }
  }

  getID() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getSecRules() {
    return this.secRules ?? null;
  }

  getSecGroupServers() {
    return this.secGroupServers ?? null;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      name: this.name,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export { SecGroupModel, ISecGroup, ISecGroupCreateDTO, ISecGroupPatchDTO };
