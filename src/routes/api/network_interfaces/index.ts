import express from "express";

import getNetworkInterface from "./get_network_interface";
import getNetworkInterfacesList from "./get_network_interfaces_list";
import deleteNetworkInterface from "./delete_network_interface";
import addNetworkInterfaces from "./add_network_interfaces";
import updateNetworkInterface from "./update_network_interface";
import deleteNetworkInterfacesList from "./delete_network_interfaces_list";
import updateNetworkInterfacesList from "./update_network_interfaces_list";
import {
  networkInterfaceCreateValidationMiddleware,
  networkInterfaceUpdateValidationMiddleware,
} from "../../../middlewares";

const networkInterfacesRoutes = express
  .Router({ mergeParams: true })
  .post("/", networkInterfaceCreateValidationMiddleware, addNetworkInterfaces)
  .get("/:id", getNetworkInterface)
  .get("/", getNetworkInterfacesList)
  .delete("/:id", deleteNetworkInterface)
  .delete("/", deleteNetworkInterfacesList)
  .patch(
    "/:id",
    networkInterfaceUpdateValidationMiddleware,
    updateNetworkInterface,
  )
  .patch(
    "/",
    networkInterfaceUpdateValidationMiddleware,
    updateNetworkInterfacesList,
  );
export { networkInterfacesRoutes };
