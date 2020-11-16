import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "logout";
const routeMeta: RouteMeta = {
  title: "Logout",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
