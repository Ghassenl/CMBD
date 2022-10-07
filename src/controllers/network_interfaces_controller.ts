import { NetworkInterfacesService } from "../services";
import {
  INetworkInterfaceCreateDTO,
  INetworkInterfacePatchDTO,
  NetworkInterfaceModel,
} from "../models";

class NetworkInterfacesController {
  getNetworkInterface = async (
    id: number,
  ): Promise<NetworkInterfaceModel | null> => {
    try {
      const networkInterface = await NetworkInterfacesService.readById(id);

      if (networkInterface) {
        return new NetworkInterfaceModel(networkInterface);
      }

      return null;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(getNetworkInterface) error: ",
        err,
      );
      throw err;
    }
  };

  getNetworkInterfaces = async (): Promise<NetworkInterfaceModel[] | null> => {
    try {
      const networkInterfaces = await NetworkInterfacesService.readList();

      if (networkInterfaces.length) {
        return networkInterfaces.map((networkInterface) => {
          return new NetworkInterfaceModel(networkInterface);
        });
      }

      return null;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(getNetworkInterfaces) error: ",
        err,
      );
      throw err;
    }
  };

  addNetworkInterface = async (
    networkInterface: INetworkInterfaceCreateDTO,
  ): Promise<NetworkInterfaceModel | null> => {
    try {
      const networkInterfaceRes = await NetworkInterfacesService.create(
        networkInterface,
      );

      if (networkInterfaceRes) {
        return new NetworkInterfaceModel(networkInterfaceRes);
      }

      return null;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(addNetworkInterface) error: ",
        err,
      );
      throw err;
    }
  };

  addNetworkInterfaces = async (
    networkInterfaces: INetworkInterfaceCreateDTO[],
  ): Promise<NetworkInterfaceModel[] | null> => {
    try {
      const networkInterfaceRes = await NetworkInterfacesService.createList(
        networkInterfaces,
      );

      if (networkInterfaceRes.length) {
        const res: NetworkInterfaceModel[] = [];
        for (const networkInterface of networkInterfaceRes) {
          if (networkInterface) {
            res.push(new NetworkInterfaceModel(networkInterface));
          }
        }
        return res;
      }

      return null;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(addNetworkInterfaces) error: ",
        err,
      );
      throw err;
    }
  };

  deleteNetworkInterface = async (id: number): Promise<boolean> => {
    try {
      const networkInterface = await NetworkInterfacesService.deleteById(id);

      if (networkInterface) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(deleteNetworkInterface) error: ",
        err,
      );
      throw err;
    }
  };

  deleteNetworkInterfaces = async (ids: number[]): Promise<boolean> => {
    try {
      const networkInterfacesDeleted =
        await NetworkInterfacesService.deleteList(ids);

      if (networkInterfacesDeleted && networkInterfacesDeleted === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(deleteNetworkInterfaces) error: ",
        err,
      );
      throw err;
    }
  };

  updateNetworkInterface = async (
    id: number,
    networkInterface: INetworkInterfacePatchDTO,
  ): Promise<boolean> => {
    try {
      const networkInterfaceRes = await NetworkInterfacesService.patchById(
        id,
        networkInterface,
      );

      if (networkInterfaceRes) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(updateNetworkInterface) error: ",
        err,
      );
      throw err;
    }
  };

  updateNetworkInterfaces = async (
    ids: number[],
    networkInterface: INetworkInterfacePatchDTO,
  ): Promise<boolean> => {
    try {
      const networkInterfacesUpdated = await NetworkInterfacesService.patchList(
        ids,
        networkInterface,
      );

      if (networkInterfacesUpdated && networkInterfacesUpdated === ids.length) {
        return true;
      }

      return false;
    } catch (err) {
      console.error(
        "NetworkInterfacesController(updateNetworkInterfaces) error: ",
        err,
      );
      throw err;
    }
  };
}

export default new NetworkInterfacesController();
