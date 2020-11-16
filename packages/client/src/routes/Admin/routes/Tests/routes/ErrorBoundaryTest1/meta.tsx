import { RouteMeta } from "../../../../../types";
import ParentMeta from "../../meta";

const slug = "error-boundary-test-1";
const routeMeta: RouteMeta = {
  title: "Error Boundary Test",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
