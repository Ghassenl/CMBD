import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { DisksService } from "../../../src/services";
import {
  DiskModel,
  ErrorStatusCode,
  IDisk,
  IDiskCreateDTO,
  IDiskPatchDTO,
  IPartition,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /disks", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) disk [/disks/1]", async () => {
    const items: IDisk[] = [
      {
        id: 1,
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
      },
    ];

    const databaseDiskStub = Sinon.stub(DisksService, "readById").callsFake(
      async (id) => {
        return items.find((item) => item.id === id) ?? null;
      },
    );

    const actualResult = await supertest(app)
      .get("/disks/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) disk [/disks/1]", async () => {
    const items: IDisk[] = [
      {
        id: 2,
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
      },
    ];

    const databaseDiskStub = Sinon.stub(DisksService, "readById").callsFake(
      async (id) => {
        return items.find((item) => item.id === id) ?? null;
      },
    );

    const actualResult = await supertest(app)
      .get("/disks/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "Disk not found !",
    });
  });

  it("should get (GET) disks List [/disks]", async () => {
    const items: IDisk[] = [
      {
        id: 1,
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
      },
    ];

    const databaseDiskStub = Sinon.stub(DisksService, "readList").callsFake(
      async () => {
        return items;
      },
    );

    const actualResult = await supertest(app)
      .get("/disks")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should get (GET) disk partitons List [/disks/1/partitions]", async () => {
    const disk: IDisk & {
        partitions: IPartition[];
      } = {
        id: 1,
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
        partitions: [
          {
            id: 1,
            fs_format: "ntfs",
            size: 5,
            id_disk: 1,
          },
        ],
      },
      expectedResult = new DiskModel(disk)
        .getPartitions()
        ?.map((partiton) => partiton.toJson());

    const databaseDiskStub = Sinon.stub(
      DisksService,
      "readByIdWithPartitions",
    ).callsFake(async () => disk);

    const actualResult = await supertest(app)
      .get("/disks/1/partitions")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) disk partion [/disks/1/partitions/1]", async () => {
    const disk: IDisk & {
        partitions: IPartition[];
      } = {
        id: 1,
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
        partitions: [
          {
            id: 1,
            fs_format: "ntfs",
            size: 5,
            id_disk: 1,
          },
        ],
      },
      expectedResult = new DiskModel(disk).getPartitions()?.shift()?.toJson();

    const databaseDiskStub = Sinon.stub(
      DisksService,
      "readByIdWithPartitions",
    ).callsFake(async () => disk);

    const actualResult = await supertest(app)
      .get("/disks/1/partitions/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should add (POST) disk [/disks]", async () => {
    const toSave: IDiskCreateDTO = {
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
      },
      expectedResult: IDisk = {
        id: 1,
        type: "ssd",
        size: 8,
        id_raid: 2,
        id_server: 2,
      };

    const databaseDiskStub = Sinon.stub(DisksService, "create").callsFake(
      async (disk: IDiskCreateDTO) => {
        return {
          id: 1,
          ...disk,
        } as unknown as IDisk;
      },
    );

    const actualResult = await supertest(app)
      .post("/disks")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Disk successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) disks List [/disks]", async () => {
    const toSave: IDiskCreateDTO[] = [
        {
          type: "ssd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
        {
          type: "ssd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
      ],
      expectedResult: IDisk[] = [
        {
          id: 1,
          type: "ssd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
        {
          id: 2,
          type: "ssd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
      ];

    const databaseDiskStub = Sinon.stub(DisksService, "createList").callsFake(
      async (items: IDiskCreateDTO[]) => {
        const toAdd = items.map((item, idx) => {
          const itemToAdd = {
            id: idx + 1,
            ...item,
          };

          return itemToAdd;
        });

        return toAdd as IDisk[];
      },
    );

    const actualResult = await supertest(app)
      .post("/disks")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Disks list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) disk [/disks/1]", async () => {
    const databaseDiskStub = Sinon.stub(DisksService, "deleteById").callsFake(
      async (id: number) => {
        if (id === 1) {
          return {
            id: 1,
            type: "ssd",
            size: 8,
            id_raid: 2,
            id_server: 2,
          };
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .delete("/disks/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Disk(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) disks List [/disks]", async () => {
    const databaseDiskStub = Sinon.stub(DisksService, "deleteList").callsFake(
      async (ids: number[]) => {
        return ids.join() === [1, 2].join() ? ids.length : null;
      },
    );

    const actualResult = await supertest(app)
      .delete("/disks")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(actualResult).to.deep.equal({
      message: "Disks list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) disk [/disks/1]", async () => {
    let itemToUpdate: IDisk = {
      id: 1,
      type: "ssd",
      size: 8,
      id_raid: 2,
      id_server: 2,
    };
    const expectedResult: IDisk = {
        id: 1,
        type: "hdd",
        size: 8,
        id_raid: 2,
        id_server: 2,
      },
      updateBody: IDiskPatchDTO = {
        type: "hdd",
      };

    const databaseDiskStub = Sinon.stub(DisksService, "patchById").callsFake(
      async (id: number, disk: IDiskPatchDTO) => {
        if (id === 1) {
          itemToUpdate = {
            ...itemToUpdate,
            ...disk,
          } as IDisk;

          return itemToUpdate;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/disks/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Disk(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) disks List [/disks]", async () => {
    const itemsToUpdate: IDisk[] = [
        {
          id: 1,
          type: "hdd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
        {
          id: 2,
          type: "hdd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
      ],
      expectedResult: IDisk[] = [
        {
          id: 1,
          type: "ssd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
        {
          id: 2,
          type: "ssd",
          size: 8,
          id_raid: 2,
          id_server: 2,
        },
      ],
      updateBody: IDiskPatchDTO = {
        type: "ssd",
      };

    const databaseDiskStub = Sinon.stub(DisksService, "patchList").callsFake(
      async (ids: number[], disk: IDiskPatchDTO) => {
        if (ids.join() === [1, 2].join()) {
          itemsToUpdate.forEach((item, idx) => {
            if (ids.includes(item.id)) {
              itemsToUpdate[idx] = {
                ...item,
                ...disk,
              } as IDisk;
            }
          });

          return ids.length;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/disks")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseDiskStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Disks successfully updated!`,
      success: true,
    });
  });
});
