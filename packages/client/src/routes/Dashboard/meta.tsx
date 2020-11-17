import { UserRole } from "../../__generated__/globalTypes";
import { RouteMeta } from "../types";

const slug = "dashboard";
const routeMeta: RouteMeta = {
  title: "Dashboard",
  slug,
  path: `/${slug}`,
  allowRoles: [UserRole.AUTHOR],
};
export default routeMeta;
