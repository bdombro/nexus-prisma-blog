import { RouteMeta } from "../../../../../types";
import ParentMeta from "../../meta";

const slug = "portal-test";
const routeMeta: RouteMeta = {
  title: "Portal Test",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
