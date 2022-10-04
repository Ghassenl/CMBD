interface CRUDService<T, CreateDTO, PatchDTO> {
  create: (resource: CreateDTO) => Promise<T | null>;
  readById: (id: number) => Promise<T | null>;
  deleteById: (id: number) => Promise<T | null>;
  patchById: (id: number, resource: PatchDTO) => Promise<T | null>;

  createList: (resources: CreateDTO[]) => Promise<(T | null)[]>;
  readList: () => Promise<T[]>;
  deleteList: (ids: number[]) => Promise<number | null>;
  patchList: (ids: number[], resource: PatchDTO) => Promise<number | null>;
}

export { CRUDService };
