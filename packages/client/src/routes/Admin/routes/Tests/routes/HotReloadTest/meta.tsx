import { RouteMeta } from "../../../../../types";
import ParentMeta from "../../meta";

const slug = "hot-reload-test";
const routeMeta: RouteMeta = {
  title: "Hot Reload Test",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
