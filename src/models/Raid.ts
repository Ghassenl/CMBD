import { Raid as IRaid } from "@prisma/client";
import { DiskModel, IDisk } from "./Disk";
import { JSONObject } from "./types";

type IRaidCreateDTO = Omit<IRaid, "id">;
type IRaidPatchDTO = Partial<IRaidCreateDTO>;

class RaidModel implements IRaid {
  id: number;
  raid_type: number;
  disks?: DiskModel[];

  constructor(raid: IRaid | JSONObject) {
    const { disks, ...restArgs } = raid as JSONObject;

    Object.assign(this, restArgs);

    if (disks) {
      this.disks = [];
      (disks as IDisk[]).forEach((disk) => {
        this.disks?.push(new DiskModel(disk));
      });
    }
  }

  getID() {
    return this.id;
  }

  getType() {
    return this.raid_type;
  }

  getDisks() {
    return this.disks ?? null;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      type: this.raid_type,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export { RaidModel, IRaid, IRaidCreateDTO, IRaidPatchDTO };
