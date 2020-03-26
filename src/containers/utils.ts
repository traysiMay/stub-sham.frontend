export const showById = (id: number, shows: any): number =>
  shows.onsale.find((s: any) => s.id === id);
