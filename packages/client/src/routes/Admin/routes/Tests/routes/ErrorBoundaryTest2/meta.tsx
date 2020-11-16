import { RouteMeta } from "../../../../../types";
import ParentMeta from "../../meta";

const slug = "error-boundary-test-2";
const routeMeta: RouteMeta = {
  title: "Error Boundary Test 2",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
