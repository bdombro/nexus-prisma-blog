import { UserRole } from "../../__generated__/globalTypes";
import { RouteMeta } from "../types";

const slug = "posts";
const routeMeta: RouteMeta = {
  title: "Posts",
  slug,
  path: `/${slug}`,
  allowRoles: [UserRole.EDITOR],
};
export default routeMeta;
