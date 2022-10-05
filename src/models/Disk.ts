import { Disk as IDisk } from "@prisma/client";
import { IPartition, PartitionModel } from "./Partition";
import { JSONObject } from "./types";

type IDiskCreateDTO = Omit<IDisk, "id">;
type IDiskPatchDTO = Partial<IDiskCreateDTO>;

class DiskModel implements IDisk {
  id: number;
  type: string;
  size: number;
  id_raid: number | null;
  id_server: number;
  partitions?: PartitionModel[];

  constructor(disk: IDisk | JSONObject) {
    const { partitions, ...restArgs } = disk as JSONObject;

    Object.assign(this, restArgs);

    if (partitions) {
      this.partitions = [];
      (partitions as IPartition[]).forEach((partition) => {
        this.partitions?.push(new PartitionModel(partition));
      });
    }
  }

  getID() {
    return this.id;
  }

  getType() {
    return this.type;
  }

  getSize() {
    return this.size;
  }

  getRaidID() {
    return this.id_raid;
  }

  getServerID() {
    return this.id_server;
  }

  getPartitions() {
    return this.partitions ?? null;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      type: this.type,
      size: this.size,
      id_raid: this.id_raid,
      id_server: this.id_server,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export { DiskModel, IDisk, IDiskCreateDTO, IDiskPatchDTO };
