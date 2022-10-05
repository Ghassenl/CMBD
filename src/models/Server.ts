import { Server as IServer } from "@prisma/client";
import { DiskModel, IDisk } from "./Disk";
import { JSONObject } from "./types";

type IServerCreateDTO = Omit<IServer, "id">;
type IServerPatchDTO = Partial<IServerCreateDTO>;

class ServerModel implements IServer {
  id: number;
  type: string;
  hostname: string;
  ram: number;
  cpu_count: number;
  disks?: DiskModel[];


  constructor(server: IServer | JSONObject) {
    const { disks, secGroupServers, networkInterfaces, ...restArgs } =
      server as JSONObject;

    Object.assign(this, restArgs);

    if (disks) {
      this.disks = [];
      (disks as IDisk[]).forEach((disk) => {
        this.disks?.push(new DiskModel(disk));
      });
    }

  
    }

    
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

  getDisks() {
    return this.disks ?? null;
  }

  getSecGroupServers() {
    return this.secGroupServers ?? null;
  }

  getNetworkInterfaces() {
    return this.networkInterfaces ?? null;
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

export { ServerModel, IServer, IServerCreateDTO, IServerPatchDTO };
