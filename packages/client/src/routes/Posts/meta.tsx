import { RouteMeta } from "../types";

const slug = "posts";
const routeMeta: RouteMeta = {
  title: "Posts",
  slug,
  path: `/${slug}`,
  allowRoles: ["EDITOR"],
};
export default routeMeta;
