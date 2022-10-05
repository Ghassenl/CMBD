import { RaidsService } from "../services";
import { IRaidCreateDTO, IRaidPatchDTO, RaidModel } from "../models";

class RaidsController {
  getRaid = async (id: number): Promise<RaidModel | null> => {
    try {
      const raid = await RaidsService.readById(id);

      if (raid) {
        return new RaidModel(raid);
      }

      return null;
    } catch (err) {
      console.error("RaidsController(getRaid) error: ", err);
      throw err;
    }
  };

  getRaidWithDisks = async (
    id: number,
    diskId?: number,
  ): Promise<RaidModel | null> => {
    try {
      const raid = await RaidsService.readByIdWithDisks(id, diskId);

      if (raid) {
        return new RaidModel(raid);
      }

      return null;
    } catch (err) {
      console.error("RaidsController(getRaidWithDisks) error: ", err);
      throw err;
    }
  };

  getRaids = async (): Promise<RaidModel[] | null> => {
    try {
      const raids = await RaidsService.readList();

      if (raids.length) {
        return raids.map((raid) => {
          return new RaidModel(raid);
        });
      }

      return null;
    } catch (err) {
      console.error("RaidsController(getRaids) error: ", err);
      throw err;
    }
  };

  addRaid = async (raid: IRaidCreateDTO): Promise<RaidModel | null> => {
    try {
      const raidRes = await RaidsService.create(raid);

      if (raidRes) {
        return new RaidModel(raidRes);
      }

      return null;
    } catch (err) {
      console.error("RaidsController(addRaid) error: ", err);
      throw err;
    }
  };

  addRaids = async (raids: IRaidCreateDTO[]): Promise<RaidModel[] | null> => {
    try {
      const raidRes = await RaidsService.createList(raids);

      if (raidRes) {
        const res: RaidModel[] = [];
        for (const raid of raidRes) {
          if (raid) {
            res.push(new RaidModel(raid));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error("RaidsController(addRaids) error: ", err);
      throw err;
    }
  };

  deleteRaid = async (id: number): Promise<boolean> => {
    try {
      const raid = await RaidsService.deleteById(id);

      if (raid) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("RaidsController(deleteRaid) error: ", err);
      throw err;
    }
  };

  deleteRaids = async (ids: number[]): Promise<boolean> => {
    try {
      const raidsDeleted = await RaidsService.deleteList(ids);

      if (raidsDeleted && raidsDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("RaidsController(deleteRaids) error: ", err);
      throw err;
    }
  };

  updateRaid = async (id: number, raid: IRaidPatchDTO): Promise<boolean> => {
    try {
      const raidRes = await RaidsService.patchById(id, raid);

      if (raidRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("RaidsController(updateRaid) error: ", err);
      throw err;
    }
  };

  updateRaids = async (
    ids: number[],
    raid: IRaidPatchDTO,
  ): Promise<boolean> => {
    try {
      const raidsUpdated = await RaidsService.patchList(ids, raid);

      if (raidsUpdated && raidsUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("RaidsController(updateRaids) error: ", err);
      throw err;
    }
  };
}

export default new RaidsController();
