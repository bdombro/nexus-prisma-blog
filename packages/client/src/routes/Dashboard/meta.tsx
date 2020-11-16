import { RouteMeta } from "../types";

const slug = "dashboard";
const routeMeta: RouteMeta = {
  title: "Dashboard",
  slug,
  path: `/${slug}`,
  allowRoles: ["EDITOR"],
};
export default routeMeta;
