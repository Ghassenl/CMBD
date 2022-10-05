import { Raid as IRaid } from "@prisma/client";
import { JSONObject } from "./types";

type IRaidCreateDTO = Omit<IRaid, "id">;
type IRaidPatchDTO = Partial<IRaidCreateDTO>;

class RaidModel implements IRaid {
  id: number;
  raid_type: number;

  constructor(server: IRaid | JSONObject) {
    Object.assign(this, server);
  }

  getID() {
    return this.id;
  }

  getType() {
    return this.raid_type;
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
