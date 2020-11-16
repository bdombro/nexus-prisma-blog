import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "users";
const routeMeta: RouteMeta = {
  title: "Users",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
