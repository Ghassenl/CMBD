import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { DisksService, PartitionsService } from "../../../src/services";
import {
  ErrorStatusCode,
  IDisk,
  IPartition,
  IPartitionCreateDTO,
  IPartitionPatchDTO,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /partitions", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) partition [/partitions/1]", async () => {
    const items: IPartition[] = [
      {
        id: 1,
        fs_format: "ntfs",
        size: 5,
        id_disk: 1,
      },
    ];

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/partitions/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databasePartitionStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) partition [/partitions/1]", async () => {
    const items: IPartition[] = [
      {
        id: 5,
        fs_format: "ntfs",
        size: 5,
        id_disk: 1,
      },
    ];

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "readById",
    ).callsFake(async (id) => {
      return items.find((item) => item.id === id) ?? null;
    });

    const actualResult = await supertest(app)
      .get("/partitions/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databasePartitionStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "Partition not found !",
    });
  });

  it("should get (GET) partitions List [/partitions]", async () => {
    const items: IPartition[] = [
      {
        id: 1,
        fs_format: "ntfs",
        size: 5,
        id_disk: 1,
      },
    ];

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "readList",
    ).callsFake(async () => {
      return items;
    });

    const actualResult = await supertest(app)
      .get("/partitions")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databasePartitionStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should add (POST) partition [/partitions]", async () => {
    const toSave: IPartitionCreateDTO = {
        fs_format: "ntfs",
        size: 5,
        id_disk: 1,
      },
      expectedResult: IPartition = {
        id: 1,
        fs_format: "ntfs",
        size: 5,
        id_disk: 1,
      },
      disk: IDisk = {
        id: 1,
        type: "ssd",
        size: 500,
        id_raid: null,
        id_server: 1,
      };

    const databaseDiskStub = Sinon.stub(DisksService, "readById").callsFake(
      async () => disk,
    );

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "create",
    ).callsFake(async (partition: IPartitionCreateDTO) => {
      return {
        id: 1,
        ...partition,
      } as unknown as IPartition;
    });

    const actualResult = await supertest(app)
      .post("/partitions")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databasePartitionStub.restore();
    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Partition successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) partitions List [/partitions]", async () => {
    const toSave: IPartitionCreateDTO[] = [
        {
          fs_format: "ntfs",
          size: 5,
          id_disk: 1,
        },
        {
          fs_format: "ext4",
          size: 5,
          id_disk: 1,
        },
      ],
      expectedResult: IPartition[] = [
        {
          id: 1,
          fs_format: "ntfs",
          size: 5,
          id_disk: 1,
        },
        {
          id: 2,
          fs_format: "ext4",
          size: 5,
          id_disk: 1,
        },
      ],
      disk: IDisk = {
        id: 1,
        type: "ssd",
        size: 500,
        id_raid: null,
        id_server: 1,
      };

    const databaseDiskStub = Sinon.stub(DisksService, "readById").callsFake(
      async () => disk,
    );

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "createList",
    ).callsFake(async (items: IPartitionCreateDTO[]) => {
      const toAdd = items.map((item, idx) => {
        const itemToAdd = {
          id: idx + 1,
          ...item,
        };

        return itemToAdd;
      });

      return toAdd as IPartition[];
    });

    const actualResult = await supertest(app)
      .post("/partitions")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databasePartitionStub.restore();
    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Partitions list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) partition [/partitions/1]", async () => {
    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "deleteById",
    ).callsFake(async (id: number) => {
      if (id === 1) {
        return {
          id: 1,
          fs_format: "ntfs",
          size: 5,
          id_disk: 1,
        };
      }

      return null;
    });

    const actualResult = await supertest(app)
      .delete("/partitions/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databasePartitionStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Partition(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) partitions List [/partitions]", async () => {
    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "deleteList",
    ).callsFake(async (ids: number[]) => {
      return ids.join() === [1, 2].join() ? ids.length : null;
    });

    const actualResult = await supertest(app)
      .delete("/partitions")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databasePartitionStub.restore();

    expect(actualResult).to.deep.equal({
      message: "Partitions list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) partition [/partitions/1]", async () => {
    let itemToUpdate: IPartition = {
      id: 1,
      fs_format: "ntfs",
      size: 5,
      id_disk: 1,
    };
    const expectedResult: IPartition = {
        id: 1,
        fs_format: "xfs",
        size: 5,
        id_disk: 1,
      },
      updateBody: IPartitionPatchDTO = {
        fs_format: "xfs",
        size: 5,
        id_disk: 1,
      };

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "patchById",
    ).callsFake(async (id: number, partition: IPartitionPatchDTO) => {
      if (id === 1) {
        itemToUpdate = {
          ...itemToUpdate,
          ...partition,
        } as IPartition;

        return itemToUpdate;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/partitions/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databasePartitionStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Partition(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) partitions List [/partitions]", async () => {
    const itemsToUpdate: IPartition[] = [
        {
          id: 1,
          fs_format: "xfs",
          size: 5,
          id_disk: 1,
        },
        {
          id: 2,
          fs_format: "ntfs",
          size: 5,
          id_disk: 1,
        },
      ],
      expectedResult: IPartition[] = [
        {
          id: 1,
          fs_format: "ext4",
          size: 5,
          id_disk: 1,
        },
        {
          id: 2,
          fs_format: "ext4",
          size: 5,
          id_disk: 1,
        },
      ],
      updateBody: IPartitionPatchDTO = {
        fs_format: "ext4",
        size: 5,
        id_disk: 1,
      };

    const databasePartitionStub = Sinon.stub(
      PartitionsService,
      "patchList",
    ).callsFake(async (ids: number[], partition: IPartitionPatchDTO) => {
      if (ids.join() === [1, 2].join()) {
        itemsToUpdate.forEach((item, idx) => {
          if (ids.includes(item.id)) {
            itemsToUpdate[idx] = {
              ...item,
              ...partition,
            } as IPartition;
          }
        });

        return ids.length;
      }

      return null;
    });

    const actualResult = await supertest(app)
      .patch("/partitions")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databasePartitionStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Partitions successfully updated!`,
      success: true,
    });
  });
});
