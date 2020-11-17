import { RouteMeta } from "../types";
import { UserRole } from "../../__generated__/globalTypes";

const slug = "admin";
const routeMeta: RouteMeta = {
  title: "Admin Dashboard",
  slug,
  path: `/${slug}`,
  allowRoles: [UserRole.ADMIN],
  hidden: true,
};
export default routeMeta;
