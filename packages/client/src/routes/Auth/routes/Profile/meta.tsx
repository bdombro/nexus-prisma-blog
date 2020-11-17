import { UserRole } from "../../../../__generated__/globalTypes";
import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "profile";
const routeMeta: RouteMeta = {
  title: "Profile",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  allowRoles: [UserRole.AUTHOR],
  parent: ParentMeta,
};
export default routeMeta;
