import { RouteMeta } from "../../../types";
import ParentMeta from "../../meta";

const slug = "tests";
const routeMeta: RouteMeta = {
  title: "Tests",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
