import { Partition as IPartition } from "@prisma/client";
import { JSONObject } from "./types";

type IPartitionCreateDTO = Omit<IPartition, "id">;
type IPartitionPatchDTO = Partial<IPartitionCreateDTO>;

class PartitionModel implements IPartition {
  id: number;
  fs_format: string;
  size: number;
  id_disk: number;

  constructor(partition: IPartition | JSONObject) {
    Object.assign(this, partition);
  }

  getID() {
    return this.id;
  }

  getFsFormat() {
    return this.fs_format;
  }

  getSize() {
    return this.size;
  }

  getDiskID() {
    return this.id_disk;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      fs_format: this.fs_format,
      size: this.size,
      id_disk: this.id_disk,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export { PartitionModel, IPartition, IPartitionCreateDTO, IPartitionPatchDTO };
