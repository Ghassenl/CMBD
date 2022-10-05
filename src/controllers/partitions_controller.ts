import { PartitionsService } from "../services";
import {
  IPartitionCreateDTO,
  IPartitionPatchDTO,
  PartitionModel,
} from "../models";

class PartitionsController {
  getPartition = async (id: number): Promise<PartitionModel | null> => {
    try {
      const partition = await PartitionsService.readById(id);

      if (partition) {
        return new PartitionModel(partition);
      }

      return null;
    } catch (err) {
      console.error("PartitionsController(getPartition) error: ", err);
      throw err;
    }
  };

  getPartitions = async (): Promise<PartitionModel[] | null> => {
    try {
      const partitions = await PartitionsService.readList();

      if (partitions.length) {
        return partitions.map((partition) => {
          return new PartitionModel(partition);
        });
      }

      return null;
    } catch (err) {
      console.error("PartitionsController(getPartitions) error: ", err);
      throw err;
    }
  };

  addPartition = async (
    partition: IPartitionCreateDTO,
  ): Promise<PartitionModel | null> => {
    try {
      const partitionRes = await PartitionsService.create(partition);

      if (partitionRes) {
        return new PartitionModel(partitionRes);
      }

      return null;
    } catch (err) {
      console.error("PartitionsController(addPartition) error: ", err);
      throw err;
    }
  };

  addPartitions = async (
    partitions: IPartitionCreateDTO[],
  ): Promise<PartitionModel[] | null> => {
    try {
      const partitionRes = await PartitionsService.createList(partitions);

      if (partitionRes) {
        const res: PartitionModel[] = [];
        for (const partition of partitionRes) {
          if (partition) {
            res.push(new PartitionModel(partition));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error("PartitionsController(addPartitions) error: ", err);
      throw err;
    }
  };

  deletePartition = async (id: number): Promise<boolean> => {
    try {
      const partition = await PartitionsService.deleteById(id);

      if (partition) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("PartitionsController(deletePartition) error: ", err);
      throw err;
    }
  };

  deletePartitions = async (ids: number[]): Promise<boolean> => {
    try {
      const partitionsDeleted = await PartitionsService.deleteList(ids);

      if (partitionsDeleted && partitionsDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("PartitionsController(deletePartitions) error: ", err);
      throw err;
    }
  };

  updatePartition = async (
    id: number,
    partition: IPartitionPatchDTO,
  ): Promise<boolean> => {
    try {
      const partitionRes = await PartitionsService.patchById(id, partition);

      if (partitionRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("PartitionsController(updatePartition) error: ", err);
      throw err;
    }
  };

  updatePartitions = async (
    ids: number[],
    partition: IPartitionPatchDTO,
  ): Promise<boolean> => {
    try {
      const partitionsUpdated = await PartitionsService.patchList(
        ids,
        partition,
      );

      if (partitionsUpdated && partitionsUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error("PartitionsController(updatePartitions) error: ", err);
      throw err;
    }
  };
}

export default new PartitionsController();
