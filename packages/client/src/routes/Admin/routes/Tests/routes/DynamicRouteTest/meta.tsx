import { RouteMeta } from "../../../../../types";
import ParentMeta from "../../meta";

const slug = "dynamic-route-tests";
const routeMeta: RouteMeta = {
  title: "Dynamic Route Tests",
  slug,
  path: `${ParentMeta.path}/${slug}`,
};
export default routeMeta;
