import { Server as IServerOmit } from "@prisma/client";
import { JSONObject } from "./types";

class ServerModel implements IServerOmit {
  id: number;
  type: string;
  hostname: string;
  ram: number;
  cpu_count: number;

  constructor(server: IServerOmit | JSONObject) {
    Object.assign(this, server);
  }

  getID() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getHostname() {
    return this.hostname;
  }

  getRam() {
    return this.ram;
  }

  getCpuCount() {
    return this.cpu_count;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      type: this.type,
      hostname: this.hostname,
      ram: this.ram,
      cpu_count: this.cpu_count,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export { ServerModel, IServerOmit };
