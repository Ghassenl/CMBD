import { NetworkInterface as INetworkInterface } from "@prisma/client";
import { JSONObject } from "./types";

type ICreateUpdateNetworkInterface = Omit<INetworkInterface, "id_gateway"> & {
  id_gateway?: number | null;
};

type INetworkInterfaceCreateDTO = Omit<ICreateUpdateNetworkInterface, "id">;
type INetworkInterfacePatchDTO = Partial<ICreateUpdateNetworkInterface>;

class NetworkInterfaceModel implements INetworkInterface {
  id: number;
  ip: string;
  mask: string;
  id_gateway: number | null;

  constructor(networkInterface: INetworkInterface | JSONObject) {
    Object.assign(this, networkInterface);
  }

  getID() {
    return this.id;
  }

  getIp() {
    return this.ip;
  }

  getMask() {
    return this.mask;
  }

  getGatewayID() {
    return this.id_gateway;
  }

  toJson(): JSONObject {
    return {
      id: this.id,
      ip: this.ip,
      mask: this.mask,
      id_gateway: this.id_gateway,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}

export {
  NetworkInterfaceModel,
  INetworkInterface,
  INetworkInterfaceCreateDTO,
  INetworkInterfacePatchDTO,
};
