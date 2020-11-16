export type RouteMeta = {
  title: string;
  slug: string;
  path: string;
  allowRoles?: string[];
  hidden?: boolean; // assume true else specified
  parent?: RouteMeta;
  // icon?: string;
};
