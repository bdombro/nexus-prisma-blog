import { RouteMeta } from "../../../../../../../types";
import ParentMeta from "../../meta";

const slug = ":id";
const routeMeta: RouteMeta = {
  title: "Dynamic Route",
  slug,
  path: `${ParentMeta.path}/${slug}`,
  parent: ParentMeta,
};
export default routeMeta;
