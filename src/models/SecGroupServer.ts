import { SecGroupServer as ISecGroupServer } from "@prisma/client";
import { JSONObject } from "./types";

type ISecGroupServerCreateDTO = Omit<ISecGroupServer, "id">;
type ISecGroupServerPatchDTO = Partial<ISecGroupServerCreateDTO>;

class SecGroupServerModel implements ISecGroupServer {
  id: number;
  id_sec_group: number;
  id_server: number;

  constructor(secGroupServer: ISecGroupServer | JSONObject) {
    Object.assign(this, secGroupServer);
  }

  getID() {
    return this.id;
  }

  getSecGroupID() {
    return this.id_sec_group;
  }

  getServerID() {
    return this.id_server;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      id_sec_group: this.id_sec_group,
      id_server: this.id_server,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export {
  SecGroupServerModel,
  ISecGroupServer,
  ISecGroupServerCreateDTO,
  ISecGroupServerPatchDTO,
};
