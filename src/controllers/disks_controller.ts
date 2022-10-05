import { DisksService } from "../services";
import { IDiskCreateDTO, IDiskPatchDTO, DiskModel } from "../models";

class DisksController {
  getDisk = async (id: number): Promise<DiskModel | null> => {
    try {
      const disk = await DisksService.readById(id);

      if (disk) {
        return new DiskModel(disk);
      }

      return null;
    } catch (err) {
      console.error("DisksController(getDisk) error: ", err);
      throw err;
    }
  };

  getDiskWithPartitions = async (
    id: number,
    partitionId?: number,
  ): Promise<DiskModel | null> => {
    try {
      const disk = await DisksService.readByIdWithPartitions(id, partitionId);

      if (disk) {
        return new DiskModel(disk);
      }

      return null;
    } catch (err) {
      console.error("DisksController(getDiskWithPartitions) error: ", err);
      throw err;
    }
  };

  getDisks = async (): Promise<DiskModel[] | null> => {
    try {
      const disks = await DisksService.readList();

      if (disks.length) {
        return disks.map((disk) => {
          return new DiskModel(disk);
        });
      }

      return null;
    } catch (err) {
      console.error("DisksController(getDisks) error: ", err);
      throw err;
    }
  };

  addDisk = async (disk: IDiskCreateDTO): Promise<DiskModel | null> => {
    try {
      const diskRes = await DisksService.create(disk);

      if (diskRes) {
        return new DiskModel(diskRes);
      }

      return null;
    } catch (err) {
      console.error("DisksController(addDisk) error: ", err);
      throw err;
    }
  };

  addDisks = async (disks: IDiskCreateDTO[]): Promise<DiskModel[] | null> => {
    try {
      const diskRes = await DisksService.createList(disks);

      if (diskRes) {
        const res: DiskModel[] = [];
        for (const disk of diskRes) {
          if (disk) {
            res.push(new DiskModel(disk));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error("DisksController(addDisks) error: ", err);
      throw err;
    }
  };

  deleteDisk = async (id: number): Promise<boolean> => {
    try {
      const disk = await DisksService.deleteById(id);

      if (disk) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("DisksController(deleteDisk) error: ", err);
      throw err;
    }
  };

  deleteDisks = async (ids: number[]): Promise<boolean> => {
    try {
      const disksDeleted = await DisksService.deleteList(ids);

      if (disksDeleted && disksDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("DisksController(deleteDisks) error: ", err);
      throw err;
    }
  };

  updateDisk = async (id: number, disk: IDiskPatchDTO): Promise<boolean> => {
    try {
      const diskRes = await DisksService.patchById(id, disk);

      if (diskRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("DisksController(updateDisk) error: ", err);
      throw err;
    }
  };

  updateDisks = async (
    ids: number[],
    disk: IDiskPatchDTO,
  ): Promise<boolean> => {
    try {
      const disksUpdated = await DisksService.patchList(ids, disk);

      if (disksUpdated && disksUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("DisksController(updateDisks) error: ", err);
      throw err;
    }
  };
}

export default new DisksController();
