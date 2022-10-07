import { expect } from "chai";
import { describe, it } from "mocha";
import Sinon from "sinon";
import supertest from "supertest";
import { ExpressAppFactory } from "../../../src/app";
import { RaidsService } from "../../../src/services";
import {
  ErrorStatusCode,
  IDisk,
  IRaid,
  IRaidCreateDTO,
  IRaidPatchDTO,
  RaidModel,
} from "../../../src/models";
import { apiRoutes } from "../../../src/routes/api";

describe("Test /raids", () => {
  const app = ExpressAppFactory.createExpressApp({
    router: apiRoutes,
  });

  it("should get (GET) raid [/raids/1]", async () => {
    const items: IRaid[] = [
      {
        id: 1,
        raid_type: 0,
      },
    ];

    const databaseRaidStub = Sinon.stub(RaidsService, "readById").callsFake(
      async (id) => {
        return items.find((item) => item.id === id) ?? null;
      },
    );

    const actualResult = await supertest(app)
      .get("/raids/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal(items[0]);
  });

  it("should not get (GET) raid [/raids/1]", async () => {
    const items: IRaid[] = [
      {
        id: 5,
        raid_type: 0,
      },
    ];

    const databaseRaidStub = Sinon.stub(RaidsService, "readById").callsFake(
      async (id) => {
        return items.find((item) => item.id === id) ?? null;
      },
    );

    const actualResult = await supertest(app)
      .get("/raids/1")
      .expect("Content-Type", /json/)
      .expect(ErrorStatusCode.NOT_FOUND)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal({
      success: false,
      message: "Raid not found !",
    });
  });

  it("should get (GET) raids List [/raids]", async () => {
    const items: IRaid[] = [
      {
        id: 1,
        raid_type: 0,
      },
    ];

    const databaseRaidStub = Sinon.stub(RaidsService, "readList").callsFake(
      async () => {
        return items;
      },
    );

    const actualResult = await supertest(app)
      .get("/raids")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal(items);
  });

  it("should get (GET) raid disks List [/raids/1/disks]", async () => {
    const raid: IRaid & {
        disks: IDisk[];
      } = {
        id: 1,
        raid_type: 0,
        disks: [
          {
            id: 2,
            type: "ssd",
            size: 8,
            id_raid: 2,
            id_server: 2,
          },
        ],
      },
      expectedResult = new RaidModel(raid)
        .getDisks()
        ?.map((disk) => disk.toJson());

    const databaseRaidStub = Sinon.stub(
      RaidsService,
      "readByIdWithDisks",
    ).callsFake(async () => raid);

    const actualResult = await supertest(app)
      .get("/raids/1/disks")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body.items);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should get (GET) raid disk [/raids/1/disks/1]", async () => {
    const raid: IRaid & {
        disks: IDisk[];
      } = {
        id: 1,
        raid_type: 0,
        disks: [
          {
            id: 2,
            type: "ssd",
            size: 8,
            id_raid: 2,
            id_server: 2,
          },
        ],
      },
      expectedResult = new RaidModel(raid).getDisks()?.shift()?.toJson();

    const databaseRaidStub = Sinon.stub(
      RaidsService,
      "readByIdWithDisks",
    ).callsFake(async () => raid);

    const actualResult = await supertest(app)
      .get("/raids/1/disks/1")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal(expectedResult);
  });

  it("should add (POST) raid [/raids]", async () => {
    const toSave: IRaidCreateDTO = {
        raid_type: 0,
      },
      expectedResult: IRaid = {
        id: 1,
        raid_type: 0,
      };

    const databaseRaidStub = Sinon.stub(RaidsService, "create").callsFake(
      async (raid: IRaidCreateDTO) => {
        return {
          id: 1,
          ...raid,
        } as IRaid;
      },
    );

    const actualResult = await supertest(app)
      .post("/raids")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Raid successfully added!`,
      success: true,
      count: 1,
      items: [expectedResult],
    });
  });

  it("should add (POST) raids List [/raids]", async () => {
    const toSave: IRaidCreateDTO[] = [
        {
          raid_type: 0,
        },
        {
          raid_type: 5,
        },
      ],
      expectedResult: IRaid[] = [
        {
          id: 1,
          raid_type: 0,
        },
        {
          id: 2,
          raid_type: 5,
        },
      ];

    const databaseRaidStub = Sinon.stub(RaidsService, "createList").callsFake(
      async (items: IRaidCreateDTO[]) => {
        const toAdd = items.map((item, idx) => {
          const itemToAdd = {
            id: idx + 1,
            ...item,
          };

          return itemToAdd;
        });

        return toAdd as IRaid[];
      },
    );

    const actualResult = await supertest(app)
      .post("/raids")
      .send(toSave)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Raids list successfully added!`,
      success: true,
      count: expectedResult.length,
      items: expectedResult,
    });
  });

  it("should delete (DELETE) raid [/raids/1]", async () => {
    const databaseRaidStub = Sinon.stub(RaidsService, "deleteById").callsFake(
      async (id: number) => {
        if (id === 1) {
          return {
            id: 1,
            raid_type: 0,
          };
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .delete("/raids/1")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal({
      message: `Raid(1) successfully deleted!`,
      success: true,
    });
  });

  it("should delete (DELETE) raids List [/raids]", async () => {
    const databaseRaidStub = Sinon.stub(RaidsService, "deleteList").callsFake(
      async (ids: number[]) => {
        return ids.join() === [1, 2].join() ? ids.length : null;
      },
    );

    const actualResult = await supertest(app)
      .delete("/raids")
      .send({ ids: [1, 2] })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(actualResult).to.deep.equal({
      message: "Raids list successfully deleted!",
      success: true,
    });
  });

  it("should update (PATCH) raid [/raids/1]", async () => {
    let itemToUpdate: IRaid = {
      id: 1,
      raid_type: 0,
    };
    const expectedResult: IRaid = {
        id: 1,
        raid_type: 5,
      },
      updateBody: IRaidPatchDTO = {
        raid_type: 5,
      };

    const databaseRaidStub = Sinon.stub(RaidsService, "patchById").callsFake(
      async (id: number, raid: IRaidPatchDTO) => {
        if (id === 1) {
          itemToUpdate = {
            ...itemToUpdate,
            ...raid,
          } as IRaid;

          return itemToUpdate;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/raids/1")
      .send(updateBody)
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(itemToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Raid(1) successfully updated!`,
      success: true,
    });
  });

  it("should update (PATCH) raids List [/raids]", async () => {
    const itemsToUpdate: IRaid[] = [
        {
          id: 1,
          raid_type: 0,
        },
        {
          id: 2,
          raid_type: 0,
        },
      ],
      expectedResult: IRaid[] = [
        {
          id: 1,
          raid_type: 5,
        },
        {
          id: 2,
          raid_type: 5,
        },
      ],
      updateBody: IRaidPatchDTO = {
        raid_type: 5,
      };

    const databaseRaidStub = Sinon.stub(RaidsService, "patchList").callsFake(
      async (ids: number[], raid: IRaidPatchDTO) => {
        if (ids.join() === [1, 2].join()) {
          itemsToUpdate.forEach((item, idx) => {
            if (ids.includes(item.id)) {
              itemsToUpdate[idx] = {
                ...item,
                ...raid,
              } as IRaid;
            }
          });

          return ids.length;
        }

        return null;
      },
    );

    const actualResult = await supertest(app)
      .patch("/raids")
      .send({
        ids: [1, 2],
        data: updateBody,
      })
      .set("Accept", "application/json")
      .then((res) => res.body);

    databaseRaidStub.restore();

    expect(itemsToUpdate).to.deep.equal(expectedResult);

    expect(actualResult).to.deep.equal({
      message: `Raids successfully updated!`,
      success: true,
    });
  });
});
