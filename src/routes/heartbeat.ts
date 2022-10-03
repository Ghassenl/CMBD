import express, { RequestHandler } from "express";

const getServerHeartbeat: RequestHandler = (
  _,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  __,
) => {
  res.status(200).send({
    date: new Intl.DateTimeFormat("en", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date()),
  });
};

const heartbeatRouter = express
  .Router({ mergeParams: true })
  .get("/", getServerHeartbeat);

export { heartbeatRouter };
