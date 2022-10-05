import { SecRule as ISecRule } from "@prisma/client";
import { JSONObject } from "./types";

type ISecRuleCreateDTO = Omit<ISecRule, "id">;
type ISecRulePatchDTO = Partial<ISecRuleCreateDTO>;

class SecRuleModel implements ISecRule {
  id: number;
  port: number;
  direction: string;
  destination: string | null;
  policy: string;
  id_sec_group: number;

  constructor(secRule: ISecRule | JSONObject) {
    Object.assign(this, secRule);
  }

  getID() {
    return this.id;
  }

  getPort() {
    return this.port;
  }

  getDirection() {
    return this.direction;
  }

  getDestination() {
    return this.destination;
  }

  getPolicy() {
    return this.policy;
  }

  getSecGroupID() {
    return this.getSecGroupID;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      port: this.port,
      direction: this.direction,
      destination: this.destination,
      policy: this.policy,
      id_sec_group: this.id_sec_group,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export { SecRuleModel, ISecRule, ISecRuleCreateDTO, ISecRulePatchDTO };
