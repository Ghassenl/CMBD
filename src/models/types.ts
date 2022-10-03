type JSONValue =
  | string
  | number
  | undefined
  | boolean
  | bigint
  | Array<JSONValue>
  | JSONObject
  | null;

interface JSONObject<T = JSONValue> {
  [key: string]: T;
}

export type { JSONObject, JSONValue };
